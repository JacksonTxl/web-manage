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
        <st-form-item label="转让设置">
          <a-input
            placeholder="转让设置"
            v-decorator="decorators.course_name"
          />
        </st-form-item>
        <st-form-item label="售卖方式">
          <a-input
            placeholder="售卖方式"
            v-decorator="decorators.course_name"
          />
        </st-form-item>
        <st-form-item label="开班时间" required>
          <a-range-picker
            :disabledDate="disabledDate"
            :showTime="{ format: 'HH:mm' }"
            format="YYYY-MM-DD HH:mm"
            v-decorator="decorators.scope_application"
          ></a-range-picker>
        </st-form-item>
        <st-form-item label="售卖价格" required>
          <a-input
            placeholder="支持输入1~30个字的课程名称"
            maxlength="30"
            v-decorator="decorators.course_name"
          />
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="10">
      <a-col :lg="10" :xs="10" :offset="1">
        <st-form-item labelFix>
          <st-button class="mg-r16" @click="save" :loading="loading.setShop">
            保存
          </st-button>
          <st-button type="primary" @click="save" :loading="loading.setShop">
            保存并发布
          </st-button>
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
import { ruleOptions } from '../form.config'
import { GradientService } from '@/views/fragments/course/personal#/gradient.service'
import { PatternService } from '@/services/pattern.service'

export default {
  name: 'SetSellPrice',
  serviceInject() {
    return {
      addService: AddService,
      messageService: MessageService,
      userService: UserService,
      gradientService: GradientService,
      pattern: PatternService
    }
  },
  rxState() {
    const user = this.userService
    return {
      loading: this.addService.loading$,
      personalCourseEnums: user.personalCourseEnums$
    }
  },
  components: {},
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
  data(vm) {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      fileList: []
    }
  },
  computed: {
    sellTypeOptions() {
      const sellType = this.personalCourseEnums.sell_type.value
      const options = []
      for (let i in sellType) {
        options.push({
          label: sellType[i],
          value: +i,
          disabled: +i === 2
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
        name: 'shop-product-course-manage-group-list'
      })
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
