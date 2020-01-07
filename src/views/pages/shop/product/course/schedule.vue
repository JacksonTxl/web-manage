<template>
  <st-panel class="page-schedule-st-panel st-panel--fixed" app :tabs="authTabs">
    <div
      slot="actions"
      v-if="
        routeName === 'shop-product-course-schedule-team-team' ||
          routeName === 'shop-product-course-schedule-team-team-table'
      "
    >
      <a-select
        v-model="$searchQuery.course_id"
        placeholder="请选择课程"
        @change="onChange"
        style="width: 200px"
        class="page-schedule__select mg-r8"
      >
        <a-select-option :value="-1">全部课程</a-select-option>
        <a-select-option
          v-for="course in courseOptions"
          :key="course.id"
          :value="course.id"
        >
          {{ course.course_name }}
        </a-select-option>
      </a-select>
      <a-select
        v-model="$searchQuery.court_id"
        placeholder="请选择场地"
        @change="onChange"
        style="width: 200px"
        class="page-schedule__select mg-r8"
      >
        <a-select-option :value="-1">全部场地</a-select-option>
        <a-select-option
          v-for="court in courtOptions"
          :key="court.id"
          :value="court.id"
        >
          {{ court.name }}
        </a-select-option>
      </a-select>
      <a-select
        class="page-schedule__select"
        :placeholder="`请选择${$c('coach')}`"
        @change="onChange"
        style="width: 200px"
        v-model="$searchQuery.coach_id"
      >
        <a-select-option :value="-1">全部{{ $c('coach') }}</a-select-option>
        <a-select-option
          v-for="coach in coachOptions"
          :key="coach.id"
          :value="coach.id"
        >
          {{ coach.staff_name }}
        </a-select-option>
      </a-select>
    </div>
    <div
      slot="actions"
      v-if="
        routeName === 'shop-product-course-schedule-personal-personal' ||
          routeName === 'shop-product-course-schedule-personal-personal-table'
      "
    >
      <a-select
        class="page-schedule__select"
        :placeholder="`请选择${$c('coach')}`"
        @change="onChange"
        style="width: 200px"
        v-model="$searchQuery.coach_id"
      >
        <a-select-option :value="-1">全部</a-select-option>
        <a-select-option
          v-for="coach in coachPersonalOptions"
          :key="coach.id"
          :value="coach.id"
        >
          {{ coach.staff_name }}
        </a-select-option>
      </a-select>
    </div>
    <div
      slot="actions"
      v-if="
        routeName ===
          'shop-product-course-schedule-personal-team-personal-team' ||
          routeName ===
            'shop-product-course-schedule-personal-team-personal-team-table'
      "
    >
      <a-select
        class="page-schedule__select"
        :placeholder="`请选择${$c('coach')}`"
        @change="onChange"
        style="width: 200px"
        v-model="$searchQuery.coach_id"
      >
        <a-select-option :value="-1">全部</a-select-option>
        <a-select-option
          v-for="coach in coachPersonalTeamOptions"
          :key="coach.id"
          :value="coach.id"
        >
          {{ coach.name }}
        </a-select-option>
      </a-select>
    </div>
    <div
      slot="actions"
      v-if="
        routeName ===
          'shop-product-course-schedule-small-course-small-course' ||
          routeName ===
            'shop-product-course-schedule-small-course-small-course-table'
      "
    >
      <a-select
        v-model="$searchQuery.course_id"
        placeholder="请选择课程"
        @change="onChange"
        style="width: 200px"
        class="page-schedule__select mg-r8"
      >
        <a-select-option :value="-1">全部课程</a-select-option>
        <a-select-option
          v-for="course in courseSmallCourseOptions"
          :key="course.course_id"
          :value="course.course_id"
        >
          {{ course.course_name }}
        </a-select-option>
      </a-select>
      <a-select
        class="page-schedule__select"
        :placeholder="`请选择${$c('coach')}`"
        @change="onChange"
        style="width: 200px"
        v-model="$searchQuery.coach_id"
      >
        <a-select-option :value="-1">全部{{ $c('coach') }}</a-select-option>
        <a-select-option
          v-for="coach in coachSmallCourseOptions"
          :key="coach.id"
          :value="coach.id"
        >
          {{ coach.staff_name }}
        </a-select-option>
      </a-select>
    </div>
    <router-view></router-view>
  </st-panel>
</template>

<script>
import { TeamScheduleCommonService } from './schedule/team/service#/common.service'
import { PersonalScheduleCommonService } from './schedule/personal/service#/common.service'
import { PersonalTeamScheduleCommonService } from './schedule/personal-team/service#/common.service'
import { SmallCourseScheduleCommonService } from './schedule/small-course/service#/common.service'
import { ScheduleService } from './schedule.service'
import ScheduleTeamEditSchedule from '@/views/biz-modals/schedule/team/edit-course'
export default {
  name: 'CourseSchedule',
  modals: {
    ScheduleTeamEditSchedule
  },
  serviceInject() {
    return {
      scheduleService: ScheduleService,
      teamScheduleCommonService: TeamScheduleCommonService,
      personalScheduleCommonService: PersonalScheduleCommonService,
      personalTeamScheduleCommonService: PersonalTeamScheduleCommonService,
      smallCourseScheduleCommonService: SmallCourseScheduleCommonService
    }
  },
  rxState() {
    const tss = this.teamScheduleCommonService
    const pscs = this.personalScheduleCommonService
    const ptscs = this.personalTeamScheduleCommonService
    const scsc = this.smallCourseScheduleCommonService
    return {
      coachOptions: tss.coachOptions$,
      courseOptions: tss.courseOptions$,
      courtOptions: tss.courtOptions$,
      coachInBatchOptions: pscs.coachInBatchOptions$,
      coachPersonalOptions: pscs.coachOptions$,
      courseCoachOptions: pscs.courseCoachOptions$,
      coachPersonalTeamOptions: ptscs.coachOptions$,
      courseSmallCourseOptions: scsc.courseSmallCourseOptions$,
      coachSmallCourseOptions: scsc.coachSmallCourseOptions$,
      authTabs: this.scheduleService.authTabs$
    }
  },
  data() {
    return {}
  },
  computed: {
    routeName() {
      return this.$route.name
    }
  },
  methods: {
    onChange() {
      this.$router.push({ query: this.$searchQuery })
    },
    onClickEdit() {
      this.$modalRouter.push({ name: 'schedule-team-edit-course' })
    }
  }
}
</script>
