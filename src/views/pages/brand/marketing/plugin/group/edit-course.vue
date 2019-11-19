<template>
  <course-card :isEdit="true" :info="info.info"></course-card>
</template>

<script>
import CourseCard from './add-course'
import { EditStoredService } from './edit-stored.service'
export default {
  serviceInject() {
    return {
      editStoredService: EditStoredService
    }
  },
  rxState() {
    return {
      info: this.editStoredService.info$
    }
  },
  mounted() {
    this.editStoredService
      .init(this.$route.query.id ? this.$route.query.id : '')
      .subscribe(res => {})
  },
  components: {
    CourseCard
  }
}
</script>
