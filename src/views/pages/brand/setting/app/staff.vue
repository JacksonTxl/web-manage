<template>
  <st-panel :tabs="authTabs">
    <router-view></router-view>
  </st-panel>
</template>
<script>
import { StaffService } from './staff.service'
export default {
  serviceInject() {
    return {
      staffService: StaffService
    }
  },
  rxState() {
    return {
      authTabs: this.staffService.authTabs$
    }
  }
}
</script>
