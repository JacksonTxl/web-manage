<template>
  <st-panel
    app
    :tabs="[
      { label: '品牌团体课程库', route: { name: 'brand-product-course-team-list-brand' } },
      { label: '门店团体课程库', route: { name: 'brand-product-course-team-list-shop' } }
    ]">
    <div slot="actions">
      <a-input-search placeholder="私教课名称" v-model="query.courseName" @search="onSearchCourseName"></a-input-search>
    </div>
    <router-view></router-view>
  </st-panel>
</template>
<script>
import { RouteService } from '../../../../../../services/route.service'
export default {
  name: 'TeamCourseList',
  serviceInject() {
    return {
      routeService: RouteService
    }
  },
  subscriptions() {
    return {
      query: this.routeService.query$
    }
  },
  methods: {
    onSearchCourseName(val) {
      this.$router.push({ query: this.query })
    }
  }
}
</script>
