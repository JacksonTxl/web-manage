<template>
  <section class="pd-24">
    <st-panel>
      <a-row :gutter="24" v-if="info.refund.list.length === 0">
        <a-col :span="9">
          <st-info>
            <st-info-item label="退款ID">{{ info.order_id }}</st-info-item>
            <st-info-item label="操作人">{{ info.operator_name }}</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="9">
          <st-info>
            <st-info-item label="退款时间">
              {{ info.refund.refund_time }}
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
            <st-info-item label="备注">
              {{ info.refund.description }}
            </st-info-item>
          </st-info>
        </a-col>
      </a-row>
      <st-table
        v-else
        :dataSource="info.refund.list"
        :columns="columns"
        :page="false"
        rowKey="id"
      ></st-table>
    </st-panel>
  </section>
</template>
<script>
import { refundColumns } from './commodity-info.config'
import { RefundInfoService } from './refund-info.service'
export default {
  name: 'PageShopFinanceOrderInfoRefundInfo',
  serviceInject() {
    return {
      refundInfoService: RefundInfoService
    }
  },
  rxState() {
    return {
      info: this.refundInfoService.info$,
      loading: this.refundInfoService.loading$
    }
  },
  data() {
    return {
      columns: refundColumns
    }
  },
  mounted() {
    console.log(this.loading)
  },
  methods: {}
}
</script>
