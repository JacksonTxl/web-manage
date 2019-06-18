<template>
  <st-modal title="新增课程排期" :footer="null" v-model="show" size="484px">
    <st-form :form="form">
      <st-form-item label="时间" required>
        <a-date-picker showTime format="YYYY-MM-DD HH:mm" v-decorator="[
          'start_time',
          {rules: [{ required: true, message: 'Please input your note!'}], initialValue: time}
        ]">
          <a-icon slot="suffixIcon" type="clock-circle" />
        </a-date-picker>
      </st-form-item>
      <st-form-item label="课程" required>
        <a-select v-decorator="[
          'course_id',
          {rules: [{ required: true, message: 'Please input your note!' }]}
        ]">
          <a-select-option v-for="course in courseOptions" :key="course.id" :value="course.id">{{course.course_name}}</a-select-option>
        </a-select>
      </st-form-item>
      <st-form-item label="教练" required>
        <a-select v-decorator="[
          'coach_id',
          // {rules: [{ required: true, message: 'Please input your note!' }]}
        ]">
          <a-select-option v-for="coach in coachOptions" :key="coach.id" :value="coach.id">{{coach.staff_name}}</a-select-option>
        </a-select>
      </st-form-item>
      <st-form-item label="场地">
        <a-cascader
        :options="courtOptions"
        :fieldNames="{ label: 'name', value: 'id', children: 'children' }"
        v-decorator="[
          'court_id',
          // {rules: [{ required: true, message: 'Please input your note!' }]}
        ]"/>
      </st-form-item>
      <st-form-item label="人数" required>
        <a-input-search v-decorator="[
          'limit_num',
          {rules: [{ required: true, message: 'Please input your note!' }]}
        ]"> <a-button slot="enterButton">人</a-button> </a-input-search>
      </st-form-item>
      <st-form-item label="课时费" required >
        <a-input-search v-decorator="[
          'course_fee',
          {rules: [{ required: true, message: 'Please input your note!' }]}]"
        > <a-button slot="enterButton">元/节</a-button> </a-input-search>
      </st-form-item>
      <a-row>
        <a-col
          :span="24"
          :style="{ textAlign: 'right' }"
        >
          <st-button class="mg-r16" @click="onClick">批量设置</st-button>
          <st-button
            type="primary"
            @click="onSubmit">
            提交
          </st-button>
        </a-col>
      </a-row>
    </st-form>
  </st-modal>
</template>

<script>
import { cloneDeep } from 'lodash-es'
import { TeamScheduleScheduleService } from '../../../pages/shop/product/course/schedule/team.service#/schedule.service'
import { TeamScheduleCommonService } from '../../../pages/shop/product/course/schedule/team.service#/common.service'
export default {
  name: 'AddCourseSchedule',
  serviceInject() {
    return {
      teamScheduleCommomService: TeamScheduleCommonService,
      teamScheduleScheduleService: TeamScheduleScheduleService
    }
  },
  rxState() {
    const tss = this.teamScheduleCommomService
    return {
      coachOptions: tss.coachOptions$,
      courseOptions: tss.courseOptions$,
      courtOptions: tss.courtOptions$
    }
  },
  data() {
    return {
      show: false,
      form: this.$form.createForm(this)
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
  methods: {
    onSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          const form = cloneDeep(values)
          form.start_time = form.start_time.format('YYYY-MM-DD HH:mm')
          if (form.court_id) {
            form.court_site_id = form.court_id[1]
            form.court_id = form.court_id[0]
          }
          form.course_fee = parseInt(form.course_fee)
          form.limit_num = parseInt(form.limit_num)
          this.teamScheduleScheduleService.curd('add', { ...form }, () => {
            this.show = false
          })
        }
      })
    },
    onClick() {
      this.show = false
      this.$modalRouter.push({
        name: 'schedule-add-course-schedule-batch'
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
