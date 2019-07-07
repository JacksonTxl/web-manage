<template>
  <st-panel
  app
  :tabs="[
    { label: '门店上架储值卡', route: { name: 'shop-product-card-deposit-list-shelves' } },
    { label: '全部储值卡项', route: { name: 'shop-product-card-deposit-list-all' } }
  ]">
    <div slot="actions">
      <st-input-search v-model="query.card_name" @search="onSearchCardName" placeholder="请输入储值卡名称搜索" maxlength="50" />
    </div>
    <router-view></router-view>
  </st-panel>
</template>

<script>
import { RouteService } from '@/services/route.service'
export default {
  name: 'PageShopProductDeposit',
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
      this.$events.emit(`${this.$route.name}:onSingleSearch`, 'card_name', this.query.card_name, { keyword: true })
    }
  }
}
</script>
