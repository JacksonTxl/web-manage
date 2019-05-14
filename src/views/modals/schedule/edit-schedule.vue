<template>
  <st-modal title="编辑课程排期" @ok="save" v-model="show">
    <div><span>已约</span><span>{{reserved_num}}人</span></div>
    <st-form :form="form">
      <st-form-item label="时间" required>
        <a-date-picker showTime format="YYYY-MM-DD HH:mm" v-decorator="[
          'start_time',
          {rules: [{ required: true, message: 'Please input your note!' }]}
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
        <a-select @change="onChange" v-decorator="[
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
        @change="onChange"
        v-decorator="[
          'court_id',
          // {rules: [{ required: true, message: 'Please input your note!' }]}
        ]"/>
      </st-form-item>
      <st-form-item label="人数" required>
        <a-input-search v-decorator="[
          'limit_num',
          {rules: [{ required: true, message: 'Please input your note!' }]}
        ]"  @change="onChange"> <a-button slot="enterButton">人</a-button> </a-input-search>
      </st-form-item>
      <st-form-item label="课时费" required >
        <a-input-search v-decorator="[
          'course_fee',
          {rules: [{ required: true, message: 'Please input your note!' }]}]"
        @change="onChange"> <a-button slot="enterButton">元/节</a-button> </a-input-search>
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
import { ScheduleService } from './schedule.service.ts'
export default {
  name: 'EditCourseSchedule',
  serviceInject() {
    return {
      scheduleService: ScheduleService
    }
  },
  data() {
    return {
      coachOptions: [],
      courseOptions: [],
      courtOptions: [],
      reserved_num: 0,
      show: false,
      form: {}
    }
  },
  created() {
    this.form = this.$form.createForm(this)
    console.log(this.form)
  },
  mounted() {
    this.$nextTick().then(() => {
      this.form.setFieldsValue({ 'course_id': 23 })
    })
    this.scheduleService.initEditSchedule('28').subscribe(res => {
      let { course_id, coach_id, course_fee, court_id, court_site_id, start_time, reserved_num } = res.info
      start_time = moment(start_time)
      this.coachOptions = res.coachOptions
      this.courseOptions = res.courseOptions
      this.courtOptions = res.courtOptions
      this.reserved_num = reserved_num
    })
  },
  methods: {
    onSubmit() {
      // this.scheduleService
    },
    onClick() {
    },
    onChange() {
    },
    save() {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
