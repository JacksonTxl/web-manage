<template>
  <st-form :form="form" class="page-set-sell-price" labelWidth="100px">
    <a-row :gutter="8">
      <a-col :lg="10" :offset="1">
        <!-- 课程名称 -->
        <st-form-item label="课程名称">
          <a-input
            placeholder="课程名称"
            disabled
            v-decorator="decorators.course_name"
          />
        </st-form-item>
        <!-- 售卖方式 -->
        <st-form-item label="售卖方式">
          <a-checkbox-group
            :options="sellTypeOptions"
            v-decorator="decorators.sell_type"
          >
            <a-checkbox
              v-for="(item, index) in sellType"
              :key="index"
              :value="item.value"
            >
              {{ item.label }}
            </a-checkbox>
          </a-checkbox-group>
        </st-form-item>
        <!-- 课程有效期 -->
        <st-form-item>
          <template slot="label">
            课有效期
            <st-help-tooltip id="TBCPC003" />
          </template>
          <st-input-number v-decorator="decorators.effective_unit">
            <template slot="addonAfter">
              天
            </template>
          </st-input-number>
        </st-form-item>
        <!-- 定价权限 -->
        <st-form-item required>
          <template slot="label">
            定价权限
            <st-help-tooltip id="TBCPC004" />
          </template>
          <a-radio-group
            @change="onChange"
            v-decorator="decorators.price_setting"
          >
            <a-radio :value="PRICE_SETTING.UNIFORM_PRICE">品牌统一定价</a-radio>
            <a-radio :value="PRICE_SETTING.SHOP_PRICE">
              售卖场馆自主定价
            </a-radio>
          </a-radio-group>
        </st-form-item>
        <!-- 单节预约 -->
        <st-form-item>
          <template slot="label">
            单节预约
            <st-help-tooltip id="TBCPC005" />
          </template>
          <a-checkbox
            :checked="!!singleReserve"
            @change="onSingleReserveChange"
          >
            支持单节课预约
          </a-checkbox>
          <template v-if="singleReserve">
            <st-input-number
              v-model="singlePrice"
              :float="true"
              style="width: 100px;"
            />
            <span class="mg-l8">元/节</span>
          </template>
        </st-form-item>
      </a-col>
    </a-row>

    <a-row :gutter="8">
      <a-col :lg="22" :offset="1">
        <st-form-item v-if="isShowUnitSet" labelFix>
          <set-price :value="priceGradient" @change="onPriceGradientChange" />
        </st-form-item>
      </a-col>
    </a-row>

    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item labelFix>
          <st-button
            type="primary"
            @click="save"
            :loading="loading.setPrice"
            :disabled="!courseId"
          >
            完成
          </st-button>
        </st-form-item>
      </a-col>
    </a-row>
  </st-form>
</template>
<script>
import { AddService } from '../../add.service'
import { MessageService } from '@/services/message.service'
import { remove } from 'lodash-es'
import SetPrice from '@/views/fragments/course/set-price'
import { GradientService } from '@/views/fragments/course/personal#/gradient.service'
import { ruleOptions } from '../set-sell-price.config'
import { SELL_TYPE, PRICE_SETTING } from '@/constants/course/personal'
export default {
  name: 'SetSellPrice',
  serviceInject() {
    return {
      addService: AddService,
      messageService: MessageService,
      gradientService: GradientService
    }
  },
  rxState() {
    return {
      loading: this.addService.loading$,
      sellType: this.addService.sellType$
    }
  },
  components: {
    SetPrice
  },
  props: {
    courseName: {
      type: String,
      default: ''
    },
    courseId: {
      type: Number,
      default: 0
    }
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      PRICE_SETTING,
      priceSetting: PRICE_SETTING.UNIFORM_PRICE,
      priceGradient: [],
      singleReserve: 0,
      singlePrice: ''
    }
  },
  computed: {
    isShowUnitSet() {
      return this.priceSetting === PRICE_SETTING.UNIFORM_PRICE
    },
    sellTypeOptions() {
      const sellType = this.sellType
      const options = []
      sellType.forEach(item => {
        options.push({
          label: item.label,
          value: item.value,
          disabled: item.value === SELL_TYPE.OFFLINE
        })
      })
      return options
    }
  },
  watch: {
    courseName(val) {
      this.form.setFieldsValue({
        course_name: val
      })
    },
    courseId(val) {
      this.form.setFieldsValue({
        course_id: val
      })
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.form.setFieldsValue({
        course_name: this.course_name
      })
    })
  },
  methods: {
    save(e) {
      e.preventDefault()
      const data = this.getData()
      this.form.validate().then(() => {
        if (!this.inputCheck()) {
          return
        }
        this.addService.setPrice(data).subscribe(this.onSaveSuccess)
      })
    },
    onSaveSuccess() {
      this.messageService.success({
        content: '提交成功'
      })
      this.$router.push({
        name: 'brand-product-course-personal-list-brand'
      })
    },
    onChange(e) {
      this.priceSetting = e.target.value
    },
    inputCheck() {
      if (this.singleReserve) {
        if (!this.singlePrice.length) {
          this.messageService.error({
            content: '请输入单节预约价格'
          })
          return
        }
      }
      if (!this.gradientService.check(this.priceGradient)) {
        return false
      }
      return true
    },
    getData() {
      const data = this.form.getFieldsValue()
      data.course_id = this.courseId
      data.price_gradient = this.priceGradient
      data.single_reserve = +this.singleReserve
      if (data.single_reserve) {
        data.single_price = this.singlePrice
      }
      return data
    },
    onPriceGradientChange(priceGradient) {
      this.priceGradient = priceGradient
    },
    onSingleReserveChange() {
      this.singleReserve = +!this.singleReserve
    }
  }
}
</script>
