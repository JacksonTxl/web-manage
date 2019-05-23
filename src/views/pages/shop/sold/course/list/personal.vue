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
            <st-button type="primary">批量导出</st-button>
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
          :columns="columns"
          :dataSource="list" >
            <template slot="course_status" slot-scope="text">
              {{text | enumFilter('sold.course_status')}}
            </template>
            <template slot="end_time" slot-scope="text">
              {{moment(text*1000).format('YYYY-MM-DD HH:mm')}}
            </template>
            <template slot="buy_time" slot-scope="text">
              {{moment(text*1000).format('YYYY-MM-DD HH:mm')}}
            </template>
            <div slot="action" slot-scope="text,record">
              <a @click="onDetail(record)">详情</a>
              <a-divider type="vertical"></a-divider>
              <a>续卡</a>
              <st-more-dropdown class="mgl-16">
                <a-menu-item>上架</a-menu-item>
                <a-menu-item>上架</a-menu-item>
                <a-menu-item>上架</a-menu-item>
                <a-menu-item>上架</a-menu-item>
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
import { PersonalService } from './personal.service'
import { UserService } from '@/services/user.service'
import { RouteService } from '@/services/route.service'

const columns = [{
  title: '课程名',
  dataIndex: 'course_name',
  scopedSlots: { customRender: 'course_name' }
}, {
  title: '剩余课时',
  dataIndex: 'remain_course_num',
  scopedSlots: { customRender: 'remain_course_num' }
}, {
  title: '购买课时',
  dataIndex: 'init_course_num',
  scopedSlots: { customRender: 'init_course_num' }
}, {
  title: '教练级别',
  dataIndex: 'coach_level',
  scopedSlots: { customRender: 'coach_level' }
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
  dataIndex: 'end_time',
  scopedSlots: { customRender: 'end_time' }
}, {
  title: '购买日期',
  dataIndex: 'buy_time',
  scopedSlots: { customRender: 'buy_time' }
}, {
  title: '上课教练',
  dataIndex: 'coach_name',
  scopedSlots: { customRender: 'coach_name' }
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
  name: 'PageShopSoldCoursePersonalList',
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
      list: this.personalService.list$,
      page: this.personalService.page$,
      package_course: this.userService.packageCourseEnums$,
      query: this.routeService.query$
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
    onDetail() {},
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
        course_status: 1,
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
