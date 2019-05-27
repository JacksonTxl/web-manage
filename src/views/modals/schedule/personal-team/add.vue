<template>
  <st-modal
    title="新增课程排期"
    :footer="null"
    v-model="show"
    size="small"
  >
    <st-form :form="form" labelWidth="54px">
      <st-form-item label="时间" required>
        <a-date-picker
          class="full-width" showTime format="YYYY-MM-DD HH:mm"
          v-decorator="formRules.startTime">
          <a-icon slot="suffixIcon" type="clock-circle" />
        </a-date-picker>
      </st-form-item>
      <st-form-item label="课程" required>
        <a-select v-decorator="formRules.courseId">
          <a-select-option
            v-for="course in courseOptions"
            :key="course.id"
            :value="course.id"
          >
            {{course.name}}
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
            {{coach.name}}
          </a-select-option>
        </a-select>
      </st-form-item>
      <st-form-item label="人数" required>
        <a-input-search v-decorator="formRules.limitNum">
          <a-button slot="enterButton">人</a-button>
        </a-input-search>
      </st-form-item>
      <st-form-item label="课时费" required >
        <a-input-search v-decorator="formRules.courseFee"
        > <a-button slot="enterButton">元/节</a-button> </a-input-search>
      </st-form-item>
      <div class="ta-r">
        <st-button @click="addInBatch">批量设置</st-button>
        <st-button
          class="mg-l8"
          type="primary"
          @click="onSubmit"
        >
          提交
        </st-button>
      </div>
    </st-form>
  </st-modal>
</template>

<script>
import { MessageService } from '@/services/message.service'
import {
  PersonalTeamScheduleScheduleService as ScheduleService
} from '@/views/pages/shop/product/course/schedule/personal-team.service#/schedule.service'
import {
  PersonalTeamScheduleCommonService as CommonService
} from '@/views/pages/shop/product/course/schedule/personal-team.service#/common.service'
const formRules = {
  startTime: [
    'start_time',
    {
      rules: [{
        required: true,
        message: '请选择课程开始时间'
      }]
    }
  ],
  courseId: [
    'course_id',
    {
      rules: [{
        required: true,
        message: '请选择课程'
      }]
    }
  ],
  coachId: [
    'coach_id',
    {
      rules: [{
        required: true,
        message: '请选择教练'
      }]
    }
  ],
  limitNum: [
    'limit_num',
    {
      rules: [{
        required: true,
        message: '请输入人数'
      }]
    }
  ],
  courseFee: [
    'course_fee',
    {
      rules: [{
        required: true,
        message: '请输入课时费'
      }]
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
    time: {
      type: Object,
      default: () => {
        return moment()
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initStartTime()
    })
  },
  methods: {
    initStartTime() {
      this.form.setFieldsValue({
        start_time: this.time
      })
    },
    onSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          const data = this.dataFilter(values)
          this.scheduleService.add(data).subscribe(this.onSubmitSuccess)
        }
      })
    },
    addInBatch() {
      this.show = false
      this.$modalRouter.push({
        name: 'schedule-personal-team-add-in-batch'
      })
    },
    dataFilter(data) {
      data.start_time = data.start_time.format('YYYY-MM-DD HH:mm')
      return data
    },
    onSubmitSuccess() {
      this.show = false
      this.messageService.success({
        content: '添加成功'
      })
      this.$emit('ok')
    }
  }
}
</script>
