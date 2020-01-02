<template>
  <st-mina-panel>
    <h5-container slot="preview" fixed>
      <template v-slot:title>
        我的优惠券
      </template>
      <div :class="basic('left-coupon')">
        <div :class="basic('left-coupon-top')">
          <div :class="basic('left-coupon-top-left')">
            <span :class="basic('left-coupon-top-left-number')">
              {{ form.getFieldValue('price') }}
            </span>
            元
            <br />
            {{ form.getFieldValue('use_type') === 1 ? '无门槛使用' : '' }}
            {{
              form.getFieldValue('use_type') === 2
                ? `满${form.getFieldValue('full_price') || ''}元使用`
                : ''
            }}
          </div>
          <div :class="basic('left-coupon-top-right')">
            有效期：{{ getValidDay(form.getFieldValue('valid_days')) }}
            <br />
            可用类目：{{ getRange().join('、') }}
          </div>
        </div>
        <div :class="basic('left-coupon-bottom')">
          可用门店：{{ shopNames }}
        </div>
      </div>
    </h5-container>
    <div slot="actions">
      <st-button
        :loading="loading.addMarketingCoupon || loading.editMarketingCoupon"
        type="primary"
        @click="onSubmit"
      >
        保 存
      </st-button>
    </div>

    <div>
      <st-form :form="form" labelWidth="118px">
        <a-row :gutter="8">
          <a-col :lg="24">
            <st-form-item required v-if="couponTypeOptions.length">
              <template slot="label">
                优惠券类型
                <st-help-tooltip id="TBYHQ001" />
              </template>
              <a-radio-group v-model="couponType" :disabled="isEditMode">
                <a-radio-button
                  v-for="item in couponTypeOptions"
                  :value="item.value"
                  :key="item.value"
                >
                  {{ item.label }}
                </a-radio-button>
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
                <template slot="addonAfter">
                  元
                </template>
              </st-input-number>
            </st-form-item>
          </a-col>
        </a-row>
        <a-divider :class="basic('line')"></a-divider>
        <a-row :gutter="8">
          <a-col :lg="23">
            <st-form-item label="优惠范围" required>
              <a-select
                :disabled="isEditMode"
                :value="rangeIds"
                style="width: 360px"
                @change="changeProductRange"
                mode="multiple"
                placeholder="请选择类目"
                :class="basic('select')"
                :options="product_ranges"
              ></a-select>
            </st-form-item>
            <st-form-item label="可用门店" required>
              <a-radio-group
                v-model="showShopRange"
                :disabled="isEditMode"
                v-if="isShopRangeOptions.length > 1"
              >
                <a-radio
                  v-for="item in isShopRangeOptions"
                  :value="item.value"
                  :key="item.value"
                >
                  {{ item.label }}
                </a-radio>
              </a-radio-group>
              <select-shop
                style="border:1px solid #CDD4DF;padding:8px 12px;border-radius:4px"
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
                @change="userTypeChange"
              >
                <a-radio :value="1">无门槛使用</a-radio>
                <a-form-item :class="basic('wrap-input')">
                  <a-radio :value="2">
                    满
                    <st-input-number
                      :float="true"
                      :class="basic('radio-input')"
                      :disabled="isEditMode"
                      v-decorator="decorators.full_price"
                    ></st-input-number>
                    元使用
                  </a-radio>
                </a-form-item>
              </a-radio-group>
            </st-form-item>
            <st-form-item label="发放数量" required>
              <st-input-number
                :class="basic('input')"
                style="top:0;"
                placeholder="请输入数量"
                :min="isEditMode ? +info.number : 0"
                v-decorator="decorators.number"
              >
                <template slot="addonAfter">
                  张
                </template>
              </st-input-number>
              <span :class="basic('tip')">保存后只可增加不可减少</span>
            </st-form-item>
            <st-form-item label="使用有效期" required>
              领券当日起
              <st-input-number
                :disabled="isEditMode"
                :class="basic('radio-input')"
                v-decorator="decorators.valid_days"
              ></st-input-number>
              天内有效
            </st-form-item>
            <st-form-item>
              <template slot="label">
                优惠共享
                <st-help-tooltip id="TBYHQ002" />
              </template>
              <st-checkbox
                v-decorator="decorators.is_share"
                :disabled="isEditMode"
              >
                不可与其它优惠同享
              </st-checkbox>
            </st-form-item>
            <st-form-item label="每人限领" required v-if="couponType === 1">
              <a-radio-group
                :disabled="isEditMode"
                v-decorator="decorators.is_limit"
                @change="limitChange"
              >
                <a-radio :value="1">不限</a-radio>
                <a-form-item :class="basic('wrap-input')">
                  <a-radio :value="2">
                    每人限领
                    <a-input-number
                      @focus="checkThisLimitRadio"
                      :disabled="isEditMode"
                      :class="basic('radio-input')"
                      v-decorator="decorators.person_limit"
                    ></a-input-number>
                    次
                  </a-radio>
                </a-form-item>
              </a-radio-group>
            </st-form-item>
          </a-col>
        </a-row>
      </st-form>
    </div>
  </st-mina-panel>
