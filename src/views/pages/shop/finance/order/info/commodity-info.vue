<template>
  <section class="pd-24">
    <st-panel >
      <!-- 会员卡 -->
      <a-row :gutter="24" v-if="product_type === 1">
        <a-col :span="9">
          <st-info>
            <st-info-item label="商品名称">{{info.product_name}}</st-info-item>
            <st-info-item label="商品类型">{{info.product_type}}</st-info-item>
            <st-info-item label="有效时间">{{info.valid_time}}</st-info-item>
            <st-info-item label="赠送上限">{{info.gift_maximum}}</st-info-item>
            <st-info-item label="约课权益">{{info.course_interests}}</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="9">
          <st-info>
            <st-info-item label="允许转让">{{info.is_transfer_text}}</st-info-item>
            <st-info-item label="转让手续费" v-if="info.is_transfer !== 0">{{info.transfer_fee}}</st-info-item>
            <st-info-item label="入场范围">{{info.admission_range}}</st-info-item>
          </st-info>
        </a-col>
      </a-row>
      <!-- 储值卡 -->
      <a-row :gutter="24" v-if="product_type === 5">
        <a-col :span="9">
          <st-info>
            <st-info-item label="商品名称">{{info.product_name}}</st-info-item>
            <st-info-item label="商品类型">{{info.product_type}}</st-info-item>
            <st-info-item label="储值金额">{{info.deposit_amount}}</st-info-item>
            <st-info-item label="消费门店">{{info.consume_range}}</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="9">
          <st-info>
            <st-info-item label="消费类目">{{info.consume_product}}</st-info-item>
            <st-info-item label="有效时间">{{info.valid_time}}</st-info-item>
            <st-info-item label="允许转让">{{info.is_transfer_text}}</st-info-item>
            <st-info-item label="转让手续费" v-if="info.is_transfer !== 0">{{info.transfer_fee}}</st-info-item>
          </st-info>
        </a-col>
      </a-row>
      <!-- 私教课 -->
      <a-row :gutter="24" v-if="product_type === 2">
        <a-col :span="9">
          <st-info>
            <st-info-item label="商品名称">{{info.product_name}}</st-info-item>
            <st-info-item label="商品类型">{{info.product_type}}</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="9">
          <st-info>
            <st-info-item label="上课门店">{{info.admission_range}}</st-info-item>
            <st-info-item label="时长">{{info.valid_time}}</st-info-item>
          </st-info>
        </a-col>
      </a-row>
      <!-- 课程包 -->
      <a-row :gutter="24" v-if="product_type === 4">
        <a-col :span="9">
          <st-info>
            <st-info-item label="商品名称">{{info.product_name}}</st-info-item>
            <st-info-item label="商品类型">{{info.product_type}}</st-info-item>
            <st-info-item label="总课时">{{info.course_num}}</st-info-item>
            <st-info-item label="有效期">{{info.valid_time}}</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="9">
          <st-info>
            <st-info-item label="上课门店">{{info.shop_name}}</st-info-item>
            <st-info-item label="上课范围">{{info.course_range}}</st-info-item>
            <st-info-item label="允许转让">{{info.is_transfer_text}}</st-info-item>
            <st-info-item label="转让手续费" v-if="info.is_transfer !== 0">{{info.transfer_fee}}</st-info-item>
          </st-info>
        </a-col>
      </a-row>
      <!-- 租赁 -->
      <a-row :gutter="24" v-if="product_type === 10">
        <a-col :span="9">
          <st-info>
            <st-info-item label="商品名称">{{info.product_name}}</st-info-item>
            <st-info-item label="商品类型">{{info.product_type}}</st-info-item>
            <st-info-item label="租赁计费">{{info.unit_price}}</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="9">
          <st-info>
            <st-info-item label="允许转让">{{info.is_transfer_text}}</st-info-item>
            <st-info-item label="转让手续费" v-if="info.is_transfer !== 0">{{info.transfer_fee}}</st-info-item>
          </st-info>
        </a-col>
      </a-row>
      <!-- 团体课 -->
      <a-row :gutter="24" v-if="product_type === 3">
        <a-col :span="9">
          <st-info>
            <st-info-item label="商品名称">{{info.product_name}}</st-info-item>
            <st-info-item label="商品类型">{{info.product_type}}</st-info-item>
            <st-info-item label="时长">{{info.duration}}</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="9">
          <st-info>
            <st-info-item label="上课门店">{{info.shop_name}}</st-info-item>
            <st-info-item label="上课时间">{{info.start_time}}</st-info-item>
          </st-info>
        </a-col>
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
      product_type: this.commodityInfoService.product_type$,
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
