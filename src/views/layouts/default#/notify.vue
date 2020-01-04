<template>
  <a-badge
    class="layout-default-body__notify cursor-pointer"
    :count="notReadNum$"
  >
    <span @click="onClickNotify" class="font-number">
      <st-icon type="notify" size="22px" color="#9BACB9"></st-icon>
    </span>
  </a-badge>
</template>

<script>
import { WsNotifyService } from './ws-notify.service'
export default {
  name: 'NotifyCenter',
  methods: {
    onClickNotify() {
      this.$router.push({ name: 'common-notify' })
    }
  },
  serviceInject() {
    return {
      service: WsNotifyService
    }
  },
  rxState() {
    const { notReadNum$ } = this.service
    return {
      notReadNum$
    }
  },
  created() {
    this.service.initWs()
    this.service.init().subscribe()
  }
}
</script>
