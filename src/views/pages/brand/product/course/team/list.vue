<template>
  <st-panel app :tabs="authTabs">
    <div slot="actions">
      <st-input-search
        placeholder="输入团体课名称"
        v-model="query.course_name"
        @search="onSearchCourseName"
      ></st-input-search>
    </div>
    <router-view></router-view>
  </st-panel>
</template>
<script>
import { RouteService } from '@/services/route.service'
import { ListService } from './list.service'
export default {
  name: 'TeamCourseList',
  serviceProviders() {
    return [ListService]
  },
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
      this.$router.push({ query: this.query })
    }
  }
}
</script>
