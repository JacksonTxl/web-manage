<template>
  <st-modal :footer="null" title="编辑课程排期" v-model="show">
    <div>
      <span>已约</span>
      <span>{{ reserved_num }}人</span>
    </div>
    <st-form :form="form">
      <st-form-item label="时间" required>
        <a-date-picker
          :showTime="{ format: 'HH:mm' }"
          placeholder="请选择时间"
          format="YYYY-MM-DD HH:mm"
          :disabled="!!reserved_num"
          v-decorator="[
            'start_time',
            { rules: [{ required: true, message: '请输入日期' }] }
          ]"
        >
          <a-icon slot="suffixIcon" type="clock-circle" />
        </a-date-picker>
      </st-form-item>
      <st-form-item label="课程" required>
        <a-select
          placeholder="请选择课程"
          :disabled="!!reserved_num"
          v-decorator="[
            'course_id',
            { rules: [{ required: true, message: '请选择课程' }] }
          ]"
        >
          <a-select-option
            v-for="course in courseOptions"
            :key="course.id"
            :value="course.id"
          >
            {{ course.course_name }}
          </a-select-option>
        </a-select>
      </st-form-item>
      <st-form-item label="教练" required>
        <a-select
          placeholder="请选择教练"
          v-decorator="[
            'coach_id',
            { rules: [{ required: true, message: '请选择教练' }] }
          ]"
        >
          <a-select-option
            v-for="coach in coachOptions"
            :key="coach.id"
            :value="coach.id"
          >
            {{ coach.staff_name }}
          </a-select-option>
        </a-select>
      </st-form-item>
      <st-form-item label="场地">
        <a-cascader
          placeholder="请选择场地"
          :disabled="!!reserved_num"
          :options="courtOptions"
          :fieldNames="{ label: 'name', value: 'id', children: 'children' }"
          v-decorator="['court_id']"
        />
      </st-form-item>
      <st-form-item label="人数" required>
        <a-input-search
          placeholder="请输入人数"
          :disabled="!!reserved_num"
          v-decorator="[
            'limit_num',
            { rules: [{ required: true, message: '请输入人数' }] }
          ]"
        >
          <a-button slot="enterButton">人</a-button>
        </a-input-search>
      </st-form-item>
      <st-form-item label="课时费" required>
        <a-input-search
          placeholder="请输入课时费"
          :disabled="!!reserved_num"
          v-decorator="[
            'course_fee',
            { rules: [{ required: true, message: '请选择课时费' }] }
          ]"
        >
          <a-button slot="enterButton">元/节</a-button>
        </a-input-search>
      </st-form-item>
      <a-row>
        <a-col :span="24" :style="{ textAlign: 'right' }">
          <st-button class="mg-r16" @click="onClick">取消</st-button>
          <st-button type="primary" :loading="loading.update" @click="onSubmit">
            确认
          </st-button>
        </a-col>
      </a-row>
    </st-form>
  </st-modal>
</template>

<script>
import { cloneDeep } from 'lodash-es'

import { TeamService } from '@/views/pages/shop/product/course/schedule/team/team.service'
import { TeamScheduleScheduleService } from '@/views/pages/shop/product/course/schedule/team/service#/schedule.service'
import { TeamScheduleCommonService } from '@/views/pages/shop/product/course/schedule/team/service#/common.service'
export default {
  name: 'EditCourseSchedule',
  serviceInject() {
    return {
      teamScheduleScheduleService: TeamScheduleScheduleService,
      teamScheduleCommonService: TeamScheduleCommonService,
      teamService: TeamService
    }
  },
  rxState() {
    const tss = this.teamScheduleCommonService
    return {
      loading: this.teamScheduleScheduleService.loading$,
      coachOptions: tss.coachOptions$,
      courseOptions: tss.courseOptions$,
      courtOptions: tss.courtOptions$
    }
  },
  data() {
    return {
      reserved_num: 0,
      show: false,
      form: {}
    }
  },
  props: {
    id: {
      type: Number,
      default: -1
    }
  },
  created() {
    this.form = this.$form.createForm(this)
    this.initOptions().subscribe()
  },
  mounted() {
    this.teamScheduleScheduleService.getUpdateInfo(this.id).subscribe(res => {
      let {
        id,
        course_id,
        coach_id,
        course_fee,
        court_id,
        court_site_id,
        start_time,
        reserved_num,
        limit_num
      } = res.info
      start_time = moment(start_time)
      court_id = [court_id, court_site_id]
      this.id = id
      this.form.setFieldsValue({
        course_id,
        coach_id,
        course_fee,
        court_id,
        start_time,
        limit_num
      })
      this.reserved_num = reserved_num
    })
  },
  methods: {
    initOptions() {
      return this.teamService.init()
    },
    onClick() {
      this.show = true
    },
    onSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          const form = cloneDeep(values)
          form.start_time = form.start_time.format('YYYY-MM-DD HH:mm')
          form.court_site_id = form.court_id[1]
          form.court_id = form.court_id[0]
          form.course_fee = +form.course_fee
          form.limit_num = +form.limit_num
          this.teamScheduleScheduleService
            .update({ id: this.id, ...form })
            .subscribe(() => {
              this.$emit('ok')
              this.show = false
            })
        }
      })
    }
  }
}
</script>
