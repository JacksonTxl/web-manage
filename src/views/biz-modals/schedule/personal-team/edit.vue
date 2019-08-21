<template>
  <st-modal title="编辑课程排期" :footer="null" v-model="show" size="small">
    <st-form :form="form" labelWidth="54px">
      <st-form-item label="时间" required>
        <a-date-picker
          class="full-width"
          :showTime="{ format: 'HH:mm' }"
          :disabled="disabled"
          format="YYYY-MM-DD HH:mm"
          v-decorator="decorators.start_time"
        >
          <a-icon slot="suffixIcon" type="clock-circle" />
        </a-date-picker>
      </st-form-item>
      <st-form-item label="课程" required>
        <a-select
          v-decorator="decorators.course_id"
          :disabled="disabled"
          @change="onChangeGetCourseId"
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
        <a-select v-decorator="decorators.coach_id">
          <a-select-option
            v-for="coach in courseCoachOptions"
            :key="coach.id"
            :value="coach.id"
          >
            {{ coach.name }}
          </a-select-option>
        </a-select>
      </st-form-item>
      <st-form-item label="人数" required>
        <a-input-search :disabled="disabled" v-decorator="decorators.limit_num">
          <st-button slot="enterButton">人</st-button>
        </a-input-search>
      </st-form-item>
      <st-form-item label="课时费" required>
        <a-input-search
          :disabled="disabled"
          v-decorator="decorators.course_fee"
        >
          <st-button slot="enterButton">元/节</st-button>
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
import { ruleOptions } from './add.config'
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
      courseCoachOptions: commonService.courseCoachOptions$
    }
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      show: false
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
    },
    disabled() {
      return !!this.info.reserve.length
    }
  },
  created() {
    this.getUpdateInfo(this.id)
    this.commonService.getCourseCoachList(this.info.course_id).subscribe()
  },
  methods: {
    onChangeGetCourseId(id) {
      this.commonService.getCourseCoachList(id).subscribe()
    },
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
      this.form.validate().then(values => {
        const data = this.dataFilter(values)
        data.id = this.id
        this.scheduleService.update(data).subscribe(this.onSubmitSuccess)
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
      this.$emit('ok')
    }
  }
}
</script>
