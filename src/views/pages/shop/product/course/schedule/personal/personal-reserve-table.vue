<template>
  <div class="page-personal-table schedule-table">
    <div
      class="page-personal-table__title pd-x24 pd-y16 schedule-table__title"
      slot="title"
    >
      <a-row :gutter="8">
        <a-col :lg="8">
          <st-button v-if="auth.add">
            <a
              v-modal-link="{
                name: 'schedule-personal-add-reserve',
                props: { id: 1 }
              }"
            >
              添加预约
            </a>
          </st-button>
        </a-col>
        <a-col :lg="7" :offset="2">
          <date
            @today="getList"
            :start="query.start_date"
            @pre="getList"
            @next="getList"
          />
        </a-col>
        <a-col :lg="7" class="schedule-button">
          <st-button @click="onClickSkipSchedule">
            <st-icon type="calendar"></st-icon>
          </st-button>
        </a-col>
      </a-row>
    </div>
    <a-row class="mg-t8 mg-r24 mg-l24">
      <st-table
        :columns="columns"
        rowKey="id"
        :page="false"
        :dataSource="list"
        :scroll="{ x: 1440 }"
        :loading="loading.getList"
        @change="onTableChange"
      >
        <template slot="reserve_status" slot-scope="text, record">
          <span v-if="record.is_checkin">
            {{ record.is_checkin | enumFilter('reserve.is_checkin') }}
          </span>
          <span v-else>{{ text | enumFilter('reserve.reserve_status') }}</span>
        </template>
        <div slot="action" slot-scope="text, record">
          <st-table-actions>
            <a
              href="javascript:;"
              class="mg-r8"
              v-if="record.auth['shop:reserve:personal_course_reserve|del']"
              @click="onClickReserve(record.id)"
            >
              取消预约
            </a>
            <a
              href="javascript:;"
              v-if="record.auth['shop:reserve:personal_course_reserve|checkin']"
              @click="onClickCheckIn(record.id)"
            >
              签到消费
            </a>
          </st-table-actions>
        </div>
      </st-table>
    </a-row>
  </div>
</template>

<script>
import tableMixin from '@/mixins/table.mixin'
import date from '../date#/date-component'
import { PersonalScheduleReserveService } from '../personal.service#/reserve.service'
import { columns } from '../personal-reserve-table.config'
import { RouteService } from '@/services/route.service'

export default {
  name: 'PersonalReservetable',
  mixins: [tableMixin],
  serviceInject() {
    return {
      reserveService: PersonalScheduleReserveService,
      routeService: RouteService
    }
  },
  rxState() {
    return {
      auth: this.reserveService.auth$,
      list: this.reserveService.list$,
      page: this.reserveService.page$,
      loading: this.reserveService.loading$,
      query: this.routeService.query$
    }
  },
  filters: {
    getWeek(index) {
      const weekList = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      return weekList[index]
    },
    getDate(date) {
      return moment(date)
        .format('MM/DD')
        .valueOf()
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
    this.currentTime = this.$route.query.start_date
  },
  methods: {
    onClickReserve(id) {
      this.reserveService.del(id).subscribe(() => {
        this.$router.push({ force: true })
      })
    },
    onClickCheckIn(id) {
      this.reserveService.check(id).subscribe(() => {
        this.$router.push({ force: true })
      })
    },
    onClickSkipSchedule() {
      this.$router.push({
        name: 'shop-product-course-schedule-personal',
        query: this.query
      })
    },
    getList(val = {}) {
      const query = {
        ...this.query,
        start_date: val.start_time,
        end_date: val.end_time
      }
      this.$router.push({ query })
    }
  }
}
</script>