</template>
<script>
import { UserService } from '@/services/user.service'
import { TitleService } from '@/services/title.service'
import moment from 'moment'
import { cloneDeep, remove, find as lodashFind } from 'lodash-es'
import { AddService } from './add.service'
import SelectShop from '@/views/fragments/shop/select-shop'
import H5Container from '@/views/biz-components/h5/h5-container'
import { ruleOptions } from './add.config'
export default {
  name: 'BrandMarketingPluginCouponAdd',
  serviceInject() {
    return {
      addService: AddService,
      userService: UserService,
      titleService: TitleService
    }
  },
  rxState() {
    return {
      loading: this.addService.loading$,
      couponTypeOptions: this.addService.couponTypeOptions$,
      isShopRangeOptions: this.addService.isShopRangeOptions$,
      product_ranges: this.addService.product_ranges$
    }
  },
  bem: {
    basic: 'brand-marketing-coupon-add'
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      // isEditMode: false,
      // form: this.$form.createForm(this),
      // 优惠类型
      couponType: 1,
      // 优惠范围
      showProductRange: '2',
      // 门店范围
      showShopRange: '2',
      // 满足金额
      fullPrice: '',
      // 是否共享
      isShare: false,
      // 限领数量
      personLimit: '',
      // 已经选择的类目ids
      rangeIds: [],
      // 已经选择的门店ids
      shopIds: [],
      shopNames: ''
    }
  },
  props: {
    isEditMode: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
      default: () => {}
    }
  },
  created() {
    if (this.isEditMode) {
      this.setFieldsValue()
    }
  },
  methods: {
    limitChange(e) {
      this.form.resetFields(['person_limit'])
    },
    userTypeChange(e) {
      this.form.resetFields(['full_price'])
    },
    getValidDay(days) {
      return moment()
        .add(days, 'd')
        .format('YYYY年MM月DD日 23:59')
    },
    getRange() {
      let ranges = this.rangeIds.map(id => {
        return lodashFind(this.product_ranges, { value: id }).label
      })
      return ranges
    },
    changeProductRange(event) {
      this.rangeIds = event
    },
    onSelectShop(event) {
      this.shopIds = event
    },
    checkThisLimitRadio() {
      this.form.setFieldsValue({ is_limit: 2 })
    },
    setFieldsValue() {
      this.couponType = this.info.coupon_type.id
      this.showProductRange = this.info.is_product_range + ''
      this.showShopRange = this.info.is_shop_range + ''
      this.shopIds = this.info.shop_ids
      this.rangeIds = this.info.range_ids
      setTimeout(() => {
        this.form.setFieldsValue({
          coupon_name: this.info.coupon_name,
          price: +this.info.price,
          use_type: this.info.use_type,
          full_price: +this.info.full_price || '',
          number: this.info.number,
          valid_days: this.info.valid_days,
          is_share: this.info.is_share,
          is_limit: this.info.is_limit,
          person_limit: this.info.person_limit || ''
        })
      })
    },
    // 保存
    onSubmit() {
      this.form.validate().then(values => {
        let params = {}
        if (this.isEditMode) {
          params.id = this.$searchQuery.id
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
            is_share: values.is_share,
            is_limit: values.is_limit,
            person_limit: values.person_limit || undefined
          }
        }
        if (this.isEditMode) {
          this.addService.editMarketingCoupon(params).subscribe(res => {
            // 编辑成功
            this.$router.push({
              path: '/brand/marketing/plugin/coupon/list'
            })
          })
        } else {
          this.addService.addMarketingCoupon(params).subscribe(res => {
            // 新增成功
            this.$router.push({
              path: `/brand/marketing/plugin/coupon/list`
            })
          })
        }
      })
    }
  },
  watch: {
    shopIds(val) {
      if (val && val.length) {
        this.addService.getShopBasic({ shop_ids: val }).subscribe(res => {
          this.shopNames = res.map(({ shop_name }) => shop_name).join('/')
        })
      }
    }
  },
  components: {
    SelectShop,
    H5Container
  }
}
</script>
