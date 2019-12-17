<template>
  <st-panel app :tabs="authTabs">
    <portal-target
      slot="actions"
      name="SHOP_PRODUCT_CARD_DEPOSIT_KEYWORDS_SEARCH"
    ></portal-target>
    <router-view></router-view>
  </st-panel>
</template>

<script>
import { ListService } from './list.service'
export default {
  name: 'PageShopProductDeposit',
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
