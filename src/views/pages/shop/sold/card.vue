<template>
  <st-panel
    app
    initial
    :tabs="[
      { label: '会员卡', route: { name: 'shop-sold-card-member' } },
      { label: '储值卡', route: { name: 'shop-sold-card-deposite' } }
    ]"
  >
    <div slot="actions">
      <st-input-search v-model="query.search" @search="onSearchCourseName" placeholder="请输入卡名、会员姓名或手机号查找" style="width: 290px;"/>
    </div>
    <router-view></router-view>
  </st-panel>
</template>
<script>
import { RouteService } from '@/services/route.service'
export default {
  name: 'PageShopSoldCard',
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
    onSearchCourseName(val) {
      this.$router.push({ query: { ...this.query, search: this.query.search } })
    }
  }
}
</script>
