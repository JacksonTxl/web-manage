<template>
  <st-modal
    title="微信支付配置"
    class="modal-account-agreement"
    v-model="show"
    footer=""
  >
    <div>
      <ul :class="b('list')">
        小程序
      </ul>
    </div>
  </st-modal>
</template>
<script>
import { MessageService } from '@/services/message.service'
export default {
  name: 'AccountAgreement',
  bem: {
    b: 'modal-account-agreement'
  },
  serviceInject() {
    return {
      messageService: MessageService
    }
  },
  rxState() {
    return {}
  },
  data() {
    return {
      show: false
    }
  },
  created() {},
  methods: {
    cancel() {
      this.show = false
    },
    onClickCloseAgreement() {
      this.show = false
    }
  }
}
</script>
