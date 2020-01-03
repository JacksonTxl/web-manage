<template>
  <st-form :form="form" class="page-shop-container">
    <a-row :gutter="8">
      <a-col :lg="10" :offset="1">
        <st-form-item>
          <template slot="label">
            {{ $c('small_course') }}名称
          </template>
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
          <a-select
            placeholder="请输入负责人"
            v-decorator="decorators.staff_id"
          >
            <a-select-option
              v-for="item in staffList"
              :key="item.id"
              :value="item.id"
            >
              {{ item.nickname }}
            </a-select-option>
          </a-select>
        </st-form-item>
      </a-col>
      <a-col :lg="20" :offset="1">
        <st-form-item>
          <template slot="label">
            上课{{ $c('coach') }}
            <st-help-tooltip id="TSXBK004" />
          </template>
          <div class="page-shop-coach-container-coach">
            <input type="hidden" v-decorator="decorators.coach_ids" />
            <select-coach
              :coachIds="info.coach.coach_ids"
              @change="onSelectCoachChange"
            ></select-coach>
          </div>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="10">
      <a-col :lg="10" :xs="10" :offset="1">
        <st-form-item labelFix>
          <st-button class="mg-r16" @click="onClickBack">
            上一步
          </st-button>
          <st-button type="primary" @click="save" :loading="loading.setCoach">
            保存，开始设置售卖信息
          </st-button>
        </st-form-item>
      </a-col>
    </a-row>
  </st-form>
</template>
<script>
import { EditService } from '../edit.service'
import { MessageService } from '@/services/message.service'
import { UserService } from '@/services/user.service'
import { ruleOptions } from '../form.config'
import { PatternService } from '@/services/pattern.service'
import SelectCoach from '@/views/fragments/coach/select-coach'

export default {
  name: 'SetShopCoach',
  serviceInject() {
    return {
      editService: EditService,
      messageService: MessageService,
      userService: UserService,
      pattern: PatternService
    }
  },
  rxState() {
    return {
      loading: this.editService.loading$,
      staffList: this.editService.staffList$
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
    },
    info: {
      type: Object,
      default: () => {}
    }
  },
  created() {},
  mounted() {
    this.setFieldsValue()
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
  data(vm) {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators
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
        this.editService.setCoach(values).subscribe(() => {
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
    onClickBack() {
      this.$emit('back', 0)
    },
    setFieldsValue() {
      const info = this.info.coach
      this.form.setFieldsValue({
        course_name: info.course_name,
        staff_id: info.staff_id,
        coach_ids: info.coach_ids
      })
    }
  }
}
</script>
