<template>
  <section :class="basic()">
    <st-panel title="订单详情">
      <div slot="actions">
        <st-button
          class="mgr-8"
          v-if="auth['brand_shop:order:order|refund']"
          @click="onRefund"
          type="primary"
        >
          退款
        </st-button>
        <st-button
          class="mgr-8"
          v-if="auth['brand_shop:order:order|pay']"
          @click="createdOrderPay"
          type="primary"
        >
          收款
        </st-button>
        <st-button
          class="mgr-8"
          v-if="auth['brand_shop:order:order|cancel']"
          @click="onCancel"
          type="primary"
        >
          取消
        </st-button>
        <st-button
          class="mgr-8"
          v-if="auth['brand_shop:order:order|split']"
          @click="onSplit"
          type="primary"
        >
          业务拆分
        </st-button>
      </div>
      <a-row :gutter="24">
        <a-col :span="9">
          <st-info>
            <st-info-item label="订单号">{{ info.id }}</st-info-item>
            <st-info-item label="商品名称">
              {{ info.product_name }}
            </st-info-item>
            <st-info-item label="购买会员">
              {{ info.member_name }} {{ info.member_mobile }}
            </st-info-item>
            <st-info-item label="下单人">{{ info.operator_name }}</st-info-item>
            <st-info-item label="下单时间">
              {{ info.created_time }}
            </st-info-item>
            <st-info-item label="销售">{{ info.staff_name }}</st-info-item>
            <st-info-item label="订单状态">
              {{ info.order_status | enumFilter('finance.order_status') }}
            </st-info-item>
          </st-info>
        </a-col>
        <a-col :span="9">
          <st-info>
            <st-info-item label="赠送">{{ info.gift_amount }}</st-info-item>
            <st-info-item label="订单总额">{{ info.total_price }}</st-info-item>
            <st-info-item label="优惠金额">
              {{ info.order_discount }}
            </st-info-item>
            <st-info-item label="减免金额">
              {{ info.reduce_price }}
            </st-info-item>
            <st-info-item label="应收金额">{{ info.pay_price }}</st-info-item>
            <st-info-item label="支付状态">
              {{ info.pay_status | enumFilter('finance.pay_status') }}
            </st-info-item>
          </st-info>
        </a-col>
        <a-col :span="6">
          <st-info>
            <st-info-item label="备注">{{ info.description }}</st-info-item>
          </st-info>
        </a-col>
      </a-row>
    </st-panel>
    <st-panel initial class="mgt-12" :tabs="tabs">
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
      loading: this.infoService.loading$,
      auth: this.infoService.auth$
    }
  },
  computed: {},
  methods: {
    // 订单收款modal
    createdOrderPay() {
      this.$modalRouter.push({
        name: 'sold-deal-gathering',
        props: {
          order_id: this.infoService.id,
          type: this.productType(this.info.product_type)
        },
        on: {
          success: () => {
            this.$router.push({ force: true, query: this.query })
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
    },
    // 业务拆分
    onSplit() {
      this.$modalRouter.push({
        name: 'shop-finance-split',
        props: {
          id: this.info.id
        },
        on: {
          success: result => {
            console.log('业绩拆分成功!')
            this.$router.push({ force: true, query: this.query })
          }
        }
      })
    },
    // 取消
    onCancel() {
      this.$modalRouter.push({
        name: 'shop-finance-cancel',
        props: {
          id: this.info.id
        },
        on: {
          success: result => {
            console.log('取消订单!')
            this.$router.push({ force: true, query: this.query })
          }
        }
      })
    },
    productType(type) {
      let name = ''
      // 1-会员卡 2-私教课 3-团体课 4-课程包 5-储值卡 6-小班课 7-手续费 8-定金 9-押金 10-储物柜
      switch (type) {
        case 1:
          name = 'member'
          break
        case 2:
          name = 'personal'
          break
        case 3:
          name = 'member'
          break
        case 4:
          name = 'package'
          break
        case 5:
          name = 'deposit'
          break
        case 6:
          name = 'member'
          break
        case 7:
          name = 'advance'
          break
        case 8:
          name = 'advance'
          break
        case 9:
          name = 'member'
          break
        case 10:
          name = 'cabinet_order'
          break
      }
      return name
    }
  }
}
</script>
