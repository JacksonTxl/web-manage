<template>
  <st-modal
    class="modal-support-course-shops"
    :title="course.course_name + ' 查看授课教练'"
    v-model='show'>
    <st-table
    :columns="columnsCoaches"
    :rowKey="record => record.id"
    :dataSource="supportCoachList">
    </st-table>
  </st-modal>
</template>
<script>
import { columnsCoaches } from './support-table'
import { BrandService } from '../../pages/brand/product/course/personal/list/brand.service'
export default {
  name: 'SupportCourseCoaches',
  serviceInject() {
    return {
      brandService: BrandService
    }
  },
  data() {
    return {
      columnsCoaches,
      show: false,
      supportCoachList: []
    }
  },
  props: {
    course: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    getShops() {
      this.brandService.getCoursePersonalSupportCoaches({ course_id: this.course.course_id }).subscribe(state => {
        this.supportCoachList = state.list
      })
    }
  },
  mounted() {
    this.getShops()
  }
}
</script>
