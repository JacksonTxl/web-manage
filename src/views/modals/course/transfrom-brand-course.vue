<template>
  <a-modal
    class="modal-support-course-shops"
    @ok="postTransFromBrandCourse"
    title='批量转入品牌课程库'
    v-model='show'>
    <st-form>
      <st-form-item label="批量设置支持上课门店" required>
        <a-radio-group
          @change="supportRange" v-model="shop_setting">
          <a-radio :value="1">全部门店</a-radio>
          <a-radio :value="2">指定门店</a-radio>
        </a-radio-group>
        <div  v-if="shop_setting===2">
          <p>设置支持上这些课程的门店</p>
          <select-shop @change="salesShopChange"></select-shop>
        </div>
      </st-form-item>
    </st-form>
  </a-modal>
</template>
<script>
import { columnsShops } from './support-table'
import SelectShop from '@/views/fragments/shop/select-shop.vue'
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
      shop_setting: 2,
      columnsShops,
      shop_ids: [],
      show: false
    }
  },
  props: {
    courseIds: {
      type: Array,
      default: () => []
    }
  },
  components: {
    SelectShop
  },
  methods: {
    supportRange(sup) {
    },
    salesShopChange(val) {
      console.log(val)
      this.shop_ids = val
    },
    postTransFromBrandCourse() {
      const params = {
        course_id: this.courseIds,
        shop_setting: this.shop_setting,
        shop_ids: this.shop_ids
      }
      this.shopService.putCourseTeamIntoBrand(params).subscribe(() => { this.show = false })
    }
  }
}
</script>
