<template>
  <st-panel :class="bPage()" app initial isBadge :tabs="authTabs">
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
  data() {
    return {
      authTabs: [
        {
          label: '通知列表',
          route: { name: 'common-notify-inform' },
          isBadge: this.info$['1']
        },
        {
          label: '公告列表',
          route: { name: 'common-notify-notice' },
          isBadge: this.info$['2']
        }
      ]
    }
  },
  serviceInject() {
    return {
      service: NotifyService
    }
  },
  rxState() {
    const { info$ } = this.service
    return {
      // authTabs: this.service.authTabs$
      info$
    }
  }
}
</script>
