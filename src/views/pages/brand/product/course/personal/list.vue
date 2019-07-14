<template>
  <st-panel
    app
    :tabs="[
      { label: '品牌私教课程库', route: { name: 'brand-product-course-personal-list-brand' } },
      { label: '门店私教课程库', route: { name: 'brand-product-course-personal-list-shop' } }
    ]">
    <div slot="actions">
      <st-input-search v-model="query.course_name" @search="onSearchCourseName" placeholder="私教课名称"></st-input-search>
    </div>
    <router-view></router-view>
  </st-panel>
</template>
<script>
import { RouteService } from '@/services/route.service'
export default {
  name: 'PersonalCourseList',
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
      this.$router.push({ query: { course_name: this.query.course_name } })
    }
  }
}
</script>
