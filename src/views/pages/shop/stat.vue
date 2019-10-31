<template>
  <st-panel app>
    <router-view></router-view>
  </st-panel>
</template>
<script>
import { StatService } from './stat.service'
export default {
  name: 'ShopStat',
  serviceInject() {
    return {
      statService: StatService
    }
  },
  data() {
    return {}
  }
}
</script>
