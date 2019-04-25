<template>
  <a-modal
    class="modal-support-course-shops"
    title='绑定实体卡'
    v-model='show'>
    <st-table
    :columns="columnsCoaches"
    :rowKey="record => record.id"
    :dataSource="supportCoachList">
    </st-table>
  </a-modal>
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
    courseId: {
      type: Number,
      default: -1
    }
  },
  methods: {
    getShops() {
      this.brandService.getCoursePersonalSupportCoaches({ course_id: this.courseId }).subscribe(state => {
        this.supportCoachList = state.list
      })
    }
  },
  mounted() {
    this.getShops()
  }
}
</script>
