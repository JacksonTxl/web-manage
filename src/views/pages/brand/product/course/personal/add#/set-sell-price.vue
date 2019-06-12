<template>
  <st-form :form="form" class="page-set-sell-price" labelWidth="100px">
    <a-row :gutter="8">
      <a-col :lg="10" :offset="1">
        <!-- 课程名称 -->
        <st-form-item label="私教课程">
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
        <st-form-item label="课有效期">
          <st-input-number v-decorator="ruleConfig.effectiveUnit">
            <template slot="addonAfter">天</template>
          </st-input-number>
        </st-form-item>
        <!-- 定价权限 -->
        <st-form-item label="定价权限" required>
          <a-radio-group @change="onChange" v-decorator="ruleConfig.priceSetting">
            <a-radio :value="1">品牌统一定价</a-radio>
            <a-radio :value="2">售卖场馆自主定价</a-radio>
          </a-radio-group>
        </st-form-item>
      </a-col>
    </a-row>

    <section v-if="isShowUnitSet">
      <set-price @change="onPriceGradientChange"/>
    </section>

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
      sellTypeOptions: [{
        label: '线下售卖',
        value: 1
      }, {
        label: '用户端售卖',
        value: 2
      }],
      priceGradient: []
    }
  },
  computed: {
    isShowUnitSet() {
      return this.priceSetting === 1
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
        console.log('step 3 data', data)
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
        name: 'brand-product-course-personal-list-brand'
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
      return data
    },
    onPriceGradientChange(priceGradient) {
      console.log('price gradient changed', priceGradient)
      this.priceGradient = priceGradient
    }
  }
}
</script>
