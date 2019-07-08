<template>
  <st-modal
    class="modal-support-course-shops"
    title='查看店详情'
    v-model='show'>
    <st-container>
    <st-table
    :columns="columnsShops"
    :rowKey="record => record.shop_name"
    :dataSource="supportShopList">
    </st-table>
    </st-container>
  </st-modal>
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
        this.supportShopList = state.shops
      })
    }
  },
  mounted() {
    this.getShops()
  }
}
</script>
