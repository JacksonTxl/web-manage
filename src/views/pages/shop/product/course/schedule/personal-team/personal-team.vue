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
import { PersonalTeamScheduleScheduleService } from '@/views/pages/shop/product/course/schedule/personal-team.service#/schedule.service'
import { RouteService } from '../../../../../../../services/route.service'
export default {
  name: 'TeamSchedule',
  serviceInject() {
    return {
      PersonalTeamSchduleService: PersonalTeamScheduleScheduleService,
      routeService: RouteService
    }
  },
  rxState() {
    return {
      cardList: this.PersonalTeamSchduleService.courseList$,
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
    // 添加团课排期
    onAddSchedule(date) {
      this.$modalRouter.push({
        name: 'schedule-personal-team-add',
        props: { time: date }
      })
    },
    onMouseLeave() {
      console.log('onMouseLeave')
    },
    // 查看详情
    onDetail(info) {
      console.log(info)
      this.$modalRouter.push({
        name: 'schedule-personal-team-reserve-info',
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
    // 进入表格模式
    onGetTable() {
      this.$router.push({
        name: 'shop-product-course-schedule-personal-team-personal-team-table',
        query: { ...this.$route.query }
      })
    },
    // 刷新页面
    onScheduleChange() {
      this.$router.push({ query: this.query, force: true })
    }
  }
}
</script>
