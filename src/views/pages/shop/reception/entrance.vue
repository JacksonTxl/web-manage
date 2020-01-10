<template>
  <st-panel app :tabs="tabs">
    <portal-target
      slot="actions"
      name="SHOP_RECEPTION_ENTRANCE_KEYWORDS_SEARCH"
    ></portal-target>
    <router-view></router-view>
  </st-panel>
</template>

<script>
import { EntranceService } from './entrance.service'
export default {
  serviceInject() {
    return {
      service: EntranceService
    }
  },
  rxState() {
    return {
      // authTabs: this.service.authTabs$
    }
  },
  data() {
    return {
      tabs: [
        {
          label: '入场管理',
          route: { name: 'shop-reception-entrance-entrance' }
        },
        {
          label: '入离场记录',
          route: { name: 'shop-reception-entrance-log' }
        }
      ]
    }
  }
}
</script>
