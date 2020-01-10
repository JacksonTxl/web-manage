<template>
  <div>
    <calendar
      @get-table="onGetTable"
      @detail="onDetail"
      @add="onAddReserve"
      addTitle="添加预约"
      :cardList="cardList"
      :startDate="startDate"
      fixed
      ref="calendar"
    >
      <div slot="toolbar-left">
        <st-button
          type="primary"
          v-if="auth.get"
          class="mg-r24"
          @click="onClickSettingSchdule"
        >
          管理私教排期
        </st-button>
      </div>
    </calendar>
  </div>
</template>

<script>
import Calendar from '@/views/biz-components/schedule/calendar'
import { PersonalTeamScheduleScheduleService } from '@/views/pages/shop/product/course/schedule/personal/service#/schedule.service'
import { PersonalScheduleReserveService } from './service#/reserve.service'
import SchedulePersonalAddReserve from '@/views/biz-modals/schedule/personal/add-reserve'
import SchedulePersonalReserveInfo from '@/views/biz-modals/schedule/personal/reserve-info'
import { cloneDeep } from 'lodash-es'
import { PersonalService } from './personal.service'
export default {
  name: 'TeamSchedule',
  serviceInject() {
    return {
      personalScheduleReserveService: PersonalScheduleReserveService,
      service: PersonalService
    }
  },
  rxState() {
    return {
      cardList: this.personalScheduleReserveService.reserveTable$,
      auth: this.service.auth$
    }
  },
  modals: {
    SchedulePersonalAddReserve,
    SchedulePersonalReserveInfo
  },
  components: {
    Calendar
  },
  computed: {
    startDate() {
      return this.$searchQuery.start_date || moment().format('YYYY-MM-DD')
    },
    isDay() {
      const start = this.$searchQuery.start_date
      const end = this.$searchQuery.end_date
      return start === end
    }
  },
  methods: {
    onAddReserve(date) {
      this.$modalRouter.push({
        name: 'schedule-personal-add-reserve',
        props: { time: date }
      })
    },
    // 查看详情
    onDetail(info) {
      this.$modalRouter.push({
        name: 'schedule-personal-reserve-info',
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
    // 管理私教排期
    onClickSettingSchdule() {
      let requestParam = cloneDeep(this.$searchQuery)
      if (this.$searchQuery.start_date === this.$searchQuery.end_date) {
        let weekOfday = moment(
          this.$searchQuery.start_date,
          'YYYY-MM-DD'
        ).format('E')
        requestParam.start_date = moment(this.$searchQuery.start_date)
          .subtract(weekOfday - 1, 'days')
          .format('YYYY-MM-DD')
        requestParam.end_date = moment(this.$searchQuery.start_date)
          .add(7 - weekOfday, 'days')
          .format('YYYY-MM-DD')
      }
      this.$router.push({
        name: 'shop-product-course-personal-table',
        query: requestParam
      })
    },
    // 进入表格模式
    onGetTable() {
      this.$router.push({
        name: 'shop-product-course-schedule-personal-personal-reserve-table',
        query: this.$searchQuery
      })
    },
    // 刷新页面
    onScheduleChange() {
      this.$router.push({ query: this.$searchQuery })
    }
  },
  watch: {
    $route(newValue, oldValue) {
      this.service.scheduleService.getList(this.$searchQuery)
      this.$refs.calendar.getWeeks(
        this.$searchQuery.time_unit === 2 ? 'week' : ''
      )
    }
  }
}
</script>
