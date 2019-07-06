<template>
  <div :class="basic()">
    <st-search-panel>
        <div :class="basic('select')">
          <span style="width:90px;">课程状态：</span>
          <st-search-radio v-model="query.course_status" :list="cardSaleStatusList"/>
        </div>
        <div :class="basic('select')">
          <span style="width:90px;">购买时间：</span>
          <a-date-picker
            :disabledDate="disabledStartDate"
            format="YYYY-MM-DD"
            v-model="start_time"
            placeholder="开始日期"
            :showToday="false"
            @openChange="handleStartOpenChange"
            @change="start_time_change"
          />
          &nbsp;
          ~
          &nbsp;
          <a-date-picker
            :disabledDate="disabledEndDate"
            format="YYYY-MM-DD"
            v-model="end_time"
            placeholder="结束日期"
            :showToday="false"
            :open="endOpen"
            @openChange="handleEndOpenChange"
            @change="end_time_change"
          />
        </div>
        <div slot="button">
            <st-button type="primary" @click="onSearchNative">查询</st-button>
            <st-button class="mgl-8" @click="onSearhReset">重置</st-button>
        </div>
    </st-search-panel>
    <div :class="basic('content')">
        <div :class="basic('content-batch')" class="mg-b16">
            <st-button v-if="auth.export" type="primary">批量导出</st-button>
        </div>
        <div :class="basic('table')">
          <st-table
          :alertSelection="{onReset: onClear}"
          :page="page"
          :rowSelection="{selectedRowKeys: selectedRowKeys,fixed:true, onChange: onSelectChange}"
          rowKey="id"
          @change="onPageChange"
          :scroll="{x:1800}"
          :columns="columns"
          :dataSource="list" >
            <template slot="course_status" slot-scope="text">
              {{text | enumFilter('sold.course_status')}}
            </template>
            <template slot="course_end_time" slot-scope="text">
              {{moment(text).format('YYYY-MM-DD HH:mm')}}
            </template>
            <template slot="course_buy_time" slot-scope="text">
              {{moment(text).format('YYYY-MM-DD HH:mm')}}
            </template>
            <div slot="action" slot-scope="text,record">
              <a v-if="record.auth['shop:sold:sold_package_course|get']" @click="onDetail(record)">详情</a>
              <a-divider type="vertical"></a-divider>
              <st-more-dropdown class="mgl-16">
                <a-menu-item v-if="record.auth['shop:sold:sold_package_course|course_num']" @click="onSurplus(record)">修改剩余课时</a-menu-item>
                <a-menu-item v-if="record.auth['shop:sold:sold_package_course|frozen']" @click="onFreeze(record)">冻结</a-menu-item>
                <a-menu-item v-if="record.auth['shop:sold:sold_package_course|unfrozen']" @click="onUnfreeze(record)">取消冻结</a-menu-item>
                <a-menu-item v-if="record.auth['shop:sold:sold_package_course|transfer']" @click="onTransfer(record)">转让</a-menu-item>
                <a-menu-item v-if="record.auth['brand_shop:order:order|refund']" @click="onRefund(record)">退款</a-menu-item>
                <a-menu-item v-if="record.auth['shop:sold:sold_package_course|export_contract']"  @click="toContract(record)">查看合同</a-menu-item>
              </st-more-dropdown>
            </div>
          </st-table>
        </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import { cloneDeep, filter } from 'lodash-es'
import { PackageService } from './package.service'
import { UserService } from '@/services/user.service'
import { RouteService } from '@/services/route.service'
import tableMixin from '@/mixins/table.mixin'
import { columns } from './package.config'

export default {
  name: 'PageShopSoldCoursePackageList',
  mixins: [tableMixin],
  bem: {
    basic: 'page-shop-sold'
  },
  serviceInject() {
    return {
      userService: UserService,
      routeService: RouteService,
      packageService: PackageService
    }
  },
  rxState() {
    return {
      list: this.packageService.list$,
      page: this.packageService.page$,
      package_course: this.userService.packageCourseEnums$,
      query: this.routeService.query$,
      auth: this.packageService.auth$,
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
      selectedRows: []
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
    columns,
    cardSaleStatusList() {
      let list = [{ value: -1, label: '全部' }]
      if (!this.soldEnums.card_status) return list
      Object.entries(this.soldEnums.card_status.value).forEach(o => {
        list.push({ value: +o[0], label: o[1] })
      })
      return list
    }
  },
  methods: {
    // 清空列表选择
    onClear() {
      this.selectedRowKeys = []
      this.selectedRows = []
    },
    onPageChange(data) {
      this.$router.push({ query: { ...this.query, page: data.current, size: data.pageSize } })
    },
    // 修改剩余课时
    onSurplus(record) {
      let that = this
      let data = {
        id: record.id,
        courseName: record.course_name,
        time: `${moment(record.course_buy_time).format('YYYY-MM-DD HH:mm')} 至 ${moment(record.course_end_time).format('YYYY-MM-DD HH:mm')}`
      }
      this.$modalRouter.push({
        name: 'sold-course-surplus',
        props: {
          courseType: 'coursePackage',
          courseData: data
        },
        on: {
          success() {
            that.$router.push({ force: true, query: that.query })
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
          id: record.id,
          courseName: record.course_name,
          courseNum: record.remain_course_num,
          courseEndTime: moment(record.course_end_time),
          time: `${moment(record.course_buy_time).format('YYYY-MM-DD HH:mm')} 至 ${moment(record.course_end_time).format('YYYY-MM-DD HH:mm')}`
        },
        on: {
          success: () => {
            console.log(3)
            setTimeout(() => {
              this.$router.push({ force: true, query: { ...this.query } })
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
          this.packageService.unFreeze(record.id).toPromise().then(() => {
            this.$router.push({ force: true, query: this.query })
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
            that.$router.push({ force: true, query: that.query })
          }
        }
      })
    },
    // 跳转合同
    toContract(record) {
      let url = `${window.location.origin}/extra/contract-preview?id=${record.order_id}`
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
            that.$router.push({ force: true, query: that.query })
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
      this.query.start_time = this.start_time ? `${this.start_time.format('YYYY-MM-DD')} 00:00:00` : ''
      this.query.end_time = this.end_time ? `${this.end_time.format('YYYY-MM-DD')} 00:00:00` : ''
      this.onSearch()
    },
    // 设置searchData
    setSearchData() {
      this.course_status = this.query.course_status
      this.start_time = this.query.start_time ? cloneDeep(moment(this.query.start_time)) : null
      this.end_time = this.query.end_time ? cloneDeep(moment(this.query.end_time)) : null
    },

    // 售卖时间-start
    start_time_change(data) {
      this.start_time = cloneDeep(data)
    },
    handleStartOpenChange(open) {
      if (!open) {
        this.endOpen = true
      }
    },
    disabledStartDate(startValue) {
      const endValue = this.end_time
      if (endValue) {
        // 选择了结束时间
        return startValue.valueOf() < moment(endValue).subtract(31, 'd').valueOf() || startValue.valueOf() > moment(endValue).valueOf()
      }
    },
    // 售卖时间-end
    end_time_change(data) {
      this.end_time = cloneDeep(data)
    },
    handleEndOpenChange(open) {
      this.endOpen = open
    },
    disabledEndDate(endValue) {
      const startValue = this.start_time
      if (startValue) {
        // 选择了开始时间
        return endValue.valueOf() > moment(startValue).add(31, 'd').valueOf() || endValue.valueOf() < moment(startValue).valueOf()
      }
    },
    // moment
    moment,
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    }
  }
}
</script>
