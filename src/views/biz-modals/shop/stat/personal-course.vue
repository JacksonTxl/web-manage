<template>
  <st-modal
    wrapClassName="modal-stat-personal-course"
    title="上课节数(私)"
    :footer="null"
    v-model="show"
  >
    <st-container>
      <st-table
        :columns="columns"
        :rowKey="record => record.id"
        :page="false"
        :dataSource="consumeList"
      ></st-table>
    </st-container>
  </st-modal>
</template>
<script>
import { columns } from './personal-course.config'
import { PersonalCourseService } from './personal-course.service'
export default {
  name: 'PersonalConsume',
  serviceInject() {
    return {
      personalCourseService: PersonalCourseService
    }
  },
  rxState() {
    return {
      courseList: this.personalCourseService.courseList$
    }
  },
  data() {
    return {
      show: false,
      consumeList: []
    }
  },
  computed: {
    columns
  },
  props: {
    id: Number
  },
  methods: {},
  mounted() {
    this.personalCourseService.getCourseList().subscribe()
  }
}
</script>
