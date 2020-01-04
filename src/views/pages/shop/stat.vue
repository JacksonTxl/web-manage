<template>
  <router-view></router-view>
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
