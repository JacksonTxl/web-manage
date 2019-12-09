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
      <st-icon type="success" class="img" color="#52c41a" />
      <p>{{ message }}</p>
      <st-button v-if="!isBrandStudio" type="primary" @click="print">
        打印合同
      </st-button>
      <st-button @click="viewOrder">查看订单</st-button>
      <st-button @click="printOrder" type="primary">打印小票</st-button>
      <st-button @click="goPay" v-if="needPay">去支付</st-button>
      <st-button @click="changeMember" v-if="isFamilyCard">变更成员</st-button>
    </div>
  </st-modal>
</template>

<script>
import { UserService } from '@/services/user.service'
export default {
  name: 'ModalSoldDealGatheringTip',
  bem: {
    gatheringTip: 'modal-sold-deal-gathering-tip'
  },
  data() {
    return {
      show: false
    }
  },
  serviceInject() {
    return {
      userService: UserService
    }
  },
  rxState() {
    return {
      isBrandStudio: this.userService.isBrandStudio$
    }
  },
  props: {
    order_id: Number, // 订单id
    type: String,
    member_id: Number, // 会员id
    message: String,
    needPay: Boolean, // true 需要支付按钮 false 不需要
    isFamilyCard: Boolean // true 需要展示变更成员按钮 false 不需要
  },
  methods: {
    print() {
      this.show = false
      this.$emit('success', {
        orderId: this.order_id,
        type: 'Print'
      })
    },
    printOrder() {
      this.show = false
      this.$emit('success', {
        orderId: this.order_id,
        type: 'PrintOrder'
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
    },
    // 变更成员
    changeMember() {
      this.show = false
      this.$emit('success', {
        orderId: this.order_id,
        type: 'ChangeMember'
      })
    }
  }
}
</script>
