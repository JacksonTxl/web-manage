<template>
  <a-modal
    class="modal-support-course-shops"
    @ok="postTransFromBrandCourse"
    title='批量转入品牌课程库'
    v-model='show'>

  </a-modal>
</template>
<script>
import { columnsShops } from './support-table'
import { ShopService } from '../../pages/brand/product/course/team/list/shop.service'
export default {
  name: 'TransfromBrandCourse',
  serviceInject() {
    return {
      shopService: ShopService
    }
  },
  data() {
    return {
      columnsShops,
      show: false
    }
  },
  props: {
    courseIds: {
      type: Number,
      default: -1
    }
  },
  methods: {
    postTransFromBrandCourse() {
      const params = {
        course_id: 3,
        shop_setting: 2,
        shop_ids: [1, 2, 3],
        coach_ids: [2, 4, 3, 5]
      }
      this.shopService.putCourseTeamIntoBrand(params).subscribe()
    }
  }
}
</script>
