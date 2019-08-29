<template>
  <section :class="basic()">
    <st-panel title="储值卡详情">
      <div slot="actions">
        <st-button
          v-if="auth['shop:sold:sold_deposit_card|export_contract']"
          class="mgr-8"
          type="primary"
          @click="toContract"
        >
          查看合同
        </st-button>
        <st-button
          v-if="auth['brand_shop:order:order|refund']"
          class="mgr-8"
          @click="onRefund"
        >
          退款
        </st-button>
        <st-button
          v-if="auth['shop:sold:sold_deposit_card|transfer']"
          class="mgr-8"
          @click="onTransfer"
        >
          转让
        </st-button>
      </div>
      <a-row :gutter="24">
        <a-col :span="9">
          <st-info>
            <st-info-item label="卡名">{{ info.card_name }}</st-info-item>
            <st-info-item label="类型">{{ info.type }}</st-info-item>
            <st-info-item label="初始额度">{{ info.init_amount }}</st-info-item>
            <st-info-item label="剩余额度">{{ info.now_amount }}</st-info-item>
            <st-info-item label="有效期" class="mg-b0">
              {{ moment(info.buy_time * 1000).format('YYYY-MM-DD HH:mm') }} 至
              {{ moment(info.end_time * 1000).format('YYYY-MM-DD HH:mm') }}
            </st-info-item>
          </st-info>
        </a-col>
        <a-col :span="9">
          <st-info>
            <st-info-item label="所属会员">{{ info.member_name }}</st-info-item>
            <st-info-item label="手机号">{{ info.mobile }}</st-info-item>
            <st-info-item label="订单号">{{ info.order_id }}</st-info-item>
            <st-info-item label="订单状态">
              {{ info.order_status | enumFilter('sold.order_status') }}
            </st-info-item>
            <st-info-item label="当前状态" class="mg-b0">
              {{ info.is_valid | enumFilter('sold.card_status') }}
            </st-info-item>
          </st-info>
        </a-col>
        <a-col :span="6">
          <st-info>
            <st-info-item label="允许转让">
              {{ info.is_transferable | enumFilter('sold.is_transferable') }}
            </st-info-item>
            <st-info-item
              label="转让手续费"
              v-if="info.is_transferable && info.transfer_unit"
            >
              {{ info.transfer_num
              }}{{
                info.transfer_unit | enumFilter('package_course.transfer_unit')
              }}
            </st-info-item>
            <!-- <st-info-item label="消费场馆">
              <template v-if="+info.shop_range === 1">
                {{ info.shop_name }}
              </template>
              <template v-if="+info.shop_range === 2">
                <a @click="onShowShops">
                  {{ info.shop_range | enumFilter('sold.admission_range') }}
                </a>
              </template>
              <template v-if="+info.shop_range === 3">
                {{ info.shop_range | enumFilter('sold.admission_range') }}
              </template>
            </st-info-item> -->
            <st-info-item label="消费场馆">
              <template v-if="info.shop_range.id < 2">
                {{ info.shop_range.shop_name }}
              </template>
              <a-popover :title="info.shop_range.shop_name" v-else>
                <template slot="content">
                  <st-table
                    :columns="admissionColumns"
                    :dataSource="info.shop_range.shops"
                    :pagination="false"
                    key="id"
                    :class="basic('popover-content')"
                  ></st-table>
                </template>
                <a type="primary">
                  {{ info.shop_range.id | enumFilter('sold.admission_range') }}
                </a>
              </a-popover>
            </st-info-item>
            <st-info-item label="消费类目">
              <span v-for="(item, index) in info.consumer_type" :key="index">
                {{ item | enumFilter('deposit_card.consumer_type') }}
                <i v-if="index !== info.consumer_type.length - 1">、</i>
              </span>
            </st-info-item>
            <st-info-item label="备注" class="mg-b0">
              {{ info.description }}
            </st-info-item>
          </st-info>
        </a-col>
      </a-row>
    </st-panel>
    <!-- <st-panel initial class="mgt-12"
      :tabs="[
        { label: '消费记录', route: { name: 'shop-sold-card-info-deposit-info-consumption-record', query: {id:infoService.cardId} } },
        { label: '操作日志', route: { name: 'shop-sold-card-info-deposit-info-operation-record', query: {id:infoService.cardId} } },
      ]"
    >
    <router-view></router-view>
  </st-panel> -->
  </section>
</template>
<script>
import { InfoService } from './info.service'
import { RouteService } from '@/services/route.service'
import moment from 'moment'
import SoldCardRefund from '@/views/biz-modals/sold/card/refund'
import SoldCardTransfer from '@/views/biz-modals/sold/card/transfer'
export default {
  name: 'PageShopSoldCardDepositInfo',
  bem: {
    basic: 'page-shop-sold-info'
  },
  modals: {
    SoldCardRefund,
    SoldCardTransfer
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
      loading: this.infoService.loading$,
      auth: this.infoService.auth$
    }
  },
  computed: {
    // 门店范围
    admissionColumns() {
      const list = [
        { title: '省', dataIndex: 'province_name', key: 'province_name' },
        { title: '市', dataIndex: 'city_name', key: 'city_name' },
        { title: '区', dataIndex: 'district_name', key: 'district_name' },
        { title: '门店名称', dataIndex: 'shop_name', key: 'shop_name' }
      ]
      return list
    }
  },
  methods: {
    moment,
    onShowShops() {
      console.log('多店')
    },
    // 跳转合同
    toContract() {
      let record = this.info
      let url = `${window.location.origin}/extra/contract-preview?id=${
        record.order_id
      }`
      window.open(url)
    },
    // 退款
    onRefund() {
      this.$modalRouter.push({
        name: 'sold-card-refund',
        props: {
          type: 'deposit',
          id: this.infoService.cardId
        },
        on: {
          success: () => {
            this.$router.reload()
          }
        }
      })
    },
    // 转让
    onTransfer() {
      this.$modalRouter.push({
        name: 'sold-card-transfer',
        props: {
          id: this.infoService.cardId,
          type: 'deposit'
        },
        on: {
          success: () => {
            this.$router.reload()
          }
        }
      })
    }
  }
}
</script>
