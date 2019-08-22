<template>
  <st-modal
    class="modal-transfer-brand-course"
    title="批量转入品牌课程库"
    @ok="save"
    width="888px"
    v-model="show"
  >
    <span>{{ courseList | filterCourseName }}</span>
    <st-form>
      <st-form-item label="支持上课门店" required>
        <a-radio-group @change="supportRange" v-model="shop_setting">
          <a-radio :value="1">全部门店</a-radio>
          <a-radio :value="2">指定门店</a-radio>
        </a-radio-group>
        <span>(设置支持上这些课程的门店)</span>
      </st-form-item>
      <st-form-item
        class="modal-transfer-brand-course__form-item-emtry"
        labelWidth="1px"
        label=" "
      >
        <st-container v-if="shop_setting === 2">
          <select-shop @change="onChangeShopSetting"></select-shop>
        </st-container>
      </st-form-item>
    </st-form>
  </st-modal>
</template>
<script>
import { columnsShops } from './support-table.config'
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
      show: false,
      shop_setting: '',
      shop_ids: []
    }
  },
  filters: {
    filterCourseName(val) {
      return val.map(item => item.course_name).join(',')
    }
  },
  components: {
    SelectShop
  },
  props: {
    courseList: {
      type: Array,
      default: () => {}
    }
  },
  computed: {
    courseIds() {
      return this.courseList.map(item => item.id)
    }
  },
  methods: {
    supportRange() {},
    onChangeShopSetting(val) {
      console.log(val)
      this.shop_ids = val
    },
    save() {
      let form = {
        course_id: this.courseIds,
        shop_setting: this.shop_setting,
        shop_ids: this.shop_ids
      }
      this.shopService.putCourseTeamIntoBrand(form).subscribe(res => {
        this.show = false
        this.$router.reload()
      })
    }
  }
}
</script>
