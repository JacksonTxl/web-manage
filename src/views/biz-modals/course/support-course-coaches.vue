<template>
  <st-modal
    class="modal-support-course-shops"
    :title="course.course_name + ' 查看授课教练'"
    :footer="null"
    v-model="show"
  >
    <st-container>
      <st-table
        :columns="columnsCoaches"
        :rowKey="record => record.id"
        :page="false"
        :dataSource="supportCoachList"
      >
        <div slot="nature_work" slot-scope="text">
          {{ text | enumFilter('staff.nature_work') }}
        </div>
      </st-table>
    </st-container>
  </st-modal>
</template>
<script>
import { columnsCoaches } from './support-table.config'
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
      this.brandService
        .getCoursePersonalSupportCoaches({ course_id: this.course.course_id })
        .subscribe(state => {
          this.supportCoachList = state.coaches
        })
    }
  },
  mounted() {
    this.getShops()
  }
}
</script>
