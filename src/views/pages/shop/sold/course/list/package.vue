<template>
  <div :class="basic()">
    <st-search-panel>
        <div :class="basic('select')">
          <span style="width:90px;">课程状态：</span>
          <st-search-radio v-model="course_status" :list="cardSaleStatusList"/>
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
          ~
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
            <st-button type="primary" @click="onSearch">查询</st-button>
            <st-button class="mgl-8" @click="onReset">重置</st-button>
        </div>
    </st-search-panel>
    <div :class="basic('content')">
        <div :class="basic('content-batch')">
            <st-button v-if="auth.export" type="primary">批量导出</st-button>
        </div>
        <div :class="basic('table-select-info')">
            <st-icon type="weibo" />
            <span class="mgl-8 mgr-16">已选 <i :class="basic('table-select-number')">{{selectedRowKeys.length}}</i> / 10 条数据</span>
            <a href="javascript:void(0)">删除</a>
        </div>
        <div :class="basic('table')">
          <st-table
          :pagination="{current:query.page,total:page.total_counts,pageSize:query.size}"
          :rowSelection="{selectedRowKeys: selectedRowKeys,fixed:true, onChange: onSelectChange}"
          rowKey="id"
          @change="onPageChange"
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
                <a-menu-item v-if="record.auth['shop:sold:sold_package_course|refund']" @click="onRefund(record)">退款</a-menu-item>
                <a-menu-item v-if="record.auth['shop:sold:sold_package_course|export_contract']">查看合同</a-menu-item>
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

const columns = [{
  title: '课程包名',
  dataIndex: 'course_name',
  scopedSlots: { customRender: 'course_name' }
}, {
  title: '购买总课时',
  dataIndex: 'buy_course_num',
  scopedSlots: { customRender: 'buy_course_num' }
}, {
  title: '剩余总课时',
  dataIndex: 'remain_course_num',
  scopedSlots: { customRender: 'remain_course_num' }
}, {
  title: '姓名',
  dataIndex: 'member_name',
  scopedSlots: { customRender: 'member_name' }
}, {
  title: '手机号',
  dataIndex: 'mobile',
  scopedSlots: { customRender: 'mobile' }
}, {
  title: '状态',
  dataIndex: 'course_status',
  scopedSlots: { customRender: 'course_status' }
}, {
  title: '到期日期',
  dataIndex: 'course_end_time',
  scopedSlots: { customRender: 'course_end_time' }
}, {
  title: '购买日期',
  dataIndex: 'course_buy_time',
  scopedSlots: { customRender: 'course_buy_time' }
}, {
  title: '销售人员',
  dataIndex: 'staff_name',
  scopedSlots: { customRender: 'staff_name' }
}, {
  title: '操作',
  dataIndex: 'action',
  scopedSlots: { customRender: 'action' }
}]
export default {
  name: 'PageShopSoldCoursePackageList',
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
      auth: this.packageService.auth$
    }
  },
  data() {
    return {
      // 售卡状态
      cardSaleStatusList: [
        { value: -1, label: '全部' },
        { value: 1, label: '有效' },
        { value: 2, label: '失效' },
        { value: 3, label: '已冻结' },
        { value: 4, label: '即将到期' }
      ],
      course_status: -1,
      start_time: null,
      end_time: null,
      // 结束时间面板是否显示
      endOpen: false,
      selectedRowKeys: [],
      columns
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
    onSearch() {
      let query = {
        course_status: this.course_status,
        start_time: this.start_time ? `${this.start_time.format('YYYY-MM-DD')} 00:00:00` : '',
        end_time: this.end_time ? `${this.end_time.format('YYYY-MM-DD')} 23:59:59` : ''
      }
      this.$router.push({ query: { ...this.query, ...query } })
    },
    // 重置
    onReset() {
      let query = {
        course_status: -1,
        start_time: '',
        end_time: ''
      }
      this.$router.push({ query: { ...this.query, ...query } })
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
