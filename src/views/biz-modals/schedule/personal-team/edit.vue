<template>
  <st-modal title="编辑课程排期" :footer="null" v-model="show" size="small">
    <st-form :form="form" labelWidth="54px">
      <st-form-item label="时间" required>
        <a-date-picker
          class="full-width"
          :showTime="{ format: 'HH:mm' }"
          :disabled="info.reserved_num"
          format="YYYY-MM-DD HH:mm"
          v-decorator="formRules.startTime"
        >
          <a-icon slot="suffixIcon" type="clock-circle" />
        </a-date-picker>
      </st-form-item>
      <st-form-item label="课程" required>
        <a-select
          v-decorator="formRules.courseId"
          :disabled="info.reserved_num"
        >
          <a-select-option
            v-for="course in courseOptions"
            :key="course.id"
            :value="course.id"
          >
            {{ course.name }}
          </a-select-option>
        </a-select>
      </st-form-item>
      <st-form-item label="教练" required>
        <a-select v-decorator="formRules.coachId">
          <a-select-option
            v-for="coach in coachOptions"
            :key="coach.id"
            :value="coach.id"
          >
            {{ coach.name }}
          </a-select-option>
        </a-select>
      </st-form-item>
      <st-form-item label="人数" required>
        <a-input-search
          :disabled="info.reserved_num"
          v-decorator="formRules.limitNum"
        >
          <a-button slot="enterButton">人</a-button>
        </a-input-search>
      </st-form-item>
      <st-form-item label="课时费" required>
        <a-input-search
          :disabled="info.reserved_num"
          v-decorator="formRules.courseFee"
        >
          <a-button slot="enterButton">元/节</a-button>
        </a-input-search>
      </st-form-item>
      <div class="ta-r">
        <st-button @click="cancel">取消</st-button>
        <st-button class="mg-l8" type="primary" @click="onSubmit">
          确认
        </st-button>
      </div>
    </st-form>
  </st-modal>
</template>

<script>
import { MessageService } from '@/services/message.service'
import { PersonalTeamScheduleScheduleService as ScheduleService } from '@/views/pages/shop/product/course/schedule/personal-team/service#/schedule.service'
import { PersonalTeamScheduleCommonService as CommonService } from '@/views/pages/shop/product/course/schedule/personal-team/service#/common.service'
const formRules = {
  startTime: [
    'start_time',
    {
      rules: [
        {
          required: true,
          message: '请选择课程开始时间'
        }
      ]
    }
  ],
  courseId: [
    'course_id',
    {
      rules: [
        {
          required: true,
          message: '请选择课程'
        }
      ]
    }
  ],
  coachId: [
    'coach_id',
    {
      rules: [
        {
          required: true,
          message: '请选择教练'
        }
      ]
    }
  ],
  limitNum: [
    'limit_num',
    {
      rules: [
        {
          required: true,
          message: '请输入人数'
        }
      ]
    }
  ],
  courseFee: [
    'course_fee',
    {
      rules: [
        {
          required: true,
          message: '请输入课时费'
        }
      ]
    }
  ]
}
export default {
  name: 'AddCourseSchedule',
  serviceInject() {
    return {
      messageService: MessageService,
      scheduleService: ScheduleService,
      commonService: CommonService
    }
  },
  rxState() {
    const commonService = this.commonService
    return {
      courseOptions: commonService.courseOptions$,
      coachOptions: commonService.coachOptions$
    }
  },
  data() {
    return {
      show: false,
      form: this.$form.createForm(this),
      formRules
    }
  },
  props: {
    info: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    id() {
      return this.info.id
    }
  },
  created() {
    this.getUpdateInfo(this.id)
  },
  methods: {
    getUpdateInfo(id) {
      this.scheduleService.getUpdateInfo(id).subscribe(res => {
        const info = { ...res.info }
        info.start_time = moment(info.start_time)
        this.setFieldsValue(info, [
          'start_time',
          'course_id',
          'coach_id',
          'limit_num',
          'course_fee'
        ])
      })
    },
    setFieldsValue(info, keys) {
      const data = {}
      keys.forEach(key => {
        data[key] = info[key]
      })
      this.form.setFieldsValue(data)
    },
    onSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          const data = this.dataFilter(values)
          data.id = this.id
          this.scheduleService.update(data).subscribe(this.onSubmitSuccess)
        }
      })
    },
    cancel() {
      this.show = false
    },
    dataFilter(data) {
      data.start_time = data.start_time.format('YYYY-MM-DD HH:mm')
      return data
    },
    onSubmitSuccess() {
      this.show = false
      this.messageService.success({
        content: '修改成功'
      })
      this.$emit('ok')
    }
  }
}
</script>
