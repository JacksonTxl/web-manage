<template>
  <st-panel :tabs="authTabs">
    <router-view></router-view>
  </st-panel>
</template>

<script>
import { CourseService } from './course.service'
export default {
  serviceInject() {
    return {
      courseService: CourseService
    }
  },
  rxState() {
    return {
      authTabs: this.courseService.authTabs$
    }
  }
}
</script>
