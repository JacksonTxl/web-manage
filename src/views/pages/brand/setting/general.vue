<template>
  <div>
    <st-page-route-nav title="通用设置" v-model="authTabs"></st-page-route-nav>
  </div>
</template>
<script>
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
      authTabs: this.generalService.authTabs$
    }
  }
}
</script>
