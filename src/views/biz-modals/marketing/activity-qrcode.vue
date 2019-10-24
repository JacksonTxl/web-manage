<template>
  <st-modal title="分享海报" :footer="null" width="500px" v-model="show">
    <p>
      将小程序码贴在宣传刊物、店内等任何地方，用户用手机扫一扫后，即可参与活动、转化下单。
    </p>
    <div></div>
    <st-button icon="download" type="primary" pill>下载小程序</st-button>
  </st-modal>
</template>
<script>
export default {
  name: 'ModalQrcode',
  bem: {
    bModal: 'modal-marketing-add-ticket'
  },
  data() {
    return {
      show: false
    }
  }
}
</script>
