<template>
  <st-modal title="新增课程排期" :footer="null" v-model="show" width="484px">
    <st-form :form="form">
      <st-form-item label="时间" required>
        <a-date-picker
          placeholder="请选择时间"
          :showTime="{ format: 'HH:mm' }"
          format="YYYY-MM-DD HH:mm"
          v-decorator="decorators.start_time"
        >
          <a-icon slot="suffixIcon" type="clock-circle" />
        </a-date-picker>
      </st-form-item>
      <st-form-item label="课程" required>
        <a-select placeholder="请选择课程" v-decorator="decorators.course_id">
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
        <a-select placeholder="请选择教练" v-decorator="decorators.coach_id">
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
          :options="courtOptions"
          :fieldNames="{ label: 'name', value: 'id', children: 'children' }"
          v-decorator="decorators.court_id"
        />
      </st-form-item>
      <st-form-item label="人数" required>
        <a-input-search
          placeholder="请输入人数"
          v-decorator="decorators.limit_num"
        >
          <a-button slot="enterButton">人</a-button>
        </a-input-search>
      </st-form-item>
      <st-form-item label="课时费" required>
        <a-input-search
          placeholder="请输入课时费"
          v-decorator="decorators.course_fee"
        >
          <a-button slot="enterButton">元/节</a-button>
        </a-input-search>
      </st-form-item>
      <a-row>
        <a-col :span="24" :style="{ textAlign: 'right' }">
          <st-button class="mg-r16" @click="onClick">批量设置</st-button>
          <st-button type="primary" :loading="loading.add" @click="onSubmit">
            提交
          </st-button>
        </a-col>
      </a-row>
    </st-form>
  </st-modal>
</template>

<script>
import { cloneDeep } from 'lodash-es'
import { TeamScheduleScheduleService } from '@/views/pages/shop/product/course/schedule/team/service#/schedule.service'
import { TeamScheduleCommonService } from '@/views/pages/shop/product/course/schedule/team/service#/common.service'
import { RouteService } from '@/services/route.service'
import { TeamService } from '@/views/pages/shop/product/course/schedule/team/team.service'
import ScheduleTeamAddCourseBatch from '@/views/biz-modals/schedule/team/add-course-batch'
import { ruleOptions } from './add-course.config'
export default {
  name: 'AddCourseSchedule',
  modals: {
    ScheduleTeamAddCourseBatch
  },
  serviceInject() {
    return {
      teamScheduleCommomService: TeamScheduleCommonService,
      teamScheduleScheduleService: TeamScheduleScheduleService,
      routeService: RouteService,
      teamService: TeamService
    }
  },
  rxState() {
    const tss = this.teamScheduleCommomService
    return {
      loading: this.teamScheduleScheduleService.loading$,
      query: this.routeService.query$,
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
      show: false
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
  created() {
    this.initOptions().subscribe()
  },
  methods: {
    initOptions() {
      return this.teamService.init()
    },
    onSubmit() {
      this.form.validate().then(values => {
        const form = cloneDeep(values)
        form.start_time = form.start_time.format('YYYY-MM-DD HH:mm')
        if (form.court_id) {
          form.court_site_id = +form.court_id[1]
          form.court_id = +form.court_id[0]
        }
        form.course_fee = form.course_fee
        form.limit_num = form.limit_num
        this.teamScheduleScheduleService.add(form).subscribe(() => {
          this.$emit('ok')
          this.show = false
        })
      })
    },
    onClick() {
      this.show = false
      this.$modalRouter.push({
        name: 'schedule-team-add-course-batch',
        on: {
          ok: res => {
            this.onScheduleChange()
          }
        }
      })
    },
    onScheduleChange() {
      this.$router.push({ query: this.query, force: true })
    }
  }
}
</script>
