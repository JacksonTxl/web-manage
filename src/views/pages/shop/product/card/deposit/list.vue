<template>
  <st-panel app :tabs="authTabs">
    <di-view slot="actions" :name="SHOP_PRODUCT_CARD_DEPOSIT_KEYWORDS_SEARCH" />
    <router-view></router-view>
  </st-panel>
</template>

<script>
import { ListService } from './list.service'
import { SHOP_PRODUCT_CARD_DEPOSIT_KEYWORDS_SEARCH } from '@/constants/events'
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
  },
  data() {
    return {
      SHOP_PRODUCT_CARD_DEPOSIT_KEYWORDS_SEARCH
    }
  }
}
</script>
