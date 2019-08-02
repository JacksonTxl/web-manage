<template>
  <div>
    <calendar
      @get-table="onGetTable"
      @detail="onDetail"
      @add="onAddSchedule"
      :cardList="cardList"
      :startDate="startDate"
    >
      <div slot="toolbar-left">
        <st-button
          type="primary"
          class="mg-r24"
          @click="onClickScheduleInBatch"
        >
          批量排期
        </st-button>
        <st-button @click="onClickCopySchedule">复制排期</st-button>
      </div>
    </calendar>
  </div>
</template>

<script>
import Calendar from '@/views/biz-components/schedule/calendar'
import { TeamScheduleScheduleService } from '@/views/pages/shop/product/course/schedule/team.service#/schedule.service'
import { RouteService } from '@/services/route.service'
export default {
  name: 'TeamSchedule',
  serviceInject() {
    return {
      teamSchduleService: TeamScheduleScheduleService,
      routeService: RouteService
    }
  },
  rxState() {
    return {
      cardList: this.teamSchduleService.scheduleTeamCourseList$,
      query: this.routeService.query$
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
      return this.$route.query.start_date || moment().format('YYYY-MM-DD')
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
        name: 'schedule-team-add-course-schedule',
        props: { time: date },
        on: {
          ok: res => {
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
      this.$modalRouter.push({
        name: 'schedule-team-add-course-schedule-batch',
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
        query: this.query
      })
    },
    // 刷新页面
    onScheduleChange() {
      this.$router.push({ query: this.query, force: true })
    }
  }
}
</script>

<style scoped>
.zlx {
  width: 100px;
  height: 100px;
  background: #3e4;
}
</style>
