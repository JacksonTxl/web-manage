<template>
  <div class="page-personal-table schedule-table">
    <div
      class="page-personal-table__title pd-x24 pd-y16 schedule-table__title"
      slot="title"
    >
      <div class="title__left">
        <st-button
          type="primary"
          v-if="auth.get"
          class="mg-r8"
          @click="onClickSettingSchdule"
        >
          管理私教排期
        </st-button>
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
      </div>
      <div class="title__center">
        <date
          @today="getList"
          :start="$searchQuery.start_date"
          @pre="getList"
          @next="getList"
        />
      </div>
      <div class="title__right schedule-button">
        <!-- TODO: 周日还没写功能-->
        <!-- <a-radio-group
          :value="dataBtnFocusState"
          @change="handleSizeChange($event, 'date')"
        >
          <a-radio-button value="week" @click="onClickGetWeek">
            周
          </a-radio-button>
          <a-radio-button value="day" @click="onClickGetCurrent">
            日
          </a-radio-button>
        </a-radio-group> -->
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
    <div class="schedule-table__content mg-r24 mg-l24">
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
    </div>
  </div>
</template>

<script>
import tableMixin from '@/mixins/table.mixin'
import { PersonalScheduleReserveService } from './service#/reserve.service'
import { columns } from '../personal-reserve-table.config'
import date from '@/views/biz-components/schedule/date#/date-component.vue'
import SchedulePersonalAddReserve from '@/views/biz-modals/schedule/personal/add-reserve'
import { cloneDeep } from 'lodash-es'
import { PersonalReserveTableService } from './personal-reserve-table.service'
export default {
  name: 'PersonalReservetable',
  mixins: [tableMixin],
  modals: {
    SchedulePersonalAddReserve
  },
  serviceInject() {
    return {
      reserveService: PersonalScheduleReserveService,
      service: PersonalReserveTableService
    }
  },
  rxState() {
    return {
      auth: this.service.auth$,
      list: this.reserveService.list$,
      page: this.reserveService.page$,
      loading: this.reserveService.loading$
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
      page: {},
      currentTime: '',
      dataBtnFocusState: 'week',
      pageBtnFocusState: 'list'
    }
  },
  computed: {
    columns
  },
  mounted() {
    this.currentTime = this.$searchQuery.start_date
  },
  methods: {
    handleSizeChange(evt, type) {
      this.pageBtnFocusState = evt.target.value
    },
    onClickReserve(id) {
      this.reserveService.del(id).subscribe(() => {
        this.$router.reload()
      })
    },
    onClickCheckIn(id) {
      this.reserveService.check(id).subscribe(() => {
        this.$router.reload()
      })
    },
    onClickSkipSchedule() {
      this.$router.push({
        name: 'shop-product-course-schedule-personal',
        query: this.$searchQuery
      })
    },
    onClickGetWeek() {
      this.$router.push({ query: { ...this.currentWeek } })
      this.getWeeks('week')
    },
    onClickGetCurrent() {
      let current = moment().format('YYYY-MM-DD')
      this.getWeeks()
      this.$router.push({
        query: {
          start_date: current,
          end_date: current
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
    getList(val = {}) {
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
