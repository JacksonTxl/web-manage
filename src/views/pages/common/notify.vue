<template>
  <st-panel :class="bPage()" app initial :tabs="authTabs">
    <di-view name="INFORM" slot="prepend"></di-view>
    <router-view></router-view>
  </st-panel>
</template>
<script>
// import { NotifyService } from './notify.service'
// import tableMixin from '@/mixins/table.mixin'

export default {
  name: 'CommonNotify',
  // mixins: [tableMixin],
  bem: {
    bPage: 'page-common-notify'
  },
  data() {
    return {
      authTabs: [
        { label: '通知列表', route: { name: 'common-notify-inform' } },
        { label: '公告列表', route: { name: 'common-notify-notice' } }
      ]
    }
  },
  serviceInject() {
    return {
      // service: NotifyService
    }
  },
  rxState() {
    return {
      // authTabs: this.service.authTabs$
    }
  }
}
</script>
