<template>
  <st-form :form="form" class="page-shop-container">
    <a-row :gutter="8">
      <a-col :lg="22" :xs="22" :offset="1">
        <st-form-item label="课程名称">
          <a-input placeholder="课程名称" disabled v-decorator="ruleConfig.courseName"/>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="22" :xs="22" :offset="1">
        <st-form-item label="上课教练">
          <div class="page-shop-coach-container-coach">
            <input type="hidden" v-decorator="ruleConfig.coachIds">
            <select-coach :shopIds="shopIds" @change="onSelectCoachChange"></select-coach>
          </div>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item labelFix>
          <st-button type="primary" @click="save" :loading="loading.setShop">保存，继续设置售卖价格</st-button>
        </st-form-item>
      </a-col>
    </a-row>
  </st-form>
</template>
<script>
import { AddService } from '../add.service'
import { MessageService } from '@/services/message.service'
import SelectCoach from '@/views/fragments/coach/select-coach'
import { UserService } from '@/services/user.service'
import { RuleConfig } from '@/constants/course/rule'

export default {
  name: 'SetShopCoach',
  serviceInject() {
    return {
      addService: AddService,
      messageService: MessageService,
      userService: UserService,
      ruleConfig: RuleConfig
    }
  },
  rxState() {
    return {
      loading: this.addService.loading$,
      personalCourseEnums: this.userService.personalCourseEnums$
    }
  },
  components: {
    SelectCoach
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
  data() {
    return {
      form: this.$form.createForm(this),
      shopIds: []
    }
  },
  methods: {
    save(e) {
      e.preventDefault()
      this.form.validateFields().then(() => {
        const data = this.form.getFieldsValue()
        data.course_id = this.courseId
        this.addService.setShop(data).subscribe(() => {
          this.messageService.success({
            content: '提交成功'
          })
          this.$emit('goNext')
        })
      })
    },
    onSelectCoachChange(coachIds) {
      this.form.setFieldsValue({
        coach_ids: coachIds
      })
    },
    setFieldsValue() {
      const info = this.info
      this.form.setFieldsValue({
        course_name: info.course_name,
        course_category: info.course_category,
        train_aim: info.train_aim,
        duration: info.duration,
        is_online_sale: info.is_online_sale,
        price: info.price,
        effective_unit: info.effective_unit,
        image: info.image,
        description: info.description
      })
      this.fileList = [this.info.image]
    },
    getData() {
      const data = this.form.getFieldsValue()
      data.course_id = +this.query.id
      return data
    }
  }
}
</script>
