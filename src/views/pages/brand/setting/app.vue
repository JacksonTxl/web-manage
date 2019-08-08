<template>
  <st-page-route-nav title="应用设置" v-model="authTabs"></st-page-route-nav>
</template>
<script>
import { AppService } from './app.service'
export default {
  bem: {
    b: 'page-setting'
  },
  serviceInject() {
    return {
      appService: AppService
    }
  },
  rxState() {
    return {
      authTabs: this.appService.authTabs$
    }
  }
}
</script>
