<template>
  <st-panel
    :class="bPage()"
    @change="onChange"
    app
    initial
    isBadge
    :tabs="authTabs$"
  >
    <router-view></router-view>
  </st-panel>
</template>
<script>
import { NotifyService } from './notify.service'
export default {
  name: 'CommonNotify',
  bem: {
    bPage: 'page-common-notify'
  },
  serviceInject() {
    return {
      service: NotifyService
    }
  },
  rxState() {
    const { info$, authTabs$ } = this.service
    return {
      // authTabs: this.service.authTabs$
      authTabs$,
      info$
    }
  },
  methods: {
    onChange() {
      this.service.getNoticePcUnread.subscribe()
    }
  }
}
</script>
