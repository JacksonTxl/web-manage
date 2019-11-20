<template>
  <st-panel app :tabs="authTabs">
    <div slot="actions">
      <st-input-search
        placeholder="输入团体课名称"
        v-model="$searchQuery.course_name"
        @search="onKeywordsSearch('course_name', $event)"
      ></st-input-search>
    </div>
    <router-view></router-view>
  </st-panel>
</template>
<script>
import { ListService } from './list.service'
import tableMixin from '@/mixins/table.mixin'
export default {
  name: 'TeamCourseList',
  mixins: [tableMixin],
  serviceInject() {
    return {
      listService: ListService
    }
  },
  rxState() {
    return {
      authTabs: this.listService.authTabs$
    }
  }
}
</script>
