<template>
  <st-panel app :tabs="authTabs">
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
  rxState() {
    return {
      authTabs: this.statService.authTabs$
    }
  },
  data() {
    return {}
  },
  computed: {},
  methods: {},
  components: {}
}
</script>
