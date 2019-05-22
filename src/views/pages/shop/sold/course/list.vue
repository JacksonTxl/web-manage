<template>
  <st-panel
    app
    initial
    :tabs="[
      { label: '私教', route: { name: 'shop-sold-course-list-personal' } },
      { label: '课程包', route: { name: 'shop-sold-course-list-package' } },
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
  name: 'PageShopSoldCourse',
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
