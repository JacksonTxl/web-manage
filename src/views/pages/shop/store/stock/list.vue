<template>
  <st-panel app :tabs="authTabs">
    <di-view slot="actions" :name="SHOP_STORED_STOCK_KEYWORDS_SEARCH" />
    <router-view></router-view>
  </st-panel>
</template>

<script>
import { SHOP_STORED_STOCK_KEYWORDS_SEARCH } from '@/constants/events'
import { ListService } from './list.service'
export default {
  serviceInject() {
    return {
      listService: ListService
    }
  },
  rxState() {
    return {
      authTabs: this.listService.authTabs$
    }
  },
  mounted() {},
  data() {
    return { SHOP_STORED_STOCK_KEYWORDS_SEARCH }
  }
}
</script>
˝
