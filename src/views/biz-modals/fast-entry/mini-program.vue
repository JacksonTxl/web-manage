<template>
  <st-modal
    title="微信支付配置"
    class="modal-fast-entry-mini-program"
    v-model="show"
    :footer="null"
    width="320px"
  >
    <div>
      <div :class="b('wrapper')">
        <st-image
          :class="b('code-img')"
          width="180px"
          height="180px"
          :src="urlData.pic"
          alt="扫描二维码"
        />
        <p class="mg-t16">
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
export default {
  name: 'FastEntryProgram',
  bem: {
    b: 'modal-fast-entry-mini-program'
  },
  serviceInject() {
    return {
      messageService: MessageService
    }
  },
  props: {
    urlData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    cancel() {
      this.show = false
    }
  }
}
</script>
