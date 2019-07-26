<template>
  <st-panel app :class="basic()" initial>
    <div :class="basic('body')">
      <div>
        <st-form :form="form" labelWidth="118px">
          <a-row :gutter="8">
            <a-col :lg="24">
              <st-form-item required v-if="couponEnums.coupon_type">
                <template slot="label">
                  优惠券类型
                  <st-help-tooltip id="TBYHQ001" />
                </template>
                <a-radio-group v-model="couponType" :disabled="isEditMode">
                  <a-radio-button
                    v-for="(item, index) in couponEnums.coupon_type.value"
                    :value="index"
                    :key="index"
                  >{{item}}</a-radio-button>
                </a-radio-group>
              </st-form-item>
              <st-form-item label="优惠券名称" required>
                <a-input
                  :disabled="isEditMode"
                  v-decorator="decorators.coupon_name"
                  maxlength="10"
                  placeholder="请输入优惠券名称"
                  :class="basic('input')"
                ></a-input>
              </st-form-item>
              <st-form-item label="面额" required>
                <st-input-number
                  :float="true"
                  :min="1"
                  :max="9999.9"
                  :disabled="isEditMode"
                  style="top:0;"
                  placeholder="请输入面额"
                  :class="basic('input')"
                  v-decorator="decorators.price"
                >
                  <template slot="addonAfter">元</template>
                </st-input-number>
              </st-form-item>
            </a-col>
          </a-row>
          <a-divider :class="basic('line')"></a-divider>
          <a-row :gutter="8">
            <a-col :lg="23">
              <st-form-item label="优惠范围" required v-if="couponEnums.is_product_range">
                <a-radio-group v-model="showProductRange" :disabled="isEditMode">
                  <a-radio
                    v-for="(item, index) in couponEnums.is_product_range.value"
                    :value="index"
                    :key="index"
                  >{{item}}</a-radio>
                </a-radio-group>
                <a-select
                  :disabled="isEditMode"
                  v-if="showProductRange == '2' && couponEnums.product_range"
                  :defaultValue="rangeIds"
                  style="width: 360px"
                  @change="changeProductRange"
                  mode="multiple"
                  placeholder="请选择类目"
                  :class="basic('select')"
                >
                  <a-select-option
                    v-for="(item, index) in couponEnums.product_range['value']"
                    :key="index"
                    :value="index"
                  >{{item}}</a-select-option>
                </a-select>
              </st-form-item>
              <st-form-item label="可用门店" required>
                <a-radio-group v-model="showShopRange" :disabled="isEditMode">
                  <a-radio
                    v-for="(item, index) in couponEnums.is_shop_range.value"
                    :value="index"
                    :key="index"
                  >{{item}}</a-radio>
                </a-radio-group>
                <select-shop
                  v-if="showShopRange == '2'"
                  @change="onSelectShop"
                  :shopIds="shopIds"
                  :disabled="isEditMode"
                ></select-shop>
              </st-form-item>
              <st-form-item label="使用条件" required>
                <a-radio-group
                  :disabled="isEditMode"
                  v-decorator="decorators.use_type"
                >
                  <a-radio :value="1">无门槛使用</a-radio>
                  <a-form-item :class="basic('wrap-input')">
                    <a-radio :value="2">
                      满
                      <st-input-number
                        :class="basic('radio-input')"
                        :disabled="isEditMode"
                        v-decorator="decorators.full_price"
                      ></st-input-number>元使用
                    </a-radio>
                  </a-form-item>
                </a-radio-group>
              </st-form-item>
              <st-form-item label="发放数量" required>
                <st-input-number
                  :class="basic('input')"
                  style="top:0;"
                  placeholder="请输入数量"
                  :min="isEditMode?+info.number:0"
                  v-decorator="decorators.number"
                >
                  <template slot="addonAfter">张</template>
                </st-input-number>
                <label :class="basic('tip')">保存后只可增加不可减少</label>
              </st-form-item>
              <st-form-item label="使用有效期" required>
                领券当日起
                <st-input-number
                  :disabled="isEditMode"
                  :class="basic('radio-input')"
                  v-decorator="decorators.valid_days"
                ></st-input-number>天内有效
              </st-form-item>
              <st-form-item>
                <template slot="label">
                  优惠共享
                  <st-help-tooltip id="TBYHQ002" />
                </template>
                <a-checkbox v-model="isShare" :disabled="isEditMode">不可与其它优惠同享</a-checkbox>
              </st-form-item>
              <st-form-item label="每人限领" required v-if="couponType === '1'">
                <a-radio-group
                  :disabled="isEditMode"
                  v-decorator="decorators.is_limit"
                >
                  <a-radio :value="0">不限</a-radio>
                  <a-form-item :class="basic('wrap-input')">
                    <a-radio :value="1">
                      每人限领
                      <st-input-number
                        :disabled="isEditMode"
                        :class="basic('radio-input')"
                        v-decorator="decorators.person_limit"
                      ></st-input-number>次
                    </a-radio>
                  </a-form-item>
                </a-radio-group>
              </st-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="8">
            <a-col :lg="20">
              <st-form-item class="page-content-card-submit" label=" ">
                <st-button :loading="loading.addMarketingCoupon || loading.editMarketingCoupon" type="primary" @click="onSubmit">保 存</st-button>
              </st-form-item>
            </a-col>
          </a-row>
        </st-form>
      </div>
    </div>
  </st-panel>
