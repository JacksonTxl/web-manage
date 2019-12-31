<template>
  <section class="pd-24">
    <st-panel>
      <a-row :gutter="24">
        <a-col :span="9">
          <st-info>
            <st-info-item label="配送方式">
              {{ info.shipping_mode_name }}
            </st-info-item>
            <st-info-item label="快递单号" v-if="info.shipping_sn != ''">
              {{ info.shipping_sn }}
            </st-info-item>
          </st-info>
        </a-col>
        <a-col :span="9">
          <st-info>
            <st-info-item label="快递公司" v-if="info.company_name != ''">
              {{ info.company_name }}
            </st-info-item>
            <st-info-item label="发货状态">
              {{ info.product_status_name }}
            </st-info-item>
          </st-info>
        </a-col>
      </a-row>
    </st-panel>
  </section>
</template>
<script>
import { DeliveryModeService } from './delivery-mode.service'
export default {
  name: 'PageShopFinanceOrderInfoDeliveryMode',
  serviceInject() {
    return {
      deliveryModeService: DeliveryModeService
    }
  },
  rxState() {
    return {
      info: this.deliveryModeService.info$
    }
  },
  mounted() {
    console.log(this.info.shipping_sn.length)
  },

  data() {
    return {}
  },
  methods: {}
}
</script>
