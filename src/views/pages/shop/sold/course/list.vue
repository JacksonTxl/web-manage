<template>
  <st-panel app initial :tabs="authTabs">
    <div slot="actions">
      <st-input-search
        v-model="query.search"
        @search="onSearchCourseName"
        placeholder="请输入卡名、会员姓名或手机号查找"
        style="width: 290px;"
      />
    </div>
    <router-view></router-view>
  </st-panel>
</template>
<script>
import { RouteService } from '@/services/route.service'
import { ListService } from './list.service'
export default {
  name: 'PageShopSoldCourse',
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
    onSearchCourseName(val) {
      this.$router.push({ query: { ...this.query, search: this.query.search } })
    }
  }
}
</script>
