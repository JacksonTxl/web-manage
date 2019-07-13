<template>
  <st-modal
    title=""
    size="small"
    v-model="show"
    :footer="null"
    @cancel="onCancel"
    wrapClassName="modal-sold-deal-gathering-tip"
    >
    <div :class="gatheringTip('content')">
      <st-icon type="success" class="img"/>
      <p >{{message}}</p>
      <st-button type="primary" @click="print" >打印合同</st-button>
      <st-button @click="viewOrder" >查看订单</st-button>
      <st-button @click="goPay" v-if="needPay">去支付</st-button>
    </div>
  </st-modal>
</template>

<script>
export default {
  name: 'ModalSoldDealGatheringTip',
  bem: {
    gatheringTip: 'modal-sold-deal-gathering-tip'
  },
  serviceInject() {
    return {
    }
  },
  rxState() {
    return {
    }
  },
  data() {
    return {
      show: false
    }
  },
  props: {
    order_id: Number, // 订单id
    type: String,
    member_id: Number, // 会员id
    message: String,
    needPay: Boolean // true 需要支付按钮 false 不需要
  },
  created() {
  },
  methods: {
    print() {
      this.show = false
      this.$emit('success', {
        orderId: this.order_id,
        type: 'Print'
      })
    },
    viewOrder() {
      this.show = false
      this.$emit('success', {
        orderId: this.order_id,
        type: 'ViewOrder'
      })
    },
    goPay(e) {
      this.show = false
      this.$emit('success', {
        orderId: this.order_id,
        type: 'Pay'
      })
    },
    // 取消
    onCancel() {
      this.show = false
      this.$emit('success', {
        orderId: this.order_id,
        type: 'cancel'
      })
    }
  }
}
</script>
