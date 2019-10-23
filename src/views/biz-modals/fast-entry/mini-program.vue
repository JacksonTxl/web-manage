<template>
  <st-modal
    title="微信支付配置"
    class="modal-fast-entry-program"
    v-model="show"
    footer=""
    width="320px"
  >
    <div>
      <div :class="b('wrapper')">
        <img :class="b('code-img')" :src="pic" alt="扫描二维码" />
        <p :class="b('tips')" class="mg-t16">
          请使用微信扫描二维码
          <br />
          进入微信小程序
        </p>
      </div>
    </div>
  </st-modal>
</template>
<script>
import { MessageService } from '@/services/message.service'
import codeImg from '@/assets/img/fast-entry/code.png'
export default {
  name: 'FastEntryProgram',
  bem: {
    b: 'modal-fast-entry-program'
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
      show: false,
      pic: codeImg
    }
  },
  created() {},
  methods: {
    cancel() {
      this.show = false
    }
  }
}
</script>
