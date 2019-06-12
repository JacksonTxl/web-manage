<template>
  <st-modal
    title=""
    size="small"
    v-model="show"
    :footer="null"
    wrapClassName="modal-sold-deal-gathering-tip"
    >
    <div :class="gatheringTip('content')">
      <st-icon type="heating" class="img"/>
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

    },
    viewOrder() {

    },
    goPay(e) {
      // 去订单收款页面
      this.show = false
      this.$modalRouter.push({
        name: 'sold-deal-gathering',
        props: {
          order_id: this.order_id,
          type: this.type,
          member_id: this.member_id
        }
      })
    }
  }
}
</script>
