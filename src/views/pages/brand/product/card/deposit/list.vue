<template>
  <st-panel app :tabs="authTabs">
    <div slot="actions">
      <st-input-search v-model="query.card_name" @search="onSearchCardName" placeholder="请输入储值卡名称搜索" maxlength="50" />
    </div>
    <router-view></router-view>
  </st-panel>
</template>

<script>
import { RouteService } from '@/services/route.service'
import { ListService } from './list.service'
export default {
  name: 'PageBrandProductDeposit',
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
  methods: {
    onSearchCardName() {
      this.$events.emit(`${this.$route.name}:onSingleSearch`, 'card_name', this.query.card_name, { keyword: true })
    }
  }
}
</script>
