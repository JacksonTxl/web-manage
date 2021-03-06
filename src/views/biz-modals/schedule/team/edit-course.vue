<template>
  <st-modal :footer="null" title="编辑课程排期" v-model="show">
    <div>
      <span>已约</span>
      <span>{{ reserved_num }}人</span>
    </div>
    <st-form :form="form" labelAuto>
      <st-form-item label="时间" required>
        <a-date-picker
          :showTime="{ format: 'HH:mm' }"
          placeholder="请选择时间"
          format="YYYY-MM-DD HH:mm"
          :disabled="disabled"
          v-decorator="decorators.start_time"
        >
          <a-icon slot="suffixIcon" type="clock-circle" />
        </a-date-picker>
      </st-form-item>
      <st-form-item label="课程" required>
        <a-select
          placeholder="请选择课程"
          :disabled="disabled"
          v-decorator="decorators.course_id"
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
      <st-form-item :label="$c('coach')" required>
        <a-select
          :placeholder="`请选择${$c('coach')}`"
          v-decorator="decorators.coach_id"
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
          v-decorator="decorators.court_id"
        />
      </st-form-item>
      <st-form-item label="人数" required>
        <a-input-search
          placeholder="请输入人数"
          :disabled="disabled"
          v-decorator="decorators.limit_num"
        >
          <a-button slot="enterButton">人</a-button>
        </a-input-search>
      </st-form-item>
      <st-form-item label="课时费" required>
        <a-input-search
          placeholder="请输入课时费"
          :disabled="disabled"
          float
          v-decorator="decorators.course_fee"
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
import { ruleOptions } from './add-course.config'
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
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      reserved_num: 0,
      show: false
    }
  },
  computed: {
    disabled() {
      return !!this.reserved_num
    }
  },
  props: {
    id: {
      type: Number,
      default: -1
    }
  },
  created() {
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
      this.show = false
    },
    onSubmit() {
      this.form.validate().then(values => {
        values.start_time = values.start_time.format('YYYY-MM-DD HH:mm')
        values.court_site_id = values.court_id[1]
        values.court_id = values.court_id[0]
        values.course_fee = +values.course_fee
        values.limit_num = +values.limit_num
        this.teamScheduleScheduleService
          .update({ id: this.id, ...values })
          .subscribe(() => {
            this.$emit('ok')
            this.show = false
          })
      })
    }
  }
}
</script>
