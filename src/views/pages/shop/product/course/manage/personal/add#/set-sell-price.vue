<template>
  <st-form :form="form" class="page-set-sell-price" labelWidth="100px">
    <a-row :gutter="8">
      <a-col :lg="10" :offset="1">
        <!-- 课程名称 -->
        <st-form-item label="课程名称">
          <a-input placeholder="课程名称" disabled v-decorator="ruleConfig.courseName"/>
        </st-form-item>
        <!-- 售卖渠道 -->
        <st-form-item label="售卖渠道">
          <a-checkbox-group :options="sellTypeOptions" v-decorator="ruleConfig.sellType">
            <a-checkbox v-for="(item, index) in personalCourseEnums.sell_type.value" :key="index" :value="index">
              {{item}}
            </a-checkbox>
          </a-checkbox-group>
        </st-form-item>
        <!-- 课程有效期 -->
        <st-form-item>
          <template slot="label">
            课有效期<st-help-tooltip id="TSCPC002" />
          </template>
          <a-input-number :min="0" v-decorator="ruleConfig.effectiveUnit">
            <div slot="addonAfter" class="st-form-item-unit">天/节</div>
          </a-input-number>
        </st-form-item>
        <!-- 单节预约 -->
        <st-form-item>
          <template slot="label">
            单节预约<st-help-tooltip id="TBCPC005" />
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
              style="width: 100px;"
            />
            <span class="mg-l8">元/节</span>
          </template>
        </st-form-item>
      </a-col>
    </a-row>

    <a-row :gutter="8">
      <a-col :lg="22" :offset="1">
        <st-form-item labelFix>
          <set-price
            :value="priceGradient"
            @change="onPriceGradientChange"
          />
        </st-form-item>
      </a-col>
    </a-row>

    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item labelFix>
          <st-button type="primary" @click="save" :loading="loading.setPrice">完成</st-button>
        </st-form-item>
      </a-col>
    </a-row>
  </st-form>
</template>
<script>
import { AddService } from '../add.service'
import { MessageService } from '@/services/message.service'
import { UserService } from '@/services/user.service'
import { remove } from 'lodash-es'
import { RuleConfig } from '@/constants/course/rule'
import SetPrice from '@/views/fragments/course/set-price'

export default {
  name: 'SetSellPrice',
  serviceInject() {
    return {
      addService: AddService,
      messageService: MessageService,
      userService: UserService,
      ruleConfig: RuleConfig
    }
  },
  rxState() {
    const user = this.userService
    return {
      loading: this.addService.loading$,
      personalCourseEnums: user.personalCourseEnums$
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
    return {
      form: this.$form.createForm(this),
      priceSetting: 1,
      priceGradient: [],
      singleReserve: 0,
      singlePrice: ''
    }
  },
  computed: {
    sellTypeOptions() {
      const sellType = this.personalCourseEnums.sell_type.value
      const options = []
      for (let i in sellType) {
        options.push({
          label: sellType[i],
          value: +i
        })
      }
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
      this.form.validateFields().then(() => {
        // if (!this.inputCheck(this.priceGradient)) {
        //   return
        // }
        this.addService.setPrice(data).subscribe(this.onSaveSuccess)
      })
    },
    onSaveSuccess() {
      this.messageService.success({
        content: '提交成功'
      })
      this.$router.push({
        name: 'shop-product-course-manage-personal-list'
      })
    },
    onChange(e) {
      this.priceSetting = e.target.value
    },
    inputCheck(priceGradient) {
      let ret = true
      for (let i = 0; i < priceGradient.length; i++) {
        let retIn = false
        for (let j in priceGradient[i]) {
          if (priceGradient[i][j] === undefined || priceGradient[i][j] === '') {
            retIn = true
          }
        }
        if (retIn) {
          ret = false
          this.messageService.error({
            content: `第${i + 1}行课程定价输入有误`
          })
          break
        }
      }
      return ret
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
      console.log('price gradient changed', priceGradient)
      this.priceGradient = priceGradient
    },
    onSingleReserveChange() {
      this.singleReserve = +!this.singleReserve
    }
  }
}
</script>
