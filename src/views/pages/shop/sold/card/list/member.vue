<template>
  <div :class="basic()">
    <st-search-panel>
        <div :class="basic('select')" class="mgt-24">
          <span style="width:90px;">会员卡类型：</span>
          <st-search-radio v-model="searchData.card_type" :list="cardTypeList"/>
        </div>
        <div :class="basic('select')">
          <span style="width:90px;">售卡状态：</span>
          <st-search-radio v-model="searchData.card_status" :list="cardSaleStatusList"/>
        </div>
        <div :class="basic('select')">
          <span style="width:90px;">开卡状态：</span>
          <st-search-radio v-model="searchData.is_open" :list="cardOpenStatusList"/>
        </div>
        <div slot="more">
          <div :class="basic('select')">
            <span style="width:90px;">开卡时间：</span>
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
        </div>
        <div slot="button">
            <st-button type="primary" @click="onSearch">查询</st-button>
            <st-button class="mgl-8" @click="onReset">重置</st-button>
        </div>
    </st-search-panel>
    <div :class="basic('content')">
        <div :class="basic('content-batch')">
            <st-button type="primary" class="mgr-8">批量导出</st-button>
            <st-button type="primary" class="mgr-8">赠送额度</st-button>
            <st-button type="primary" class="mgr-8">变更入场vip区域</st-button>
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
            <template slot="remain_amount" slot-scope="text,record">
              {{text}}{{record.unit | enumFilter('sold.unit')}}
            </template>
            <template slot="init_amount" slot-scope="text,record">
              {{text}}{{record.unit | enumFilter('sold.unit')}}
            </template>
            <template slot="card_status" slot-scope="text">
              {{text | enumFilter('sold.card_status')}}
            </template>
            <template slot="end_time" slot-scope="text">
              {{moment(text*1000).format('YYYY-MM-DD HH:mm')}}
            </template>
            <template slot="is_open" slot-scope="text">
              {{text | enumFilter('sold.is_open')}}
            </template>
            <template slot="start_time" slot-scope="text">
              {{moment(text*1000).format('YYYY-MM-DD HH:mm')}}
            </template>
            <div slot="action" slot-scope="text,record">
              <a @click="onGathering(record)">订单收款</a>
              <a-divider type="vertical"></a-divider>
              <st-more-dropdown class="mgl-16">
                <a-menu-item @click="onUpgrade(record)">升级</a-menu-item>
                <a-menu-item @click="onRefund(record)">退款</a-menu-item>
                <a-menu-item @click="onTransfer(record)">转让</a-menu-item>
                <a-menu-item @click="onFreeze(record)">冻结</a-menu-item>
                <a-menu-item @click="onSurplus(record)">修改剩余价值</a-menu-item>
                <a-menu-item @click="onRelet(record)">续租</a-menu-item>
                <a-menu-item @click="onSale(record)">交易签单</a-menu-item>
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
import { MemberService } from './member.service'
import { UserService } from '@/services/user.service'
import { RouteService } from '@/services/route.service'

const columns = [{
  title: '卡名',
  dataIndex: 'card_name',
  scopedSlots: { customRender: 'card_name' }
}, {
  title: '剩余额度',
  dataIndex: 'remain_amount',
  scopedSlots: { customRender: 'remain_amount' }
}, {
  title: '初始额度',
  dataIndex: 'init_amount',
  scopedSlots: { customRender: 'init_amount' }
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
  dataIndex: 'card_status',
  scopedSlots: { customRender: 'card_status' }
}, {
  title: '到期日期',
  dataIndex: 'end_time',
  scopedSlots: { customRender: 'end_time' }
}, {
  title: '是否开卡',
  dataIndex: 'is_open',
  scopedSlots: { customRender: 'is_open' }
}, {
  title: '开卡日期',
  dataIndex: 'start_time',
  scopedSlots: { customRender: 'start_time' }
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
  name: 'PageShopSoldCardMemberList',
  bem: {
    basic: 'page-shop-sold'
  },
  serviceInject() {
    return {
      userService: UserService,
      routeService: RouteService,
      memberService: MemberService
    }
  },
  rxState() {
    return {
      list: this.memberService.list$,
      page: this.memberService.page$,
      package_course: this.userService.packageCourseEnums$,
      query: this.routeService.query$
    }
  },
  data() {
    return {
      // 会员卡类型
      cardTypeList: [
        { value: -1, label: '全部' },
        { value: 1, label: '期限卡' },
        { value: 2, label: '会员卡' }
      ],
      // 售卡状态
      cardSaleStatusList: [
        { value: 1, label: '有效' },
        { value: 2, label: '失效' },
        { value: 3, label: '已冻结' },
        { value: 4, label: '即将到期' }
      ],
      // 开卡状态
      cardOpenStatusList: [
        { value: -1, label: '全部' },
        { value: 1, label: '已开卡' },
        { value: 2, label: '未开卡' }
      ],
      searchData: {
        card_type: -1,
        card_status: 1,
        is_open: -1
      },
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
    // 查询
    onSearch() {
      let query = {
        card_type: this.searchData.card_type,
        card_status: this.searchData.card_status,
        is_open: this.searchData.is_open,
        start_time: this.start_time ? `${this.start_time.format('YYYY-MM-DD')} 00:00:00` : '',
        end_time: this.end_time ? `${this.end_time.format('YYYY-MM-DD')} 23:59:59` : ''
      }
      this.$router.push({ query: { ...this.query, ...query } })
    },
    // 重置
    onReset() {
      let query = {
        card_type: -1,
        card_status: 1,
        is_open: -1,
        start_time: '',
        end_time: ''
      }
      this.$router.push({ query: { ...this.query, ...query } })
    },
    // 设置searchData
    setSearchData() {
      this.searchData = cloneDeep(this.query)
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
    // 列表选择
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    // 升级
    onUpgrade() {
      this.$modalRouter.push({
        name: 'sold-card-upgrade'
      })
    },
    // 退款
    onRefund() {
      this.$modalRouter.push({
        name: 'sold-card-refund'
      })
    },
    // 转让
    onTransfer() {
      this.$modalRouter.push({
        name: 'sold-card-transfer'
      })
    },
    // 冻结
    onFreeze() {
      this.$modalRouter.push({
        name: 'sold-course-freeze'
      })
    },
    // 修改剩余价值
    onSurplus() {
      this.$modalRouter.push({
        name: 'sold-package-surplus'
      })
    },
    // 续租
    onRelet() {
      this.$modalRouter.push({
        name: 'sold-lease-relet'
      })
    },
    // 交易签单
    onSale() {
      this.$modalRouter.push({
        name: 'sold-deal-sale'
      })
    },
    // 交易签单
    onGathering() {
      this.$modalRouter.push({
        name: 'sold-deal-gathering'
      })
    }
  }
}
</script>
