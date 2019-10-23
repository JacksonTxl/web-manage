<template>
  <st-modal title="三体云管家" class="modal-account-agreement" v-model="show">
    <div>
      <ul :class="b('list')">
        云管家
      </ul>
    </div>
    <footer slot="footer">
      <st-button type="primary" @click="onClickCloseAgreement">确定</st-button>
    </footer>
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
