<template>
  <div>
    <page-route-nav title="通用设置" v-model="authTab.tabs"></page-route-nav>
  </div>
</template>
<script>
import PageRouteNav from '@/views/components/page-route-nav#/nav'
import { GeneralService } from './general.service'
export default {
  bem: {
    b: 'page-setting'
  },
  serviceInject() {
    return {
      generalService: GeneralService
    }
  },
  rxState() {
    return {
      authTab: this.generalService.authTab$
    }
  },
  components: {
    PageRouteNav
  }
}
</script>
