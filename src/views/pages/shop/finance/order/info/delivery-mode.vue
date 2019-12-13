<template>
  <section class="pd-24">
    <st-panel>
      <a-row :gutter="24">
        <a-col :span="9">
          <st-info>
            <st-info-item label="退款ID">32597</st-info-item>
            <st-info-item label="快递单号">
              100002000300
            </st-info-item>
          </st-info>
        </a-col>
        <a-col :span="9">
          <st-info>
            <st-info-item label="快递公司">顺丰</st-info-item>
            <st-info-item label="发货状态">
              待发货/待收货/已收货
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
    console.log(this.info)
  },

  data() {
    return {}
  },
  methods: {}
}
</script>
