<template>
  <st-panel app initial :tabs="authTabs">
    <di-view slot="actions" name="SHOP_SOLD_CARD_LIST_ACTIONS"></di-view>
    <router-view></router-view>
  </st-panel>
</template>
<script>
import { ListService } from './list.service'
export default {
  name: 'PageShopSoldCard',
  bem: {
    b: 'page-shop-sold'
  },
  serviceInject() {
    return {
      listService: ListService
    }
  },
  rxState() {
    return {
      authTabs: this.listService.authTabs$
    }
  }
}
</script>
