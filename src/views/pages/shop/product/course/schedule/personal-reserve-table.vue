<template>
  <div class="page-personal-table schedule-table">
    <div class="page-personal-table__title pd-x24 pd-y16 schedule-table__title" slot="title">
      <a-row :gutter="8">
        <a-col :lg="8">
          <st-button>
            <modal-link tag="a" :to="{ name: 'schedule-personal-add-reserve', props: { id: 1 } }">添加预约</modal-link>
          </st-button>
        </a-col>
        <a-col :lg="7" :offset="2">
          <date @today="getList" start="2019-07-04" @pre="getList" @next="getList"/>
        </a-col>
        <!-- <a-col :lg="7" class="schedule-button">
          <st-button  @click="onClickSkipSchedule"><st-icon type="calendar"></st-icon></st-button>
        </a-col> -->
      </a-row>
    </div>
    <a-row class="mg-t8 mg-r24 mg-l24">
      <st-table
      :columns="columns"
      rowKey="id"
      :dataSource="reserveListTable">
      <template slot="reserve_status" slot-scope="text">
        {{text | enumFilter('reserve.reserve_status')}}
      </template>
      <div slot="action" slot-scope="text,record">
        <a href="javascript:;" class="mg-r8" @click="onClickReserve(record.id)">取消预约</a>
        <a href="javascript:;" @click="onClickCheckIn(record.id)">签到消费</a>
      </div>
      </st-table>
    </a-row>
  </div>
</template>

<script>
import date from './date#/date-component'
import { RouteService } from '../../../../../../services/route.service'
import { PersonalScheduleReserveService } from './personal.service#/reserve.service'
import { columns } from './personal-reserve-table.config'

export default {
  serviceInject() {
    return {
      reserveService: PersonalScheduleReserveService,
      routeService: RouteService
    }
  },
  rxState() {
    console.log(this.reserveService)
    return {
      reserveListTable: this.reserveService.reserveListTable$,
      query: this.routeService.query$
    }
  },
  filters: {
    getWeek(index) {
      const weekList = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      return weekList[index]
    },
    getDate(date) {
      return moment(date).format('MM/DD').valueOf()
    }
  },
  components: {
    date
  },
  data() {
    return {
      columns,
      page: {},
      currentTime: ''
    }
  },
  mounted() {
    this.currentTime = '2019-05-26'
  },
  methods: {
    onClickReserve(id) {
      this.reserveService.del(id).subscribe(() => {
        this.getList(query = {})
      })
    },
    onClickCheckIn(id) {
      this.reserveService.check(id).subscribe(() => {
        this.getList(query = {})
      })
    },
    onClickSkipSchedule() {
      this.$router.push({ name: 'shop-product-course-schedule-personal-calendar' })
    },
    getList(query = {}) {
      this.$router.push({ query: { ...this.query, ...query } })
    }
  }
}
</script>
