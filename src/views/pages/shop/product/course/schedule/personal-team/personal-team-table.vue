<template>
  <div class="page-team-table schedule-table">
    <div
      class="page-team-table__title pd-x24 pd-y16 schedule-table__title"
      slot="title"
    >
      <div class="title__left">
        <st-button @click="onClickScheduleInBatch" class="mg-r8" type="primary">
          批量排期
        </st-button>
        <st-button @click="onClickCopySchedule">
          复制排期
        </st-button>
      </div>
      <div class="title__left">
        <date
          @today="getTable"
          :start="query.start_date"
          @pre="getTable"
          @next="getTable"
        />
      </div>
      <div class="title__left schedule-button">
        <st-button @click="onClickSkipSchedule">
          <st-icon type="calendar"></st-icon>
        </st-button>
      </div>
    </div>
    <a-card
      :title="card.date | filterStartTime"
      v-for="card in scheduleTable"
      :key="card.date"
      class="mg-l24 mg-r24 mg-t8"
    >
      <span
        href="javascript:;"
        slot="extra"
        class="add-schedule"
        v-modal-link="{ name: 'schedule-team-add-course' }"
      >
        + 添加课程排期
      </span>
      <a-row
        class="page-team-table__item"
        v-for="info in card.data"
        :key="info.id"
      >
        <a-col :lg="3" class="time">
          {{ info.start_time }} - {{ info.end_time }}
        </a-col>
        <a-col :lg="12" class="content">
          <div class="course-info">
            <div class="course-name">{{ info.course_name }}</div>
            <div class="address">
              <div class="mg-r24">
                <span class="label">场地：</span>
                <span class="value">{{ info.court_name }}</span>
              </div>
              <div>
                <span class="label">教练：</span>
                <span class="value">{{ info.coach_name }}</span>
              </div>
            </div>
          </div>
          <div :lg="5" :offset="3" class="reserve">
            <div class="mg-r24">
              <span class="label">签到：</span>
              <span class="value">{{ info.checkin_num }}人</span>
            </div>
            <div class="mg-r24">
              <span class="label">预约：</span>
              <span class="value">{{ info.reserved_num }}人</span>
            </div>
            <div>
              <span class="label">可约：</span>
              <span class="value">{{ info.reserve_max }}人</span>
            </div>
          </div>
        </a-col>
        <a-col
          :lg="2"
          :offset="7"
          class="action"
          v-modal-link="{
            name: 'schedule-personal-team-reserve-info',
            props: { id: info.id }
          }"
        >
          <a href="#">查看详情</a>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
import { PersonalTeamScheduleScheduleService } from '../personal-team/service#/schedule.service'
import { RouteService } from '@/services/route.service'
import date from '@/views/biz-components/schedule/date#/date-component.vue'
import SchedulePersonalTeamReserveInfo from '@/views/biz-modals/schedule/personal-team/reserve-info'
import ScheduleTeamAddCourseBatch from '@/views/biz-modals/schedule/team/add-course-batch'
import ScheduleTeamAddCourse from '@/views/biz-modals/schedule/team/add-course'
import ScheduleTeamCopySchedule from '@/views/biz-modals/schedule/team/copy-schedule'
export default {
  name: 'SchedulePersonalTeamTable',
  modals: {
    SchedulePersonalTeamReserveInfo,
    ScheduleTeamAddCourseBatch,
    ScheduleTeamAddCourse,
    ScheduleTeamCopySchedule
  },
  serviceInject() {
    return {
      scheduleService: PersonalTeamScheduleScheduleService,
      routeService: RouteService
    }
  },
  components: {
    date
  },
  rxState() {
    console.log(this.scheduleService)
    return {
      scheduleTable: this.scheduleService.scheduleTable$,
      query: this.routeService.query$
    }
  },
  filters: {
    filterStartTime(val) {
      const weekday = moment(val)
        .format('ddd')
        .valueOf()
      const MMDD = moment(val)
        .format('MM-DD')
        .valueOf()
      return `${MMDD} ${weekday}`
    }
  },
  methods: {
    // 刷新页面
    onScheduleChange() {
      this.$router.push({ query: this.query, force: true })
    },
    onClickScheduleInBatch() {
      this.$modalRouter.push({
        name: 'schedule-personal-team-add-in-batch',
        on: {
          ok: res => {
            this.onScheduleChange()
          }
        }
      })
    },
    // 复制排期
    onClickCopySchedule() {
      this.$modalRouter.push({
        name: 'schedule-personal-team-copy',
        on: {
          ok: res => {
            this.onScheduleChange()
          }
        }
      })
    },
    onClickSkipSchedule() {
      this.$router.push({
        name: 'shop-product-course-schedule-personal-team',
        query: { ...this.query }
      })
    },
    getTable(val = {}) {
      const query = {
        ...this.query,
        start_date: val.start_date,
        end_date: val.end_date
      }
      this.$router.push({ query })
    }
  }
}
</script>
