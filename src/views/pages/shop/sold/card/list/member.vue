<template>
  <div :class="basic()">
    <st-search-panel>
      <div :class="basic('select')" class="mgt-24">
        <span style="width:90px;">会员卡类型：</span>
        <st-search-radio v-model="searchData.card_type" :list="cardTypeList"/>
      </div>
      <div :class="basic('select')">
        <span style="width:90px;">会员卡状态：</span>
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
          &nbsp;~&nbsp;
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
      <div :class="basic('content-batch')" class="mg-b16">
        <st-button type="primary" class="mgr-8">批量导出</st-button>
        <st-button type="primary" class="mgr-8" :disabled="!isUnifyCard" @click="onGiving">赠送额度</st-button>
        <st-button type="primary" class="mgr-8" :disabled="selectedRowKeys.length<1" @click="onAreas">变更入场vip区域</st-button>
      </div>
      <div :class="basic('table')">
        <st-table
          :pagination="{current:query.page,total:page.total_counts,pageSize:query.size}"
          :alertSelection="{onReset: onClear}"
          :rowSelection="{selectedRowKeys: selectedRowKeys,fixed:true, onChange: onSelectChange}"
          rowKey="id"
          @change="onPageChange"
          :columns="columns"
          :dataSource="list"
        >
          <template
            slot="remain_amount"
            slot-scope="text,record"
          >{{text}}{{record.unit | enumFilter('sold.unit')}}</template>
          <template
            slot="init_amount"
            slot-scope="text,record"
          >{{text}}{{record.unit | enumFilter('sold.unit')}}</template>
          <template slot="card_status" slot-scope="text">{{text | enumFilter('sold.card_status')}}</template>
          <template
            slot="end_time"
            slot-scope="text"
          >{{moment(text*1000).format('YYYY-MM-DD HH:mm')}}</template>
          <template slot="is_open" slot-scope="text">{{text | enumFilter('sold.is_open')}}</template>
          <template
            slot="start_time"
            slot-scope="text"
          >{{moment(text*1000).format('YYYY-MM-DD HH:mm')}}</template>
          <div slot="action" slot-scope="text,record">
            <a @click="onUpgrade(record)">升级</a>
            <a-divider type="vertical"></a-divider>
            <st-more-dropdown class="mgl-16">
              <a-menu-item @click="onRenewal(record)">续卡</a-menu-item>
              <a-menu-item @click="onSetTime(record)">修改有效时间</a-menu-item>
              <a-menu-item @click="onFreeze(record)">冻结</a-menu-item>
              <a-menu-item @click="onUnfreeze(record)">取消冻结</a-menu-item>
              <a-menu-item @click="onTransfer(record)">转让</a-menu-item>
              <a-menu-item @click="onRefund(record)">退款</a-menu-item>
              <a-menu-item @click="onArea(record)">修改入场vip区域</a-menu-item>
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

