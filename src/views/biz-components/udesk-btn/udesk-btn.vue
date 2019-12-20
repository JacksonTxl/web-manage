<template>
  <div :class="b()" @click="onClickUdeskBtn">
    <a-spin v-if="loading" size="small" :spinning="true" />
    <img
      v-else
      src="@/assets/img/biz-components/im_icon@2x.png"
      alt="udesk"
      :class="b('icon')"
    />
  </div>
</template>
<script>
import { UdeskService } from '@/services/udesk.service'
export default {
  name: 'StUdeskBtn',
  bem: {
    b: 'st-udesk-btn'
  },
  serviceInject() {
    return {
      udeskService: UdeskService
    }
  },
  rxState() {
    return {
      loading: this.udeskService.loading$
    }
  },
  methods: {
    onClickUdeskBtn() {
      this.udeskService.show()
    }
  }
}
</script>
