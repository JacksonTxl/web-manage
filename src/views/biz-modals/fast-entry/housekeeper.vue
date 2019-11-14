<template>
  <st-modal
    title="三体云管家"
    class="modal-fast-entry-housekeeper"
    v-model="show"
    :footer="null"
    width="504px"
  >
    <div>
      <div :class="b('wrapper')">
        <div :class="b('code_pic')">
          <vue-qrcode
            :class="b('qr-code')"
            :value="value"
            :scale="1"
            :options="{
              margin: 0,
              scale: 1,
              width: 160,
              color: { dark: '#252a2e' }
            }"
          ></vue-qrcode>
          <img
            :class="b('app-logo')"
            src="~@/assets/img/app-logo.png"
            alt="三体云动app二维码"
          />
        </div>

        <p class="mg-t24">扫描二维码，下载三体云管家App</p>
      </div>
    </div>
  </st-modal>
</template>
<script>
import VueQrcode from '@chenfengyuan/vue-qrcode'
export default {
  name: 'FastEntryHousekeeper',
  bem: {
    b: 'modal-fast-entry-housekeeper'
  },
  data() {
    return {
      show: false
    }
  },
  computed: {
    value() {
      let origin = window.location.origin
      if (window.location.origin.includes('localhost')) {
        origin = 'https://saas.dev.styd.cn'
      }
      return `${origin}/other/mina/download`
    }
  },
  components: {
    VueQrcode
  },
  methods: {
    cancel() {
      this.show = false
    }
  }
}
</script>
