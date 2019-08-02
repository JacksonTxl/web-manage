<template>
  <div :class="basic()">
    <st-search-panel>
      <div :class="basic('select')">
        <span style="width:90px;">课程状态：</span>
        <st-search-radio
          v-model="query.course_status"
          :list="personalCourseList"
        />
      </div>
      <div :class="basic('select')">
        <span style="width:90px;">购买时间：</span>
        <st-range-picker
          :disabledDays="180"
          :value="selectTime"
        ></st-range-picker>
      </div>
      <div slot="button">
        <st-button
          type="primary"
          @click="onSearchNative"
          :loading="loading.getList"
        >
          查询
        </st-button>
        <st-button class="mgl-8" @click="onSearhReset">重置</st-button>
      </div>
    </st-search-panel>
    <div :class="basic('content')">
      <div :class="basic('content-batch')" class="mg-b16">
        <!-- NOTE: 导出 -->
        <!-- <st-button v-if="auth.export" type="primary">批量导出</st-button> -->
      </div>
      <div :class="basic('table')">
        <!--
          NOTE: 本期不做，先去掉选择框
          :alertSelection="{onReset: onClear}"
          :rowSelection="{selectedRowKeys: selectedRowKeys,fixed:true, onChange: onSelectChange}"
        -->
        <st-table
          :page="page"
          rowKey="id"
          :scroll="{ x: 1800 }"
          :columns="columns"
          @change="onTableChange"
          :dataSource="list"
        >
          <template slot="course_status" slot-scope="text">
            {{ text | enumFilter('sold.course_status') }}
          </template>
          <template slot="end_time" slot-scope="text">
            {{ moment(text).format('YYYY-MM-DD HH:mm') }}
          </template>
          <template slot="buy_time" slot-scope="text">
            {{ moment(text).format('YYYY-MM-DD HH:mm') }}
          </template>
          <div slot="action" slot-scope="text, record">
            <st-table-actions>
              <a
                v-if="record.auth['shop:sold:sold_personal_course|get']"
                @click="onDetail(record)"
              >
                详情
              </a>
              <a
                v-if="record.auth['shop:sold:sold_personal_course|course_num']"
                @click="onSurplus(record)"
              >
                修改剩余课时
              </a>
              <a
                v-if="record.auth['shop:sold:sold_personal_course|frozen']"
                @click="onFreeze(record)"
              >
                冻结
              </a>
              <a
                v-if="record.auth['shop:sold:sold_personal_course|unfrozen']"
                @click="onUnfreeze(record)"
              >
                取消冻结
              </a>
              <a
                v-if="
                  record.auth['shop:sold:sold_personal_course|change_coach']
                "
                @click="onEditCoach(record)"
              >
                修改教练
              </a>
              <a
                v-if="record.auth['shop:sold:sold_personal_course|transfer']"
                @click="onTransfer(record)"
              >
                转让
              </a>
              <a
                v-if="record.auth['brand_shop:order:order|refund']"
                @click="onRefund(record)"
              >
                退款
              </a>
              <a
                v-if="
                  record.auth['shop:sold:sold_personal_course|export_contract']
                "
                @click="toContract(record)"
              >
                查看合同
              </a>
            </st-table-actions>
          </div>
        </st-table>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import { cloneDeep, filter } from 'lodash-es'
