<template>
  <st-panel
  app
  :tabs="[
    { label: '全部储值卡项', route: { name: 'brand-product-card-deposite-list-all' } },
    { label: '门店上架储值卡', route: { name: 'brand-product-card-deposite-list-shelves' } },
  ]">
    <div slot="actions">
      <a-input-search v-model="query.card_name" @search="onSearchCardName" placeholder="请输入储值卡名称搜索" maxlength="50" />
    </div>
    <router-view></router-view>
  </st-panel>
</template>

<script>
import { RouteService } from '@/services/route.service'
export default {
  name: 'PageBrandProductDeposite',
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
