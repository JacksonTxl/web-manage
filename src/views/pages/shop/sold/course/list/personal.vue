<template>
  <div :class="basic()">
    <div v-di-view="{ name: 'SHOP_SOLD_COURSE_LIST_SEARCH' }">
      <st-input-search
        v-model="$searchQuery.search"
        @search="onKeywordsSearch('search', $event)"
        placeholder="请输入私教课名、合同编号、会员姓名或手机号查找"
        style="width:372px"
      />
    </div>
    <st-search-panel @search="onSearchNative" @reset="onSearhResetNative">
      <st-search-panel-item label="课程状态：">
        <st-search-radio
          v-model="$searchQuery.course_status"
          :options="courseStatus"
        />
      </st-search-panel-item>
      <st-search-panel-item label="购买时间：">
        <st-range-picker
          :disabledDays="180"
          :value="selectTime"
        ></st-range-picker>
      </st-search-panel-item>
    </st-search-panel>
    <div :class="basic('content')">
      <div :class="basic('content-batch')" class="mg-b16">
        <!-- NOTE: 导出 -->
        <!-- <st-button v-if="auth.export" type="primary">批量导出</st-button> -->
        <st-button
          type="primary"
          class="mg-r8"
          @click="onGiving"
          :disabled="selectedRowKeys.length < 1"
        >
          赠送额度
        </st-button>
        <st-button
          type="primary"
          class="mg-r8"
          @click="onExtendDays"
          :disabled="selectedRowKeys.length < 1"
        >
          延长有效期
        </st-button>
      </div>
      <div>
        <st-table
          :page="page"
          :loading="loading.getList"
          :alertSelection="{ onReset: onClear }"
          :rowSelection="{
            selectedRowKeys: selectedRowKeys,
            fixed: true,
            onChange: onSelectChange,
            getCheckboxProps: record => ({
              props: {
                disabled: disabledSelect(record)
              }
            })
          }"
          rowKey="id"
          :scroll="{ x: 1800 }"
          :columns="columns"
          @change="onTableChange"
          :dataSource="list"
        >
          <template slot="course_status" slot-scope="text">
            {{ text | enumFilter('sold_common.course_status') }}
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
                v-if="record.auth['shop:sold:sold_personal_course|reactive']"
                @click="onActivated(record)"
              >
                重新激活
              </a>
              <a
                v-if="record.auth['shop:sold:sold_personal_course|expire']"
                @click="onLease(record)"
              >
                延长有效期
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
                修改{{ $c('coach') }}
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
import tableMixin from '@/mixins/table.mixin'
import { columns } from './personal.config'
import SoldCourseCoach from '@/views/biz-modals/sold/course/coach'
import SoldCourseFreeze from '@/views/biz-modals/sold/course/freeze'
import SoldCourseRefund from '@/views/biz-modals/sold/course/refund'
import SoldCourseSurplusPersonal from '@/views/biz-modals/sold/course/surplus-personal'
import SoldCourseTransfer from '@/views/biz-modals/sold/course/transfer'
import SoldCourseLease from '@/views/biz-modals/sold/course/lease'
import SoldCourseActivated from '@/views/biz-modals/sold/course/activated'
import SoldCourseGiving from '@/views/biz-modals/sold/course/giving'
import SoldCourseExtendDay from '@/views/biz-modals/sold/course/extend-day'
import CommonTaskSuccessTip from '@/views/biz-modals/common/task/success-tip'
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
    SoldCourseTransfer,
    SoldCourseLease,
    SoldCourseActivated,
    SoldCourseGiving,
    CommonTaskSuccessTip,
    SoldCourseExtendDay
  },
  serviceInject() {
    return {
      personalService: PersonalService
    }
  },
  rxState() {
    return {
      loading: this.personalService.loading$,
      list: this.personalService.list$,
      page: this.personalService.page$,
      courseStatus: this.personalService.courseStatus$,
      auth: this.personalService.auth$
    }
  },
  data() {
    return {
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

  computed: {
    columns
  },
  mounted() {
    this.setSearchData()
  },
  methods: {
    // 额度赠送
    onGiving() {
      this.$modalRouter.push({
        name: 'sold-course-giving',
        props: {
          id: this.selectedRowKeys
        },
        on: {
          success: () => {
            this.successTip()
          }
        }
      })
    },
    // 延长有效期
    onExtendDays() {
      this.$modalRouter.push({
        name: 'sold-course-extend-day',
        props: {
          id: this.selectedRowKeys
        },
        on: {
          success: () => {
            this.successTip()
          }
        }
      })
    },
    successTip() {
      this.$modalRouter.push({
        name: 'common-task-success-tip',
        on: {
          success: () => {
            this.$router.reload()
            this.onClear()
          }
        }
      })
    },
    disabledSelect(record) {
      if (record.course_status !== 1 && record.course_status !== 4) {
        return true
      }
    },
    // 查询
    onSearchNative() {
      this.$searchQuery.start_time = this.selectTime.startTime.value
        ? `${this.selectTime.startTime.value.format('YYYY-MM-DD')} 00:00:00`
        : ''
      this.$searchQuery.end_time = this.selectTime.endTime.value
        ? `${this.selectTime.endTime.value.format('YYYY-MM-DD')} 23:59:59`
        : ''
      this.onSearch()
    },
    onSearhResetNative() {
      this.selectTime.startTime.value = null
      this.selectTime.endTime.value = null
      this.onSearhReset()
    },
    // 设置searchData
    setSearchData() {
      this.selectTime.startTime.value = this.$searchQuery.start_time
        ? cloneDeep(moment(this.$searchQuery.start_time))
        : null
      this.selectTime.endTime.value = this.$searchQuery.end_time
        ? cloneDeep(moment(this.$searchQuery.end_time))
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
            this.$router.reload()
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
              this.$router.reload()
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
            this.$router.reload()
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
            this.$router.reload()
          }
        }
      })
    },
    // 重新激活
    onActivated(record) {
      this.$modalRouter.push({
        name: 'sold-course-activated',
        props: {
          type: 'personal',
          id: record.id
        },
        on: {
          success: () => {
            this.$router.reload()
          }
        }
      })
    },
    // 延长有效期
    onLease(record) {
      this.$modalRouter.push({
        name: 'sold-course-lease',
        props: {
          type: 'personal',
          id: record.id
        },
        on: {
          success: () => {
            this.$router.reload()
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
            this.$router.reload()
          }
        }
      })
    },
    // 跳转合同
    toContract(record) {
      let url = `${window.location.origin}/common/contract-preview?id=${
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
            this.$router.reload()
          }
        }
      })
    },
    // 详情
    onDetail(record) {
      this.$router.push({
        path: `/shop/sold/course/info/personal/info/operation-record`,
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
