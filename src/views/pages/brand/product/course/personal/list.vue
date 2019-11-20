<template>
  <st-panel app :tabs="authTabs">
    <div slot="actions">
      <st-input-search
        v-model="$searchQuery.course_name"
        @search="onSearchCourseName"
        placeholder="私教课名称"
      ></st-input-search>
    </div>
    <router-view></router-view>
  </st-panel>
</template>
<script>
import { ListService } from './list.service'
export default {
  name: 'PersonalCourseList',
  serviceInject() {
    return {
      listService: ListService
    }
  },
  rxState() {
    return {
      authTabs: this.listService.authTabs$
    }
  },
  methods: {
    onSearchCourseName(val) {
      this.$router.push({
        query: { course_name: this.$searchQuery.course_name }
      })
    }
  }
}
</script>
