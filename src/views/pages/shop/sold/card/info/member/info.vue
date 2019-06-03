<template>
  <section :class="basic()">
    <st-panel title="会员卡详情">
      <div slot="actions">
        <st-button class="mgr-8" type="primary">查看合同</st-button>
        <st-button class="mgr-8" type="primary">冻结</st-button>
        <st-button class="mgr-8" type="primary">更多</st-button>
      </div>
      <a-row :gutter="24">
        <a-col :span="9">
          <st-info>
            <st-info-item label="卡名">{{info.card_name}}</st-info-item>
            <st-info-item label="类型">{{info.card_type}}</st-info-item>
            <st-info-item label="初始额度">{{info.init_amount}}</st-info-item>
            <st-info-item label="剩余额度">{{info.remain_amount}}</st-info-item>
            <st-info-item label="有效期" class="mg-b0">{{info.start_time}} 至  {{info.end_time}}</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="9">
          <st-info>
            <st-info-item label="所属会员">{{info.member_name}}</st-info-item>
            <st-info-item label="手机号">{{info.mobile}}</st-info-item>
            <st-info-item label="订单号">{{info.order_id}}</st-info-item>
            <st-info-item label="订单状态">{{info.order_status}}</st-info-item>
            <st-info-item label="当前状态" class="mg-b0">{{info.card_status}}</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="6">
          <st-info>
            <st-info-item label="允许转让">{{info.is_transferable | enumFilter('sold.is_transferable')}}</st-info-item>
            <st-info-item label="转让手续费" v-if="info.transfer_unit">{{info.transfer_num}}{{info.transfer_unit | enumFilter('package_course.transfer_unit')}}</st-info-item>
            <st-info-item label="入场场馆">{{info.admission_range}}</st-info-item>
            <st-info-item label="约课范围">{{info.course_interests}}</st-info-item>
            <st-info-item label="备注" class="mg-b0">{{info.description}}</st-info-item>
          </st-info>
        </a-col>
      </a-row>
    </st-panel>
    <st-panel initial class="mgt-12"
      :tabs="[
        { label: '消费记录', route: { name: 'shop-sold-card-info-member-info-consumption-record', query: {id:infoService.id}  } },
        { label: '操作日志', route: { name: 'shop-sold-card-info-member-info-operation-record', query: {id:infoService.id}  } },
      ]"
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
  name: 'PageShopSoldCardMemberInfo',
  bem: {
    basic: 'page-shop-sold-info'
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
      query: this.routeService.query$,
      loading: this.infoService.loading$
    }
  },
  methods: {
    moment
  }
}
</script>
