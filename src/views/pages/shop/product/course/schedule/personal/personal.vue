<template>
  <div>
    <calendar
      @get-table="onGetTable"
      @detail="onDetail"
      @add="onAddReserve"
      addTitle="添加预约"
      :cardList="cardList"
      :startDate="startDate"
    >
      <div slot="toolbar-left">
        <st-button type="primary" class="mg-r24" @click="onClickSettingSchdule">
          管理私教排期
        </st-button>
      </div>
    </calendar>
  </div>
</template>

<script>
import Calendar from '@/views/biz-components/schedule/calendar'
import { PersonalTeamScheduleScheduleService } from '@/views/pages/shop/product/course/schedule/personal-team.service#/schedule.service'
import { PersonalScheduleReserveService } from '../personal.service#/reserve.service'
export default {
  name: 'TeamSchedule',
  serviceInject() {
    return {
      personalScheduleReserveService: PersonalScheduleReserveService
    }
  },
  rxState() {
    return {
      cardList: this.personalScheduleReserveService.reserveTable$
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
    onAddReserve(date) {
      this.$modalRouter.push({
        name: 'schedule-personal-add-reserve',
        props: { time: date }
      })
    },
    // 查看详情
    onDetail(info) {
      console.log(info)
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
      this.$router.push({
        name: 'shop-product-course-schedule-personal-personal-table',
        query: this.query
      })
    },
    // 进入表格模式
    onGetTable() {
      this.$router.push({
        name: 'shop-product-course-schedule-personal-personal-reserve-table',
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
