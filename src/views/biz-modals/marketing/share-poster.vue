<template>
  <st-modal title="分享海报" :footer="null" width="500px" v-model="show">
    <p>
      复制或下载二维码，推广至微信朋友圈、微博等，或打印活动海报，张贴至门店，吸引顾客参与活动。
    </p>
    <div></div>
    <st-button icon="download" type="primary" pill>下载海报</st-button>
  </st-modal>
</template>
<script>
export default {
  name: 'ModalSharePoster',
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