const columns = [
  {
    title: '卡名',
    dataIndex: 'card_name',
    scopedSlots: { customRender: 'card_name' }
  },
  {
    title: '剩余额度',
    dataIndex: 'remain_amount',
    scopedSlots: { customRender: 'remain_amount' }
  },
  {
    title: '初始额度',
    dataIndex: 'init_amount',
    scopedSlots: { customRender: 'init_amount' }
  },
  {
    title: '姓名',
    dataIndex: 'member_name',
    scopedSlots: { customRender: 'member_name' }
  },
  {
    title: '手机号',
    dataIndex: 'mobile',
    scopedSlots: { customRender: 'mobile' }
  },
  {
    title: '状态',
    dataIndex: 'card_status',
    scopedSlots: { customRender: 'card_status' }
  },
  {
    title: '到期日期',
    dataIndex: 'end_time',
    scopedSlots: { customRender: 'end_time' }
  },
  {
    title: '是否开卡',
    dataIndex: 'is_open',
    scopedSlots: { customRender: 'is_open' }
  },
  {
    title: '开卡日期',
    dataIndex: 'start_time',
    scopedSlots: { customRender: 'start_time' }
  },
  {
    title: '销售人员',
    dataIndex: 'staff_name',
    scopedSlots: { customRender: 'staff_name' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]
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
      sold: this.userService.soldEnums$,
      query: this.routeService.query$
    }
  },
  computed: {
    // 会员卡类型
    cardTypeList() {
      let list = [{ value: -1, label: '全部' }]
      if (!this.sold.card_type) return list
      Object.entries(this.sold.card_type.value).forEach(o => {
        list.push({ value: +o[0], label: o[1] })
      })
      return list
    },
    // 售卡状态
    cardSaleStatusList() {
      let list = [{ value: -1, label: '全部' }]
      if (!this.sold.card_status) return list
      Object.entries(this.sold.card_status.value).forEach(o => {
        list.push({ value: +o[0], label: o[1] })
      })
      return list
    },
    // 开卡状态
    cardOpenStatusList() {
      let list = [{ value: -1, label: '全部' }]
      if (!this.sold.is_open) return list
      Object.entries(this.sold.is_open.value).forEach(o => {
        list.push({ value: +o[0], label: o[1] })
      })
      return list
    },
    // 列表选择的卡是否一致
    isUnifyCard() {
      return this.selectedRows.length > 0 && this.selectedRows.every(o => o.card_type === this.selectedRows[0].card_type)
    }
  },
  data() {
    return {
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
      selectedRows: [],
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
    // 查询
    onSearch() {
      let query = {
        card_type: this.searchData.card_type,
        card_status: this.searchData.card_status,
        is_open: this.searchData.is_open,
        start_time: this.start_time
          ? `${this.start_time.format('YYYY-MM-DD')} 00:00:00`
          : '',
        end_time: this.end_time
          ? `${this.end_time.format('YYYY-MM-DD')} 23:59:59`
          : ''
      }
      this.$router.push({ query: { ...this.query, ...query }, force: true })
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
      this.start_time = this.query.start_time
        ? cloneDeep(moment(this.query.start_time))
        : null
      this.end_time = this.query.end_time
        ? cloneDeep(moment(this.query.end_time))
        : null
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
        return (
          startValue.valueOf() <
            moment(endValue)
              .subtract(31, 'd')
              .valueOf() || startValue.valueOf() > moment(endValue).valueOf()
        )
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
        return (
          endValue.valueOf() >
            moment(startValue)
              .add(31, 'd')
              .valueOf() || endValue.valueOf() < moment(startValue).valueOf()
        )
      }
    },
    // moment
    moment,
    // 列表选择
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    // 冻结
    onFreeze(record) {
      this.$modalRouter.push({
        name: 'sold-card-freeze',
        props: {
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
          return this.memberService.unFreeze(record.id).toPromise().then(() => {
            this.$router.push({ force: true, query: this.query })
          })
        }
      })
    },
    // 退款
    onRefund(record) {
      this.$modalRouter.push({
        name: 'sold-card-refund',
        props: {
          type: 'member',
          id: record.id
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
        name: 'sold-card-transfer',
        props: {
          id: record.id,
          type: 'member'
        },
        on: {
          success: () => {
            this.$router.push({ force: true, query: this.query })
          }
        }
      })
    },
    // 修改有效时间
    onSetTime(record) {
      this.$modalRouter.push({
        name: 'sold-card-set-time',
        props: {
          id: record.id
        },
        on: {
          success: () => {
            this.$router.push({ force: true, query: this.query })
          }
        }
      })
    },
    // 变更vip入场区域
    onArea(record) {
      this.$modalRouter.push({
        name: 'sold-card-area',
        props: {
          id: [record.id]
        },
        on: {
          success: () => {
            this.$router.push({ force: true, query: this.query })
          }
        }
      })
    },
    // 批量变更vip入场区域
    onAreas() {
      this.$modalRouter.push({
        name: 'sold-card-area',
        props: {
          id: this.selectedRowKeys
        },
        on: {
          success: () => {
            this.$router.push({ force: true, query: this.query })
            this.onClear()
          }
        }
      })
    },
    // 额度赠送
    onGiving() {
      this.$modalRouter.push({
        name: 'sold-card-giving',
        props: {
          id: this.selectedRowKeys,
          type: this.selectedRows[0].card_type
        },
        on: {
          success: () => {
            this.$router.push({ force: true, query: this.query })
            this.onClear()
          }
        }
      })
    },
    // 订单收款modal
    createdOrderPay(props) {
      return new Promise((resolve, reject) => {
        this.$modalRouter.push({
          name: 'sold-deal-gathering',
          props,
          on: {
            success: resolve
          }
        })
      })
    },
    // 订单收款回调
    async payCallBack(orderId, modalType, callBackType) {
      switch (callBackType) {
        case 'cancel':
          this.onSearch()
          break
        case 'pay':
          this.createdGatheringTip({ message: '收款成功', order_id: orderId }).then(res => {
            this.tipCallBack(orderId, modalType, res.type)
          })
          break
      }
    },
    // 创建成功，提示框modal
    createdGatheringTip(props) {
      return new Promise((resolve, reject) => {
        this.$modalRouter.push({
          name: 'sold-deal-gathering-tip',
          props,
          on: {
            success: resolve
          }
        })
      })
    },
    // 提示框回调，gathering-tip
    async tipCallBack(orderId, modalType, callBackType) {
      switch (callBackType) {
        case 'cancel':
          this.onSearch()
          break
        case 'Print':
          this.createdOrderPrint()
          break
        case 'ViewOrder':
          this.createdOrderViewOrder()
          break
        case 'Pay':
          this.createdOrderPay({ order_id: orderId, type: modalType }).then(res => {
            this.payCallBack(orderId, modalType, res.type)
          })
          break
      }
    },
    // 打印合同
    createdOrderPrint() {
      console.log('打印合同')
    },
    // 查看订单
    createdOrderViewOrder() {
      console.log('查看订单')
    },
    // 续卡
    onRenewal(record) {
      this.$modalRouter.push({
        name: 'sold-card-renewal-member',
        props: {
          id: record.id
        },
        on: {
          success: async res => {
            this.$router.push({ force: true, query: this.query })
            if (res.type === 'create') {
              // 创建订单成功
              let props = {
                order_id: res.orderId,
                type: 'member',
                message: '订单创建成功',
                needPay: true
              }
              let orderSuccessRes = await this.createdGatheringTip(props)
              this.tipCallBack(res.orderId, 'member', orderSuccessRes.type)
            } else if (res.type === 'createPay') {
              // 创建订单成功 并且到支付页面
              let props = {
                order_id: res.orderId,
                type: 'member'
              }
              let payOrderRes = await this.createdOrderPay(props)
              this.payCallBack(res.orderId, 'member', payOrderRes.type)
            }
          }
        }
      })
    },
    // 升级
    onUpgrade(record) {
      this.$modalRouter.push({
        name: 'sold-card-upgrade-member',
        props: {
          id: record.id
        },
        on: {
          success: () => {
            this.$router.push({ force: true, query: this.query })
          }
        }
      })
    },
    onClear() {
      this.selectedRowKeys = []
      this.selectedRows = []
    }
  }
}
</script>
