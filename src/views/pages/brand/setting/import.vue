<template>
  <st-page-route-nav
    :class="b()"
    title="数据导入"
    v-model="authTabs"
  ></st-page-route-nav>
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
