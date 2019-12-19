<template>
  <st-panel app :tabs="authTabs">
    <portal-target
      slot="actions"
      name="BRAND_PRODUCT_CARD_MEMBER_KEYWORDS_SEARCH"
    ></portal-target>
    <router-view></router-view>
  </st-panel>
</template>

<script>
import { ListService } from './list.service'
export default {
  name: 'PageShopProductMember',
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
˝
