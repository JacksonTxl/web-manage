<template>
  <st-panel :class="b()" app :tabs="authTabs">
    <router-view></router-view>
  </st-panel>
</template>

<script>
import { StatService } from './stat.service'
export default {
  name: 'BrandStatInfo',
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
  bem: {
    b: 'page-brand-stat'
  },
  data() {
    return {}
  },
  computed: {},
  methods: {},
  components: {}
}
</script>
