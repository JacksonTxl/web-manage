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
          批量排期
        </st-button>
        <st-button @click="onClickCopySchedule" v-if="auth.copy">
          复制排期
        </st-button>
      </div>
    </calendar>
  </div>
</template>

<script>
import Calendar from '@/views/biz-components/schedule/calendar'
import { TeamScheduleScheduleService } from '@/views/pages/shop/product/course/schedule/team/service#/schedule.service'
import ScheduleTeamAddCourseBatch from '@/views/biz-modals/schedule/team/add-course-batch'
import ScheduleTeamCourseManage from '@/views/biz-modals/schedule/team/course-manage'
import ScheduleTeamAddEditCourse from '@/views/biz-modals/schedule/team/add-edit-course'
import ScheduleTeamAddCourse from '@/views/biz-modals/schedule/team/add-course'
import ScheduleTeamCopySchedule from '@/views/biz-modals/schedule/team/copy-schedule'
import ScheduleTeamReserveInfo from '@/views/biz-modals/schedule/team/reserve-info'
import { TeamService } from './team.service'
export default {
  name: 'TeamSchedule',
  modals: {
    ScheduleTeamAddCourseBatch,
    ScheduleTeamAddCourse,
    ScheduleTeamCopySchedule,
    ScheduleTeamReserveInfo,
    ScheduleTeamCourseManage,
    ScheduleTeamAddEditCourse
  },
  serviceInject() {
    return {
      teamSchduleService: TeamScheduleScheduleService,
      service: TeamService
    }
  },
  rxState() {
    return {
      auth: this.service.auth$,
      cardList: this.teamSchduleService.scheduleTeamCourseList$
    }
  },
  components: {
    Calendar
  },
  data() {
    return {}
  },
  computed: {
    startDate() {
      return this.$searchQuery.start_date || moment().format('YYYY-MM-DD')
    }
  },
  methods: {
    onMouseLeave() {
      console.log('onMouseLeave')
    },
    // 添加团课排期
    onAddSchedule(date) {
      console.log(date)
      this.$modalRouter.push({
        name: 'schedule-team-add-course',
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
        name: 'schedule-team-reserve-info',
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
    // 批量排期
    onClickScheduleInBatch() {
      // this.$modalRouter.push({
      //   name: 'schedule-team-add-course-batch',
      //   on: {
      //     ok: res => {
      //       this.onScheduleChange()
      //     }
      //   }
      // })
      // 打开课表管理
      // this.$modalRouter.push({
      //   name: 'schedule-team-course-manage',
      //   on: {
      //     success: res => {
      //       console.log('弹窗确定')
      //     },
      //     add: res => {
      //       console.log('添加课表')
      //     }
      //   }
      // })
      this.$modalRouter.push({
        name: 'schedule-team-add-edit-course',
        on: {
          success: res => {
            console.log('新增课表')
          }
        }
      })
    },
    // 复制排期
    onClickCopySchedule() {
      this.$modalRouter.push({
        name: 'schedule-team-copy-schedule',
        on: {
          ok: res => {
            this.onScheduleChange()
          }
        }
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
