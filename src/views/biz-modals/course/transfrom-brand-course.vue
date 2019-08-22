<template>
  <st-modal
    class="modal-transfer-brand-course"
    :title="course.course_name + ' 批量转入品牌课程库'"
    width="888px"
    v-model="show"
  >
    <h3 class="modal-transfer-brand-course__title">
      <a-icon type="question-circle" />
      <i class="modal-transfer-brand-course__title-icon mg-r16">?</i>
      确认要删除
    </h3>
    <p class="modal-transfer-brand-course__content mg-l40">
      将课程转入品牌课程库后，门店仅能使用此课程，转入时可设置支持上课门店及定价，若品牌统一调整定价，将影响原门店课程售卖价格。
    </p>
    <st-form v-if="isEdit">
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
      <st-form-item label="支持上课教练" required>
        <span>(设置此课程支持上课教练)</span>
      </st-form-item>
      <st-form-item
        class="modal-transfer-brand-course__form-item-emtry"
        labelWidth="1px"
        label=" "
      >
        <st-container v-if="shop_setting === 2">
          <select-coach @change="onChangeCoachSetting"></select-coach>
        </st-container>
      </st-form-item>
      <st-form-item label="售价设置" required>
        <a-radio-group @change="supportRange" v-model="price_setting">
          <a-radio :value="1">售卖场馆自主定价</a-radio>
          <a-radio :value="2">品牌统一定价</a-radio>
        </a-radio-group>
        <span>(设置为品牌定价后，将所有支持上课门店统一售价)</span>
      </st-form-item>
      <div class="modal-transfer-brand-course__price-setting">
        <set-price
          v-if="price_setting === 2"
          @change="onChangePriceSetting"
        ></set-price>
      </div>
    </st-form>
    <template slot="footer">
      <div>
        <a href="javascript:;" @click="onClickIsEdit">{{ isEditContent }}</a>
        <st-button key="back" @click="handleCancel">取消</st-button>
        <st-button
          key="submit"
          type="primary"
          @click="upgradePersonalCourseInBrand"
        >
          确认转入
        </st-button>
      </div>
    </template>
  </st-modal>
</template>
<script>
import { columnsShops } from './support-table.config'
import SelectShop from '@/views/fragments/shop/select-shop.vue'
import SetPrice from '@/views/fragments/course/set-price.vue'
import SelectCoach from '@/views/fragments/coach/select-coach.vue'
import { ShopService } from '../../pages/brand/product/course/personal/list/shop.service'
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
      price_setting: 2,
      isEditContent: '修改上课门店范围及定价',
      columnsShops,
      shop_ids: [],
      coach_ids: [],
      price_gradient: [],
      isEdit: false,
      show: false
    }
  },
  props: {
    course: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    SelectShop,
    SetPrice,
    SelectCoach
  },
  computed: {
    res() {
      return {
        course_ids: [this.course.course_id],
        shop_setting: this.shop_setting,
        shop_ids: this.shop_ids,
        coach_ids: this.coach_ids,
        price_setting: this.price_setting,
        price_gradient: this.price_gradient
      }
    }
  },
  methods: {
    onChangeShopSetting(val) {
      this.shop_ids = val
    },
    onChangeCoachSetting(val) {
      this.coach_ids = val
    },
    onChangePriceSetting(val) {
      this.price_gradient = val
    },
    supportRange(sup) {},
    salesShopChange(val) {
      this.shop_ids = val
    },
    onClickIsEdit() {
      this.isEdit = !this.isEdit
      this.isEditContent = this.isEdit
        ? '取消修改上课门店范围及定价'
        : '修改上课门店范围及定价'
    },
    handleCancel() {},
    upgradePersonalCourseInBrand() {
      this.shopService.upgradePersonalCourseInBrand(this.res).subscribe(() => {
        this.show = false
        this.$router.reload()
      })
    }
  }
}
</script>
