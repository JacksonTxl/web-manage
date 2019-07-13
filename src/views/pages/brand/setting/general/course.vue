<template>
  <st-panel
    :tabs="authTab.tabs"
  >
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
      authTab: this.courseService.authTab$
    }
  }
}
</script>
