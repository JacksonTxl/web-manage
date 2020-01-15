<template>
  <st-panel app :tabs="authTabs$">
    <router-view></router-view>
  </st-panel>
</template>

<script>
import { SellService } from './sell.service'
export default {
  serviceInject() {
    return {
      sellService: SellService
    }
  },
  rxState() {
    const { authTabs$ } = this.sellService
    return {
      authTabs$
    }
  }
}
</script>
