<template>
  <section class="pd-24">
    <st-panel>
      <a-row :gutter="24">
        <a-col :span="9">
          <st-info>
            <st-info-item label="商品名称">{{info.id}}</st-info-item>
            <st-info-item label="商品类型">{{info.product_name}}</st-info-item>
            <st-info-item label="有效时间">{{info.product_name}}</st-info-item>
            <st-info-item label="优惠赠送">{{info.product_name}}</st-info-item>
            <st-info-item label="开卡方式">{{info.product_name}}</st-info-item>
            <st-info-item label="权益">{{info.product_name}}</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="9">
          <st-info>
            <st-info-item label="允许转让">{{info.member_name}}</st-info-item>
            <st-info-item label="转让手续费">{{info.total_price}}</st-info-item>
            <st-info-item label="线上购买">{{info.order_discount | enumFilter('finance.pay_status')}}</st-info-item>
            <st-info-item label="售卖群体">{{info.order_discount | enumFilter('finance.pay_status')}}</st-info-item>
            <st-info-item label="入场范围">{{info.order_discount | enumFilter('finance.pay_status')}}</st-info-item>
          </st-info>
        </a-col>
        <!-- <a-col :span="6">
          <st-info>
            <st-info-item label="退款金额" >{{info.description}}</st-info-item>
            <st-info-item label="备注" >{{info.description}}</st-info-item>
          </st-info>
        </a-col> -->
      </a-row>
    </st-panel>
  </section>
</template>
<script>
import moment from 'moment'
import { CommodityInfoService } from './commodity-info.service'
import { RouteService } from '@/services/route.service'
export default {
  name: 'PageShopFinanceOrderInfoCommodityInfo',
  bem: {
    basic: 'page-shop-finance'
  },
  serviceInject() {
    return {
      routeService: RouteService,
      commodityInfoService: CommodityInfoService
    }
  },
  rxState() {
    return {
      info: this.commodityInfoService.info$,
      loading: this.commodityInfoService.loading$,
      query: this.routeService.query$
    }
  },
  data() {
    return {

    }
  },
  methods: {
    moment
  }
}
</script>
