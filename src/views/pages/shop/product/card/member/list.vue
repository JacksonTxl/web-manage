<template>
  <st-panel app :tabs="authTabs">
    <di-view slot="actions" :name="SHOP_PRODUCT_CARD_MEMBER_KEYWORDS_SEARCH" />
    <router-view></router-view>
  </st-panel>
</template>

<script>
import { RouteService } from '@/services/route.service'
import { ListService } from './list.service'
import { SHOP_PRODUCT_CARD_MEMBER_KEYWORDS_SEARCH } from '@/constants/events'
export default {
  name: 'PageShopProductMember',
  serviceInject() {
    return {
      routeService: RouteService,
      listService: ListService
    }
  },
  rxState() {
    return {
      query: this.routeService.query$,
      authTabs: this.listService.authTabs$
    }
  },
  data() {
    return {
      SHOP_PRODUCT_CARD_MEMBER_KEYWORDS_SEARCH
    }
  }
}
</script>
