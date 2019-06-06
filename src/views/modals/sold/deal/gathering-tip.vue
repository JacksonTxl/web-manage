<template>
  <st-modal
  title=""
  size="small"
  v-model="show"
  :footer="null"
  wrapClassName="modal-sold-deal-gathering-tip"
  @ok="onOk">
    <div :class="gatheringTip('content')">
      <st-icon type="heating" class="img"/>
      <p >{{message}}</p>
      <st-button type="primary" @click="onSubmit" >打印合同</st-button>
      <st-button @click="onSubmit" >查看订单</st-button>
      <st-button @click="onSubmit" v-if="orderTipType === 2">去支付</st-button>
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
    orderTipType: Number, // 1 是订单收款成功 2 是订单创建成功
    message: String
  },
  created() {
  },
  methods: {
    onOk() {
      this.$emit('ok')
      this.show = false
    },
    onSubmit(e) {

    }
  }
}
</script>
