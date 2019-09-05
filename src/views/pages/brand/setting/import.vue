<template>
  <div :class="b()">
    <st-page-route-nav title="数据导入" v-model="authTabs"></st-page-route-nav>
  </div>
</template>
<script>
import { ImportService } from './import.service'
export default {
  bem: {
    b: 'page-setting-import'
  },
  serviceInject() {
    return {
      importService: ImportService
    }
  },
  rxState() {
    return {
      authTabs: this.importService.authTabs$
    }
  }
}
</script>
