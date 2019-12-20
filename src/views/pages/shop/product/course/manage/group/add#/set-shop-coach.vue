<template>
  <st-form :form="form" class="page-shop-container">
    <st-form-item label="课程名称">
      <a-input
        placeholder="课程名称"
        disabled
        v-decorator="decorators.course_name"
      />
    </st-form-item>
    <st-form-item>
      <template slot="label">
        负责人
        <st-help-tooltip id="TSXBK003" />
      </template>
      <a-select placeholder="请输入负责人" v-decorator="decorators.staff_id">
        <a-select-option
          v-for="item in staffList"
          :key="item.id"
          :value="item.id"
        >
          {{ item.nickname }}
        </a-select-option>
      </a-select>
    </st-form-item>
    <st-form-item>
      <template slot="label">
        上课{{ $c('coach') }}
        <st-help-tooltip id="TSXBK004" />
      </template>
      <div class="page-shop-coach-container-coach">
        <input type="hidden" v-decorator="decorators.coach_ids" />
        <select-coach
          :shopIds="shopIds"
          @change="onSelectCoachChange"
        ></select-coach>
      </div>
    </st-form-item>

    <st-form-item labelFix>
      <st-button class="mg-r16" @click="save" :loading="loading.setShop">
        上一步
      </st-button>
      <st-button type="primary" @click="save" :loading="loading.setShop">
        保存，开始设置售卖信息
      </st-button>
    </st-form-item>
  </st-form>
</template>
<script>
import { AddService } from '../add.service'
import { MessageService } from '@/services/message.service'
import { UserService } from '@/services/user.service'
import { ruleOptions } from '../form.config'
import { PatternService } from '@/services/pattern.service'
import SelectCoach from '@/views/fragments/coach/select-coach'

export default {
  name: 'SetShopCoach',
  serviceInject() {
    return {
      addService: AddService,
      messageService: MessageService,
      userService: UserService,
      pattern: PatternService
    }
  },
  rxState() {
    return {
      loading: this.addService.loading$,
      staffList: this.addService.staffList$
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
  created() {},
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
  data(vm) {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      shopIds: [],
      fileList: []
    }
  },
  watch: {
    courseName(val) {
      this.form.setFieldsValue({
        course_name: val
      })
    }
  },
  methods: {
    save(e) {
      e.preventDefault()
      this.form.validateFields().then(values => {
        values.course_id = this.courseId
        this.addService.setCoach(values).subscribe(() => {
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
      data.course_id = +this.$searchQuery.id
      return data
    }
  }
}
</script>
