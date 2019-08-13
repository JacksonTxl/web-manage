<template>
  <st-panel app :tabs="authTabs">
    <div slot="actions">
      <st-input-search
        v-model="query.course_name"
        @search="onSearchCourseName"
        placeholder="私教课名称"
      ></st-input-search>
    </div>
    <router-view></router-view>
  </st-panel>
</template>
<script>
import { RouteService } from '@/services/route.service'
import { ListService } from './list.service'
export default {
  name: 'PersonalCourseList',
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
      this.$router.push({ query: { course_name: this.query.course_name } })
    }
  }
}
</script>
