<template>
  <st-panel app initial :tabs="authTabs">
    <div slot="actions">
      <st-input-search
        v-model="query.search"
        @search="onSearchCardName"
        placeholder="请输入会员姓名或手机号查找"
        :class="b('search')"
      />
    </div>
    <router-view></router-view>
  </st-panel>
</template>
<script>
import { RouteService } from '@/services/route.service'
import { GatheringService } from './gathering.service'
export default {
  name: 'PageShopSoldCard',
  bem: {
    b: 'page-shop-sold'
  },
  serviceInject() {
    return {
      routeService: RouteService,
      gatheringService: GatheringService
    }
  },
  rxState() {
    return {
      query: this.routeService.query$,
      authTabs: this.gatheringService.authTabs$
    }
  },
  methods: {
    onSearchCardName() {
      this.$router.push({ query: { ...this.query, search: this.query.search } })
    }
  }
}
</script>