</template>
<script>
import { UserService } from '@/services/user.service'
import moment from 'moment'
import { cloneDeep, remove } from 'lodash-es'
import { AddService } from './add.service'
import SelectShop from '@/views/fragments/shop/select-shop'
export default {
  name: 'BrandMarketingPluginCouponAdd',
  serviceInject() {
    return {
      addService: AddService,
      userService: UserService
    }
  },
  rxState() {
    return {
      loading: this.addService.loading$,
      info: this.addService.info$,
      couponEnums: this.userService.couponEnums$
    }
  },
  bem: {
    basic: 'brand-marketing-coupon-add'
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators({
      coupon_name: {
        rules: [{ validator: this.coupon_name_validator }]
      },
      price: { rules: [{ validator: this.price_validator }] },
      use_type: { rules: [{ validator: this.use_type_validator }] },
      full_price: { rules: [{ validator: this.full_price_validator }] },
      number: { rules: [{ validator: this.number_validator }] },
      valid_days: { rules: [{ validator: this.valid_days_validator }] },
      is_limit: { rules: [{ validator: this.is_limit_validator }] },
      person_limit: { rules: [{ validator: this.person_limit_validator }] }
    })
    return {
      form,
      decorators,
      isEditMode: false,
      // form: this.$form.createForm(this),
      // 优惠类型
      couponType: '1',
      // 优惠范围
      showProductRange: '1',
      // 门店范围
      showShopRange: '1',
      // 满足金额
      fullPrice: '',
      // 是否共享
      isShare: false,
      // 限领数量
      personLimit: '',
      // 已经选择的类目ids
      rangeIds: [],
      // 已经选择的门店ids
      shopIds: []
    }
  },
  created() {
    if (this.$route.query.id) {
      // 进入编辑模式
      this.addService.getInfo(this.$route.query.id).subscribe(res => {
        this.setFieldsValue()
        this.isEditMode = true
      })
    } else {
      this.isEditMode = false
    }
  },
  methods: {
    changeProductRange(event) {
      this.rangeIds = event
    },
    onSelectShop(event) {
      this.shopIds = event
    },

    // 优惠券名称
    coupon_name_validator(rule, value, values) {
      if (!value) {
        return '请填写优惠券名称'
      }
      if (value.length > 10) {
        return '优惠券名称长度不能超过10，请重新输入'
      }
    },
    // 面额
    price_validator(rule, value, values) {
      let price = value + ''
      if (!value) {
        return '请填写优惠券面额'
      }
      let value1 = price.split('.')[0]
      let value2 = price.split('.')[1] || 0
      let reg1 = new RegExp(/^[1-9]\d{0,3}$/)
      let reg2 = new RegExp(/^[0-9]\d{0,1}$/)

      if (!(reg1.test(value1) && reg2.test(value2))) {
        return '请输入正确范围的金额'
      }
    },
    // 使用门槛
    use_type_validator(rule, value, values) {
      if (!value) {
        return '请选择使用条件'
      }
    },
    // 满多少使用
    full_price_validator(rule, value, values) {
      let use_type = +values.use_type
      let couponPirce = +values.price || 0

      if (use_type === 2) {
        if (!value) {
          return '请填写使用条件'
        }
        if (couponPirce > +value) {
          return '满减门槛不能低于优惠券面额'
        }
      }
    },
    // 发放数量
    number_validator(rule, value, values) {
      if (!value) {
        return '请填写发放数量'
      }
    },
    // 使用有效期
    valid_days_validator(rule, value, values) {
      if (!value) {
        return '请填写使用期限'
      }
    },
    // 每人是否限领
    is_limit_validator(rule, value, values) {
      let is_limit = values.is_limit
      if (is_limit !== 0 && is_limit !== 1) {
        return '请选择是否限制领用'
      }
    },
    // 每人限领数量 setFieldsValue
    person_limit_validator(rule, value, values) {
      let is_limit = values.is_limit
      if (is_limit === 1) {
        if (!value) {
          return '请输入每人限领数量'
        }
      }
    },
    setFieldsValue() {
      this.couponType = this.info.coupon_type.id + ''
      this.showProductRange = this.info.is_product_range + ''
      this.showShopRange = this.info.is_shop_range + ''
      this.shopIds = this.info.shop_ids
      this.isShare = this.info.is_share !== 0
      this.rangeIds = this.info.range_ids.map(item => {
        return this.couponEnums.product_range.value[item]
      })
      this.form.setFieldsValue({
        coupon_name: this.info.coupon_name,
        price: +this.info.price,
        use_type: this.info.use_type,
        full_price: this.info.full_price,
        number: this.info.number,
        valid_days: this.info.valid_days,
        is_limit: this.info.is_limit,
        person_limit: this.info.person_limit
      })
    },
    // 保存
    onSubmit() {
      this.form.validate().then(values => {
        let params = {}
        console.log('1')
        if (this.isEditMode) {
          params.id = this.$route.query.id
          params.before_number = this.info.number
          params.after_number = values.number
        } else {
          params = {
            coupon_type: this.couponType,
            coupon_name: values.coupon_name,
            price: values.price,
            is_product_range: this.showProductRange,
            range_ids: this.rangeIds,
            is_shop_range: this.showShopRange,
            shop_ids: this.shopIds,
            use_type: values.use_type,
            full_price: values.full_price,
            number: values.number,
            valid_days: values.valid_days,
            is_share: this.isShare ? 1 : 0,
            is_limit: values.is_limit,
            person_limit: values.person_limit || undefined
          }
        }
        if (this.isEditMode) {
          this.addService.editMarketingCoupon(params).subscribe(res => {
            console.log('edit success')
            // 编辑成功
            this.$router.push({
              path: '/brand/marketing/plugin/coupon/list',
              force: true
            })
          })
        } else {
          this.addService.addMarketingCoupon(params).subscribe(res => {
            console.log('add success')
            // 新增成功
            this.$router.push({
              path: `/brand/marketing/plugin/coupon/list`,
              force: true
            })
          })
        }
      })
    }
  },
  watch: {},
  computed: {},
  components: {
    SelectShop
  }
}
</script>