import { PersonalService } from './personal.service'
import { UserService } from '@/services/user.service'
import { RouteService } from '@/services/route.service'
import tableMixin from '@/mixins/table.mixin'
import { columns } from './personal.config'
import StRangePicker from '@/views/components/datetime-picker/range-picker'
import SoldCourseCoach from '@/views/biz-modals/sold/course/coach'
import SoldCourseFreeze from '@/views/biz-modals/sold/course/freeze'
import SoldCourseRefund from '@/views/biz-modals/sold/course/refund'
import SoldCourseSurplusPersonal from '@/views/biz-modals/sold/course/surplus-personal'
import SoldCourseTransfer from '@/views/biz-modals/sold/course/transfer'
export default {
  name: 'PageShopSoldCoursePersonalList',
  mixins: [tableMixin],
  bem: {
    basic: 'page-shop-sold'
  },
  modals: {
    SoldCourseCoach,
    SoldCourseFreeze,
    SoldCourseRefund,
    SoldCourseSurplusPersonal,
    SoldCourseTransfer
  },
  serviceInject() {
    return {
      userService: UserService,
      routeService: RouteService,
      personalService: PersonalService
    }
  },
  rxState() {
    return {
      loading: this.personalService.loading$,
      list: this.personalService.list$,
      page: this.personalService.page$,
      package_course: this.userService.packageCourseEnums$,
      query: this.routeService.query$,
      auth: this.personalService.auth$,
      soldEnums: this.userService.soldEnums$
    }
  },
  data() {
    return {
      course_status: -1,
      start_time: null,
      end_time: null,
      // 结束时间面板是否显示
      endOpen: false,
      selectedRowKeys: [],
      selectTime: {
        startTime: {
          showTime: false,
          disabledBegin: null,
          placeholder: '开始日期',
          disabled: false,
          value: null,
          format: 'YYYY-MM-DD',
          change: $event => {}
        },
        endTime: {
          showTime: false,
          placeholder: '结束日期',
          disabled: false,
          value: null,
          format: 'YYYY-MM-DD',
          change: $event => {}
        }
      }
    }
  },
  components: {
    StRangePicker
  },
  computed: {
    columns,
    personalCourseList() {
      let list = [{ value: -1, label: '全部' }]
      if (!this.soldEnums.course_status) return list
      Object.entries(this.soldEnums.course_status.value).forEach(o => {
        list.push({ value: +o[0], label: o[1] })
      })
      return list
    }
  },
  mounted() {
    this.setSearchData()
  },
  watch: {
    query(newVal) {
      this.setSearchData()
    }
  },
  methods: {
    // 查询
    onSearchNative() {
      this.query.start_time = this.selectTime.startTime.value
        ? `${this.selectTime.startTime.value.format('YYYY-MM-DD')} 00:00:00`
        : ''
      this.query.end_time = this.selectTime.endTime.value
        ? `${this.selectTime.endTime.value.format('YYYY-MM-DD')} 00:00:00`
        : ''
      this.onSearch()
    },
    // 设置searchData
    setSearchData() {
      this.course_status = this.query.course_status
      this.selectTime.startTime.value = this.query.start_time
        ? cloneDeep(moment(this.query.start_time))
        : null
      this.selectTime.endTime.value = this.query.end_time
        ? cloneDeep(moment(this.query.end_time))
        : null
    },
    // moment
    moment,
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    // 冻结
    onFreeze(record) {
      this.$modalRouter.push({
        name: 'sold-course-freeze',
        props: {
          type: 'personal',
          id: record.id
        },
        on: {
          success: () => {
            this.$router.push({ force: true, query: this.query })
          }
        }
      })
    },
    // 取消冻结
    onUnfreeze(record) {
      this.$confirm({
        title: '提示',
        content: '是否取消冻结？',
        maskClosable: true,
        onOk: () => {
          return this.personalService
            .unFreeze(record.id)
            .toPromise()
            .then(() => {
              this.$router.push({ force: true, query: this.query })
            })
        }
      })
    },
    // 修改教练
    onEditCoach(record) {
      this.$modalRouter.push({
        name: 'sold-course-coach',
        props: {
          record
        },
        on: {
          success: () => {
            this.$router.push({ force: true, query: this.query })
          }
        }
      })
    },
    // 修改剩余课时
    onSurplus(record) {
      this.$modalRouter.push({
        name: 'sold-course-surplus-personal',
        props: {
          courseData: record
        },
        on: {
          success: () => {
            this.$router.push({ force: true, query: this.query })
          }
        }
      })
    },
    // 转让
    onTransfer(record) {
      this.$modalRouter.push({
        name: 'sold-course-transfer',
        props: {
          type: 'personal',
          id: record.id
        },
        on: {
          success: () => {
            this.$router.push({ force: true, query: this.query })
          }
        }
      })
    },
    // 跳转合同
    toContract(record) {
      let url = `${window.location.origin}/extra/contract-preview?id=${
        record.order_id
      }`
      window.open(url)
    },
    // 退款
    onRefund(record) {
      this.$modalRouter.push({
        name: 'sold-course-refund',
        props: {
          type: 'personal',
          id: record.id
        },
        on: {
          success: () => {
            this.$router.push({ force: true, query: this.query })
          }
        }
      })
    },
    // 详情
    onDetail(record) {
      this.$router.push({
        path: `/shop/sold/course/info/personal/info/consumption-record`,
        query: { id: record.id }
      })
    },
    onClear() {
      this.selectedRowKeys = []
      this.selectedRows = []
    }
  }
}
</script>
