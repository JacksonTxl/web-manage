<template>
  <a-badge class="layout-default-body__notify" :count="count$">
    <span @click="onClickNotify" class="font-number">
      <st-icon type="notify" size="22px" color="#9BACB9"></st-icon>
    </span>
  </a-badge>
</template>

<script>
import { WsService } from '@/services/ws.service'
export default {
  name: 'NotifyCenter',
  methods: {
    onClickNotify() {
      this.$router.push({ name: 'common-notify' })
    }
  },
  serviceInject() {
    return {
      wsService: WsService
    }
  },
  rxState() {
    const { count$ } = this.wsService
    return {
      count$
    }
  },
  created() {
    this.wsService.init()
  }
}
</script>
