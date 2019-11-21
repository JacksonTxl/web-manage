<template>
  <course-card :isEdit="true" :info="info.info"></course-card>
</template>

<script>
import CourseCard from './add-course'
import { EditCourseService } from './edit-course.service'
export default {
  serviceInject() {
    return {
      editCourseService: EditCourseService
    }
  },
  rxState() {
    return {
      info: this.editCourseService.info$
    }
  },
  components: {
    CourseCard
  }
}
</script>
