<template>
  <a-modal
    class="modal-support-course-shops"
    title='绑定实体卡'
    v-model='show'>
    <st-table
    :columns="columnsShops"
    :rowKey="record => record.id"
    :dataSource="supportShopList">
    </st-table>
  </a-modal>
</template>
<script>
import { columnsShops } from './support-table'
import { BrandService } from '../../pages/brand/product/course/personal/list/brand.service'
export default {
  name: 'SupportCourseShops',
  serviceInject() {
    return {
      brandService: BrandService
    }
  },
  data() {
    return {
      columnsShops,
      show: false,
      supportShopList: []
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
      this.brandService.getCoursePersonalSupportShops({ course_id: this.courseId }).subscribe(state => {
        this.supportShopList = state.list
      })
    }
  },
  mounted() {
    this.getShops()
  }
}
</script>
