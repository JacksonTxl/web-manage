<template>
  <div :class="basic()">
    <st-search-panel>
        <div :class="basic('select')">
          <span style="width:90px;">课程状态：</span>
          <st-search-radio v-model="query.course_status" :list="personalCourseList" />
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
          <st-button type="primary" @click="onSearchNative" :loading="loading.getList">查询</st-button>
          <st-button class="mgl-8" @click="onSearhReset">重置</st-button>
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
          :page="page"
          :rowSelection="{selectedRowKeys: selectedRowKeys,fixed:true, onChange: onSelectChange}"
          rowKey="id"
          :scroll="{x:1800}"
          :columns="columns"
          :dataSource="list" >
            <template slot="course_status" slot-scope="text">
              {{text | enumFilter('sold.course_status')}}
            </template>
            <template slot="end_time" slot-scope="text">
              {{moment(text).format('YYYY-MM-DD HH:mm')}}
            </template>
            <template slot="buy_time" slot-scope="text">
              {{moment(text).format('YYYY-MM-DD HH:mm')}}
            </template>
            <div slot="action" slot-scope="text, record">
              <st-table-actions>
                <a v-if="record.auth['shop:sold:sold_personal_course|get']" @click="onDetail(record)">详情</a>
                <a v-if="record.auth['shop:sold:sold_personal_course|course_num']" @click="onSurplus(record)">修改剩余课时</a>
                <a v-if="record.auth['shop:sold:sold_personal_course|frozen']" @click="onFreeze(record)">冻结</a>
                <a v-if="record.auth['shop:sold:sold_personal_course|unfrozen']" @click="onUnfreeze(record)">取消冻结</a>
                <a v-if="record.auth['shop:sold:sold_personal_course|change_coach']" @click="onEditCoach(record)">修改教练</a>
                <a v-if="record.auth['shop:sold:sold_personal_course|transfer']" @click="onTransfer(record)">转让</a>
                <a v-if="record.auth['brand_shop:order:order|refund']" @click="onRefund(record)">退款</a>
                <a v-if="record.auth['shop:sold:sold_personal_course|export_contract']"  @click="toContract(record)">查看合同</a>
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

export default {
  name: 'PageShopSoldCoursePersonalList',
  mixins: [tableMixin],
  bem: {
    basic: 'page-shop-sold'
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
      selectedRowKeys: []
    }
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
    },
    // 冻结
    onFreeze(record) {
      this.$modalRouter.push({
        name: 'sold-course-freeze',
        props: {
          type: 'personal',
          id: record.id,
          courseName: record.course_name,
          courseNum: record.remain_course_num,
          courseEndTime: moment(record.end_time),
          time: `${moment(record.buy_time).format('YYYY-MM-DD HH:mm')} 至 ${moment(record.end_time).format('YYYY-MM-DD HH:mm')}`
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
          return this.personalService.unFreeze(record.id).toPromise().then(() => {
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
      let url = `${window.location.origin}/extra/contract-preview?id=${record.order_id}`
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
    }
  }
}
</script>
