<template>
  <a-badge class="layout-default-body__notify cur-p" :count="notReadNum$">
    <span @click="onClickNotify" class="font-number">
      <st-icon type="notify" size="22px" color="#9BACB9"></st-icon>
    </span>
  </a-badge>
</template>

<script>
import { NotifyService } from './notify.service'
export default {
  name: 'NotifyCenter',
  methods: {
    onClickNotify() {
      this.$router.push({ name: 'common-notify' })
    }
  },
  serviceInject() {
    return {
      service: NotifyService
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
