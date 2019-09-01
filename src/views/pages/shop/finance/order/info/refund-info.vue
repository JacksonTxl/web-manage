<template>
  <section class="pd-24">
    <st-panel>
      <a-row :gutter="24">
        <a-col :span="9">
          <st-info>
            <st-info-item label="退款ID">{{ info.order_id }}</st-info-item>
            <st-info-item label="操作人">{{ info.operator_name }}</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="9">
          <st-info>
            <st-info-item label="退款时间">
              {{ info.created_time }}
            </st-info-item>
            <st-info-item label="退款原因">
              {{ info.refund.refund_reason }}
            </st-info-item>
            <st-info-item label="退款方式">
              {{ info.refund.pay_channel }}
            </st-info-item>
          </st-info>
        </a-col>
        <a-col :span="6">
          <st-info>
            <st-info-item label="退款金额">
              {{ info.refund.refund_price }}
            </st-info-item>
            <st-info-item label="备注">{{ info.description }}</st-info-item>
          </st-info>
        </a-col>
      </a-row>
    </st-panel>
  </section>
</template>
<script>
import { RefundInfoService } from './refund-info.service'
export default {
  name: 'PageShopFinanceOrderInfoRefundInfo',
  bem: {
    basic: 'page-shop-finance'
  },
  serviceInject() {
    return {
      refundInfoService: RefundInfoService
    }
  },
  rxState() {
    return {
      info: this.refundInfoService.info$
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>
