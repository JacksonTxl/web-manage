<template>
  <div>
    <calendar
      @get-table="onGetTable"
      @detail="onDetail"
      @add="onAddSchedule"
      :authAdd="auth.add"
      fixed
      :cardList="cardList"
      :startDate="startDate"
    >
      <div slot="toolbar-left">
        <st-button
          type="primary"
          class="mg-r12"
          @click="onClickScheduleInBatch"
          v-if="auth.addBatch"
        >
          排课
        </st-button>
        <st-button @click="onClickScheduleInBatch" v-if="auth.addBatch">
          批量修改
        </st-button>
      </div>
    </calendar>
  </div>
</template>

<script>
import Calendar from '@/views/biz-components/schedule/calendar'
import { MiniTeamScheduleScheduleService } from '@/views/pages/shop/product/course/schedule/mini-team/service#/schedule.service'

// 添加排期
import ScheduleMiniTeamAddCourse from '@/views/biz-modals/schedule/mini-team/add-course'
// 详情
import ScheduleMiniTeamReserveInfo from '@/views/biz-modals/schedule/mini-team/reserve-info'

import { MiniTeamService } from './mini-team.service'
export default {
  name: 'TeamSchedule',
  modals: {
    ScheduleMiniTeamAddCourse,
    ScheduleMiniTeamReserveInfo
  },
  serviceInject() {
    return {
      miniTeamSchduleService: MiniTeamScheduleScheduleService,
      service: MiniTeamService
    }
  },
  rxState() {
    return {
      auth: this.service.auth$,
      cardList: this.miniTeamSchduleService.scheduleTeamCourseList$
    }
  },
  components: {
    Calendar
  },
  data() {
    return {
      cardList: [
        {
          id: 2,
          start_date: '2019-12-18',
          start_time: '04:12',
          end_time: '04:12',
          course_name: '小班课测试',
          current_course_name: '小班课测试',
          reserved_num: 1,
          coach_name: '姓名2',
          court_site_name: '场地'
        }
      ]
    }
  },
  computed: {
    startDate() {
      return this.$searchQuery.start_date || moment().format('YYYY-MM-DD')
    }
  },
  created() {
    console.log(this.cardList)
  },
  methods: {
    onMouseLeave() {
      console.log('onMouseLeave')
    },
    // 添加课程排期 - 弹出详情
    onAddSchedule(date) {
      console.log(date)
      this.$modalRouter.push({
        name: 'schedule-mini-team-reserve-info',
        props: { time: date },
        on: {
          ok: res => {
            console.log('ok')
            this.onScheduleChange()
          }
        }
      })
    },
    // 查看详情
    onDetail(info) {
      console.log(info)
      this.$modalRouter.push({
        name: 'schedule-mini-team-reserve-info',
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
    // 排课-批量修改
    onClickScheduleInBatch() {
      this.$router.push({
        path: '/shop/product/course/mini-schedule/inbatch-add',
        query: {
          // activity_id: this.stepForm.activity_id
        }
        // on: {
        //   ok: res => {
        //     this.onScheduleChange()
        //   }
        // }
      })
    },
    // 进入表格模式
    onGetTable() {
      this.$router.push({
        name: 'shop-product-course-schedule-team-team-table',
        query: this.$searchQuery
      })
    },
    // 刷新页面
    onScheduleChange() {
      this.$router.push({ query: this.$searchQuery })
    }
  }
}
</script>
