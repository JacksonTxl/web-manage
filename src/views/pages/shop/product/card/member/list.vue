<template>
  <st-panel
  app
  :tabs="[
    { label: '门店上架卡项', route: { name: 'shop-product-card-member-list-shelves' } },
    { label: '全部会员卡项', route: { name: 'shop-product-card-member-list-all' } }
  ]">
    <div slot="actions">
      <a-input-search v-model="query.card_name" @search="onSearchCardName" placeholder="请输入会员卡名称查找" maxlength="50" />
    </div>
    <router-view></router-view>
  </st-panel>
</template>

<script>
import { RouteService } from '@/services/route.service'
export default {
  name: 'PageShopProductMember',
  serviceInject() {
    return {
      routeService: RouteService
    }
  },
  rxState() {
    return {
      query: this.routeService.query$
    }
  },
  methods: {
    onSearchCardName() {
      this.$router.push({ query: { ...this.query, card_name: this.query.card_name } })
    }
  }
}
</script>
