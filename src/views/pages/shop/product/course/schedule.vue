<template>
  <st-panel class="page-schedule-st-panel" app :tabs="authTabs">
    {{authTabs}}
  <div slot="actions" v-if="routeName === 'shop-product-course-schedule-team' || routeName === 'shop-product-course-schedule-team-table'">
    <a-select v-model="query.course_id" placeholder="请选择课程" @change="onChange" class="page-schedule__select mg-r8">
      <a-select-option :value="-1">全部</a-select-option>
      <a-select-option v-for="course in courseOptions" :key="course.id" :value="course.id">{{course.course_name}}</a-select-option>
    </a-select>
    <a-select  v-model="query.court_id" placeholder="请选择场地" @change="onChange" class="page-schedule__select mg-r8">
      <a-select-option :value="-1">全部</a-select-option>
      <a-select-option v-for="court in courtOptions" :key="court.id" :value="court.id">{{court.name}}</a-select-option>
    </a-select>
    <a-select class="page-schedule__select" placeholder="请选择教练" @change="onChange" v-model="query.coach_id">
      <a-select-option :value="-1">全部</a-select-option>
      <a-select-option v-for="coach in coachOptions" :key="coach.id" :value="coach.id">{{coach.staff_name}}</a-select-option>
    </a-select>
  </div>
  <div slot="actions" v-if="routeName === 'shop-product-course-schedule-personal-personal' || routeName === 'shop-product-course-schedule-personal-personal-reserve-table'">
    <a-select class="page-schedule__select" placeholder="请选择教练" @change="onChange" v-model="query.coach_id">
      <a-select-option :value="-1">全部</a-select-option>
      <a-select-option v-for="coach in coachInBatchOptions" :key="coach.id" :value="coach.id">{{coach.staff_name}}</a-select-option>
    </a-select>
  </div>
  <div slot="actions" v-if="routeName === 'shop-product-course-schedule-personal-team--personal-team'
  || routeName === 'shop-product-course-schedule--personal-team-personal-team-table'">
    <a-select class="page-schedule__select" placeholder="请选择教练" @change="onChange" v-model="query.coach_id">
      <a-select-option :value="-1">全部</a-select-option>
      <a-select-option v-for="coach in coachPersonalTeamOptions" :key="coach.id" :value="coach.id">{{coach.name}}</a-select-option>
    </a-select>
  </div>
  <router-view></router-view>
</st-panel>
</template>

<script>
import { TeamScheduleCommonService } from './schedule/team.service#/common.service'
import { PersonalScheduleCommonService } from './schedule/personal.service#/common.service'
import { RouteService } from '../../../../../services/route.service'
import { PersonalTeamScheduleCommonService } from './schedule/personal-team.service#/common.service'
import { ScheduleService } from './schedule.service'
export default {
  name: 'CourseSchedule',
  serviceInject() {
    return {
      scheduleService: ScheduleService,
      teamScheduleCommonService: TeamScheduleCommonService,
      personalScheduleCommonService: PersonalScheduleCommonService,
      personalTeamScheduleCommonService: PersonalTeamScheduleCommonService,
      routeService: RouteService
    }
  },
  rxState() {
    const tss = this.teamScheduleCommonService
    const pscs = this.personalScheduleCommonService
    const ptscs = this.personalTeamScheduleCommonService
    return {
      query: this.routeService.query$,
      coachOptions: tss.coachOptions$,
      courseOptions: tss.courseOptions$,
      courtOptions: tss.courtOptions$,
      coachInBatchOptions: pscs.coachInBatchOptions$,
      coachPersonalOptions: pscs.coachOptions$,
      courseCoachOptions: pscs.courseCoachOptions$,
      coachPersonalTeamOptions: ptscs.coachOptions$,
      authTabs: this.scheduleService.authTabs$
    }
  },
  data() {
    return {
      tabs: [
        { label: '团操课', route: { name: 'shop-product-course-schedule-team' } },
        { label: '私教课1v1', route: { name: 'shop-product-course-schedule-personal' } },
        { label: '私教小团课', route: { name: 'shop-product-course-schedule-personal-team' } }
      ]
    }
  },
  computed: {
    routeName() {
      return this.$route.name
    }
  },
  methods: {
    onChange() {
      this.$router.push({ query: this.query })
    },
    onClickEdit() {
      this.$modalRouter.push({ name: 'schedule-team-edit-schedule' })
    }
  }
}
</script>
