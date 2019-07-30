<template>
  <div :class="b()" >
    <st-panel
        :tabs="authTabs"
    >
      <router-view></router-view>
    </st-panel>
  </div>
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
    return {

    }
  },
  computed: {

  },
  methods: {

  },
  components: {
  }
}
</script>
