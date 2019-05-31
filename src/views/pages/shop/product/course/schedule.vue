<template>
  <st-panel class="page-schedule-st-panel" app :tabs="tabs">
  <!-- <section>
    <modal-link :to="{name: 'schedule-team-add-course-schedule'}"><st-button>新增课程排期</st-button></modal-link>
    <modal-link :to="{name: 'schedule-team-add-course-schedule-batch'}"><st-button>批量新增课程排期</st-button></modal-link>
    <modal-link :to="{name: 'schedule-team-copy-schedule'}"><st-button>复制排期</st-button></modal-link>
    <st-button  @click="onClickEdit" >修改排期</st-button>
    <modal-link :to="{name: 'schedule-team-reserve-info'}"><st-button>预约详情</st-button></modal-link>
  </section> -->
  <div slot="actions" v-if="routeName === 'shop-product-course-schedule-team-calendar'">
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
  <div slot="actions" v-if="routeName === 'shop-product-course-schedule-personal-calendar' ">
    <a-select class="page-schedule__select" placeholder="请选择教练" @change="onChange" v-model="query.coach_id">
      <a-select-option :value="-1">全部</a-select-option>
      <a-select-option v-for="coach in courseCoachOptions" :key="coach.id" :value="coach.id">{{coach.staff_name}}</a-select-option>
    </a-select>
  </div>
  <div slot="actions" v-if="routeName === 'shop-product-course-schedule-personal-team-calendar' ">
    <a-select class="page-schedule__select" placeholder="请选择教练" @change="onChange" v-model="query.coach_id">
      <a-select-option :value="-1">全部</a-select-option>
      <a-select-option v-for="coach in courseCoachOptions" :key="coach.id" :value="coach.id">{{coach.staff_name}}</a-select-option>
    </a-select>
  </div>
  <router-view style=""></router-view>
</st-panel>
</template>

<script>
import { TeamScheduleCommonService } from './schedule/team.service#/common.service'
import { RouteService } from '../../../../../services/route.service'
import { PersonalScheduleCommonService } from './schedule/personal.service#/common.service'
export default {
  name: 'CourseSchedule',
  serviceInject() {
    return {
      teamScheduleCommonService: TeamScheduleCommonService,
      personalScheduleCommonService: PersonalScheduleCommonService,
      routeService: RouteService
    }
  },
  rxState() {
    const tss = this.teamScheduleCommonService
    const pscs = this.personalScheduleCommonService
    return {
      query: this.routeService.query$,
      coachOptions: tss.coachOptions$,
      courseCoachOptions: pscs.courseCoachOptions$,
      courseOptions: tss.courseOptions$,
      courtOptions: tss.courtOptions$
    }
  },
  data() {
    return {
      tabs: [
        { label: '团操课', route: { name: 'shop-product-course-schedule-team-calendar' } },
        { label: '私教课1v1', route: { name: 'shop-product-course-schedule-personal-calendar' } },
        { label: '私教小团课', route: { name: 'shop-product-course-schedule-personal-team-calendar' } }
      ]
    }
  },
  computed: {
    routeName() {
      return this.$route.name
    }
  },
  methods: {
    onSearchCourseName() {
      console.log('dasd')
    },
    onChange() {
      this.$router.push({ query: this.query })
    },
    onClickEdit() {
      this.$modalRouter.push({ name: 'schedule-team-edit-schedule' })
    }
  }
}
</script>
