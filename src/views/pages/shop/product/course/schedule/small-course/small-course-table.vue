<template>
  <div class="page-team-table schedule-table">
    <div
      class="page-team-table__title pd-x24 pd-y16 schedule-table__title schedule-table__title--fixed"
      slot="title"
    >
      <div class="title__left">
        <st-button
          type="primary"
          class="mg-r12"
          @click="onClickScheduleInBatch"
          v-if="auth.eidt"
        >
          批量编辑
        </st-button>
      </div>
      <div class="title__center">
        <date
          @today="getTable"
          :start="$searchQuery.start_date"
          @pre="getTable"
          @next="getTable"
        />
      </div>
      <div class="title__right schedule-button">
        <a-radio-group
          :value="pageBtnFocusState"
          @change="handleSizeChange($event, 'page')"
        >
          <a-radio-button
            value="calendar"
            class="mg-l12"
            @click="onClickSkipSchedule"
          >
            <st-icon type="calendar"></st-icon>
          </a-radio-button>
          <a-radio-button value="list">
            <st-icon type="list"></st-icon>
          </a-radio-button>
        </a-radio-group>
      </div>
    </div>
    <div class="schedule-table__content">
      <a-card
        :title="card.date | filterStartTime"
        :key="card.date"
        v-for="card in scheduleTable"
        class="mg-l24 mg-r24"
      >
        <span
          slot="extra"
          class="add-schedule"
          @click="onAddSchedule(card.date)"
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
              <div class="course-name">
                {{ dealCourtName(info.course_name, info.current_course_name) }}
              </div>
              <div class="address">
                <div class="mg-r24">
                  <span class="label">场地：</span>
                  <span class="value">{{ info.court_name }}</span>
                </div>
                <div>
                  <span class="label">{{ $c('coach') }}：</span>
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
            </div>
          </a-col>
          <a-col :lg="2" :offset="7" class="action" @click="onDetail(info)">
            <a href="#">查看详情</a>
          </a-col>
        </a-row>
      </a-card>
    </div>
  </div>
</template>

<script>
import { SmallCourseScheduleService } from './service#/schedule.service'
import ScheduleSmallCourseAddCourse from '@/views/biz-modals/schedule/small-course/add-course'
import date from '@/views/biz-components/schedule/date#/date-component.vue'
import ScheduleSmallCourseReserveInfo from '@/views/biz-modals/schedule/small-course/reserve-info'
import { SmallCourseTableService } from './small-course-table.service'
export default {
  name: 'ScheduleSmallCourseTable',
  modals: {
    ScheduleSmallCourseAddCourse,
    ScheduleSmallCourseReserveInfo
  },
  serviceInject() {
    return {
      smallCourseScheduleService: SmallCourseScheduleService,
      service: SmallCourseTableService
    }
  },
  rxState() {
    return {
      auth: this.service.auth$,
      scheduleTable: this.smallCourseScheduleService.scheduleTable$
    }
  },
  data() {
    return {
      pageBtnFocusState: 'list'
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
  components: {
    date
  },
  methods: {
    dealCourtName(courseName, currentCourseName) {
      return currentCourseName
        ? courseName + '.' + currentCourseName
        : courseName
    },
    handleSizeChange(evt, type) {
      this.pageBtnFocusState = evt.target.value
    },
    onScheduleChange() {
      this.$router.push({ query: this.$searchQuery })
    },
    // 查看详情
    onDetail(info) {
      console.log(info)
      if (!this.auth.getInfo) {
        return
      }
      this.$modalRouter.push({
        name: 'schedule-small-course-reserve-info',
        props: {
          id: info.id
        },
        on: {
          ok: res => {
            this.onScheduleChange()
          }
        }
      })
    },
    // 添加小班课排期
    onAddSchedule(date) {
      if (!this.auth.add) {
        return
      }
      this.$modalRouter.push({
        name: 'schedule-small-course-add-course',
        props: { time: moment(date) },
        on: {
          ok: res => {
            this.onScheduleChange()
          }
        }
      })
    },
    // 排课-批量修改
    onClickScheduleInBatch() {
      this.$router.push({
        path: '/shop/product/course/mini-schedule/inbatch-add'
      })
    },
    onClickSkipSchedule() {
      this.$router.push({
        name: 'shop-product-course-schedule-small-course',
        query: this.$searchQuery
      })
    },
    getTable(val = {}) {
      const query = {
        ...this.$searchQuery,
        start_date: val.start_date,
        end_date: val.end_date
      }
      this.$router.push({ query })
    }
  }
}
</script>
