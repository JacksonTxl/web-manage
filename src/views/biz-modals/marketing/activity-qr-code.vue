<template>
  <st-modal title="分享海报" :footer="null" width="500px" v-model="show">
    <div :class="bModal()">
      <p>
        复制或下载二维码，推广至微信朋友圈、微博等，或打印活动海报，张贴至门店，吸引顾客参与活动。
      </p>
      <div>{{ info }}</div>
      <st-button icon="download" type="primary" pill>
        下载海报
      </st-button>
    </div>
  </st-modal>
</template>
<script>
import { SharePosterService } from './share-poster.service'
export default {
  name: 'ModalQrCode',
  bem: {
    bModal: 'modal-marketing-qr-code'
  },
  props: {
    activity_id: Number
  },
  serviceInject() {
    return {
      service: SharePosterService
    }
  },
  rxState() {
    return {
      info: this.service.info$
    }
  },
  data() {
    return {
      show: false
    }
  },
  created() {
    this.service.getQrCode(this.activity_id).subscribe()
  }
}
</script>
