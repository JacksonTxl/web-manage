<template>
  <div>111</div>
</template>
<script>
import { ListService } from './list.service'
import { columns } from './list.config'
export default {
  name: 'GroupCourseList',
  serviceInject() {
    return {
      listService: ListService
    }
  },
  components: {},
  computed: {
    columns
  },
  rxState() {
    return {
      list: this.listService.list$,
      page: this.listService.page$,
      auth: this.listService.auth$
    }
  },
  data() {
    return {
      course_name: ''
    }
  },
  methods: {
    onClickAddCourse() {
      this.$router.push({ name: 'shop-product-course-manage-team-add' })
    },
    onSearchCourseName(val) {
      this.$router.push({ query: { course_name: this.course_name } })
    },
    onChange() {
      this.$router.push({ query: this.$searchQuery })
    },
    deleteCourse(course) {
      this.listService.deleteCourse(course.id).subscribe(() => {
        this.$router.reload()
      })
    }
  }
  // mounted() {
  //   this.$searchQuery.category_id = -1
  // }
}
</script>
