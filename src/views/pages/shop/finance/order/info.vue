<template>
  <section :class="basic()">
    <st-panel title="会员卡详情">
      <div slot="actions">
        <st-button class="mgr-8" v-if="isRefund" @click="onRefund" type="primary">退款</st-button>
        <st-button class="mgr-8" v-if="isGathering" @click="createdOrderPay" type="primary">收款</st-button>
      </div>
      <a-row :gutter="24">
        <a-col :span="9">
          <st-info>
            <st-info-item label="订单号">{{info.id}}</st-info-item>
            <st-info-item label="商品名称">{{info.product_name}}</st-info-item>
            <st-info-item label="购买会员">{{info.member_name}}  {{info.member_mobile}}</st-info-item>
            <st-info-item label="下单人">{{info.operator_name}}</st-info-item>
            <st-info-item label="下单时间" >{{info.created_time}}</st-info-item>
            <st-info-item label="销售" >{{info.staff_name}}</st-info-item>
            <st-info-item label="订单状态" >{{info.order_status | enumFilter('finance.order_status')}}</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="9">
          <st-info>
            <st-info-item label="赠送">{{info.gift_amount}}</st-info-item>
            <st-info-item label="订单总额">{{info.total_price}}</st-info-item>
            <st-info-item label="优惠金额">{{info.order_discount}}</st-info-item>
            <st-info-item label="减免金额">{{info.reduce_price}}</st-info-item>
            <st-info-item label="应收金额">{{info.pay_price}}</st-info-item>
            <st-info-item label="支付状态" >{{info.pay_status | enumFilter('finance.pay_status')}}</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="6">
          <st-info>
            <st-info-item label="备注" >{{info.description}}</st-info-item>
          </st-info>
        </a-col>
      </a-row>
    </st-panel>
    <st-panel initial class="mgt-12"
      :tabs="tabs"
    >
    <router-view></router-view>
  </st-panel>
  </section>
</template>
<script>
import { InfoService } from './info.service'
import { RouteService } from '@/services/route.service'
import moment from 'moment'
export default {
  name: 'PageShopFinanceOrderInfo',
  bem: {
    basic: 'page-shop-finance-info'
  },
  serviceInject() {
    return {
      infoService: InfoService,
      routeService: RouteService
    }
  },
  rxState() {
    return {
      info: this.infoService.info$,
      tabs: this.infoService.tabs$,
      query: this.routeService.query$,
      loading: this.infoService.loading$
    }
  },
  computed: {
    isRefund() {
      if ((this.info.pay_status === 2 || this.info.pay_status === 3) && (this.info.order_status === 1 || this.info.order_status === 2)) {
        return true
      }
      return false
    },
    isGathering() {
      if ((this.info.pay_status === 1 || this.info.pay_status === 2) && (this.info.order_status === 1 || this.info.order_status === 5)) {
        return true
      }
      return false
    }
  },
  methods: {
    // 订单收款modal
    createdOrderPay() {
      this.$modalRouter.push({
        name: 'sold-deal-gathering',
        props: {
          id: this.infoService.id
        },
        on: {
          success: () => {
            console.log('收款成功')
          }
        }
      })
    },
    // 退款
    onRefund() {
      this.$modalRouter.push({
        name: 'shop-finance-refund',
        props: {
          id: this.infoService.id
        },
        on: {
          success: () => {
            this.$router.push({ force: true, query: this.query })
          }
        }
      })
    }

  }
}
</script>
