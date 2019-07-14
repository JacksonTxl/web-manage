<template>
  <page-route-nav title="应用设置" v-model="authTabs"></page-route-nav>
</template>
<script>
import PageRouteNav from '@/views/components/page-route-nav#/nav'
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
  },
  components: {
    PageRouteNav
  }
}
</script>
