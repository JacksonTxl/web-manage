<template>
  <div :class="basic()">
    <st-search-panel>
      <div :class="basic('select')">
        <span :class="basic('select-text')">课程状态：</span>
        <st-search-radio v-model="query.course_status" :list="courseStatus" />
      </div>
      <div :class="basic('select')">
        <span :class="basic('select-text')">购买时间：</span>
        <st-range-picker
          :disabledDays="180"
          :value="selectTime"
        ></st-range-picker>
      </div>
      <div slot="button">
        <st-button type="primary" @click="onSearchNative">查询</st-button>
        <st-button class="mg-l8" @click="onSearhReset">重置</st-button>
      </div>
    </st-search-panel>
    <div :class="basic('content')">
      <div :class="basic('content-batch')" class="mg-b16">
        <!-- NOTE: 导出 -->
        <!-- <st-button v-if="auth.export" type="primary">批量导出</st-button> -->
      </div>
      <!--
          NOTE: 本期不做，先去掉选择框
          :alertSelection="{onReset: onClear}"
          :rowSelection="{selectedRowKeys: selectedRowKeys,fixed:true, onChange: onSelectChange}"
         -->
      <div :class="basic('table')">
        <st-table
          :page="page"
          rowKey="id"
          @change="onTableChange"
          :scroll="{ x: 1800 }"
          :columns="columns"
          :dataSource="list"
        >
          <template slot="course_status" slot-scope="text">
            {{ text | enumFilter('sold.course_status') }}
          </template>
          <template slot="course_end_time" slot-scope="text">
            {{ moment(text).format('YYYY-MM-DD HH:mm') }}
          </template>
          <template slot="course_buy_time" slot-scope="text">
            {{ moment(text).format('YYYY-MM-DD HH:mm') }}
          </template>
          <st-table-actions slot="action" slot-scope="text, record">
            <a
              v-if="record.auth['shop:sold:sold_package_course|get']"
              @click="onDetail(record)"
            >
              详情
            </a>
            <a
              v-if="record.auth['shop:sold:sold_package_course|course_num']"
              @click="onSurplus(record)"
            >
              修改剩余课时
            </a>
            <a
              v-if="record.auth['shop:sold:sold_package_course|frozen']"
              @click="onFreeze(record)"
            >
              冻结
            </a>
            <a
              v-if="record.auth['shop:sold:sold_package_course|unfrozen']"
              @click="onUnfreeze(record)"
            >
              取消冻结
            </a>
            <a
              v-if="record.auth['shop:sold:sold_package_course|transfer']"
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
                record.auth['shop:sold:sold_package_course|export_contract']
              "
              @click="toContract(record)"
            >
              查看合同
            </a>
          </st-table-actions>
        </st-table>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import { cloneDeep, filter } from 'lodash-es'
import { PackageService } from './package.service'
import { RouteService } from '@/services/route.service'
import tableMixin from '@/mixins/table.mixin'
import { columns } from './package.config'
import SoldCourseFreeze from '@/views/biz-modals/sold/course/freeze'
import SoldCourseRefund from '@/views/biz-modals/sold/course/refund'
import SoldCourseSurplus from '@/views/biz-modals/sold/course/surplus'
import SoldCourseTransfer from '@/views/biz-modals/sold/course/transfer'
export default {
  name: 'PageShopSoldCoursePackageList',
  mixins: [tableMixin],
  bem: {
    basic: 'page-shop-sold'
  },
  modals: {
    SoldCourseFreeze,
    SoldCourseRefund,
    SoldCourseSurplus,
    SoldCourseTransfer
  },
  serviceProviders() {
    return [PackageService]
  },
  serviceInject() {
    return {
      routeService: RouteService,
      packageService: PackageService
    }
  },
  rxState() {
    return {
      list: this.packageService.list$,
      page: this.packageService.page$,
      courseStatus: this.packageService.courseStatus$,
      query: this.routeService.query$,
      auth: this.packageService.auth$
    }
  },
  data() {
    return {
      course_status: -1,
      // 结束时间面板是否显示
      endOpen: false,
      selectedRowKeys: [],
      selectedRows: [],
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

  mounted() {
    this.setSearchData()
  },
  watch: {
    query(newVal) {
      this.setSearchData()
    }
  },
  computed: {
    columns
  },
  methods: {
    // 清空列表选择
    onClear() {
      this.selectedRowKeys = []
      this.selectedRows = []
    },
    onPageChange(data) {
      this.$router.push({
        query: { ...this.query, page: data.current, size: data.pageSize }
      })
    },
    // 修改剩余课时
    onSurplus(record) {
      let that = this
      let data = {
        id: record.id,
        courseName: record.course_name,
        time: `${moment(record.course_buy_time).format(
          'YYYY-MM-DD HH:mm'
        )} 至 ${moment(record.course_end_time).format('YYYY-MM-DD HH:mm')}`
      }
      this.$modalRouter.push({
        name: 'sold-course-surplus',
        props: {
          courseType: 'coursePackage',
          courseData: data
        },
        on: {
          success() {
            that.$router.reload()
          }
        }
      })
    },
    // 冻结
    onFreeze(record) {
      let that = this
      this.$modalRouter.push({
        name: 'sold-course-freeze',
        props: {
          type: 'package',
          id: record.id
        },
        on: {
          success: () => {
            setTimeout(() => {
              this.$router.reload()
            }, 100)
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
          this.packageService
            .unFreeze(record.id)
            .toPromise()
            .then(() => {
              this.$router.reload()
            })
        }
      })
    },
    // 转让
    onTransfer(record) {
      let that = this
      this.$modalRouter.push({
        name: 'sold-course-transfer',
        props: {
          type: 'package',
          id: record.id
        },
        on: {
          success() {
            that.$router.reload()
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
      let that = this
      this.$modalRouter.push({
        name: 'sold-course-refund',
        props: {
          type: 'package',
          id: record.id
        },
        on: {
          success() {
            that.$router.reload()
          }
        }
      })
    },
    // 详情
    onDetail(record) {
      this.$router.push({
        path: `/shop/sold/course/info/package/info/consumption-record`,
        query: { id: record.id }
      })
    },
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
    }
  }
}
</script>
