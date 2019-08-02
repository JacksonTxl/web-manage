<template>
  <div :class="bSchedule()">
    <div :class="bSchedule('toolbar')" class="pd-x24">
      <div :class="bToolbar('left')">
        <slot name="toolbar-left"></slot>
      </div>
      <div :class="bToolbar('center')">
        <date-component
          :start="start"
          @pre="oChangeDate"
          @next="oChangeDate"
          @today="oChangeDate"
        ></date-component>
      </div>
      <div :class="bToolbar('right')">
        <slot name="toolbar-right"></slot>
        <a-button-group>
          <st-button @click="onClickGetWeek">周</st-button>
          <st-button @click="onClickGetCurrent">日</st-button>
        </a-button-group>
        <st-button @click="onClickGetTable" class="mg-l32">
          <st-icon type="list"></st-icon>
        </st-button>
      </div>
    </div>
    <div :class="bSchedule('content')">
      <div :class="bContent('time-collection')"></div>

      <ul :class="bContent('day-group')" v-if="weeks.length === 1">
        <li
          class="day"
          :class="item | currentDay"
          v-for="(item, index) in weeks"
          :key="item.week"
        >
          <ul class="time-group">
            <li class="date">
              <span class="date-text-day">{{ item | dateString }}</span>
            </li>

            <schedule-unit
              :class="{
                'first-unit': index === 0,
                'unit-day': weeks.length === 1
              }"
              v-for="i in 24"
              :key="i"
            >
              <div class="day-layout">
                <div class="time">{{ i | timeStr }}</div>
                <div class="add-button-day-group">
                  <div class="add-button-day-box" v-for="j in 7" :key="j">
                    <add-button
                      :date="item"
                      :time="i"
                      @change="onChangeGetDate"
                      class="unit-add-day"
                    >
                      {{ addTitle }}
                    </add-button>
                  </div>
                </div>
              </div>
            </schedule-unit>
          </ul>
          <schedule-card
            :class="bSchedule('card--day')"
            @detail="onDetail"
            :cardList="cardList"
            :week="item.week"
            :start="start"
          ></schedule-card>
        </li>
      </ul>

      <ul :class="bContent('day-group')" v-else>
        <li
          class="day"
          :class="item | currentDay"
          v-for="(item, index) in weeks"
          :key="item.week"
        >
          <ul class="time-group">
            <li class="date">
              <span class="date-text">{{ item | dateString }}</span>
              <div class="date-button">
                <span class="mg-r8">{{ item | dateString }}</span>
                <a href="javascript:;" @click="onClickGetDay(item)">查看日期</a>
              </div>
            </li>
            <schedule-unit
              :class="{ 'first-unit': index === 0 }"
              v-for="i in 24"
              :key="i"
              :date="item"
              :time="i"
            >
              <div v-if="index === 0">
                <div class="time">{{ i | timeStr }}</div>
                <add-button
                  :date="item"
                  :time="i"
                  @change="onChangeGetDate"
                  class="unit-add"
                >
                  {{ addTitle }}
                </add-button>
              </div>
              <add-button
                v-else
                :date="item"
                :time="i"
                @change="onChangeGetDate"
                class="unit-add"
              >
                {{ addTitle }}
              </add-button>
            </schedule-unit>
          </ul>
          <schedule-card
            @detail="onDetail"
            :week="item.week"
            :cardList="cardList"
            :start="start"
          ></schedule-card>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import DateComponent from './date#/date-component'
import AddButton from './date#/add-button'
import ScheduleUnit from './date#/schedule-unit'
import ScheduleCard from './date#/schedule-card'
import moment from 'moment'

export default {
  name: 'ScheduleCalendar',
  bem: {
    bSchedule: 'schedule-calendar',
    bToolbar: 'toolbar',
    bContent: 'content'
  },
  data() {
    return {
      start: moment().format('YYYY-MM-DD'),
      weeks: []
    }
  },
  props: {
    addTitle: {
      type: String,
      default: '添加课程排期'
    },
    startDate: {
      type: String,
      default: moment().format('YYYY-MM-DD')
    },
    cardList: {
      type: Array,
      default: () => []
    }
  },
  computed: {},
  filters: {
    timeStr(val) {
      const time = val - 1
      return time < 9 ? `0${time}:00` : `${time}:00`
    },
    currentDay(val) {
      let weekOfday = moment(val.date).format('E')
      let date = moment(val.date)
        .subtract(weekOfday - val.week, 'days')
        .format('YYYY-MM-DD')
      let current = moment().format('YYYY-MM-DD')
      return date === current ? 'active' : ''
    },
    dateString(val) {
      let weekOfday = moment(val.date).format('E')
      let week = moment(val.date)
        .subtract(weekOfday - val.week, 'days')
        .format('ddd')
      let date = moment(val.date)
        .subtract(weekOfday - val.week, 'days')
        .format('DD')
      return `${date} ${week}`
    }
  },
  methods: {
    onClickAdd() {
      this.$emit('add')
    },
    oChangeDate(date) {
      this.start = date.start_date
      this.getWeeks()
      this.$router.push({ query: { ...date } })
    },
    onClickGetTable() {
      console.log('get-table')
      this.$emit('get-table')
    },
    onClickGetDay(item) {
      this.weeks = [item]
    },
    onDetail(info) {
      this.$emit('detail', info)
    },
    onClickGetCurrent() {
      let current = moment().format('YYYY-MM-DD')
      this.weeks = this.weeks.filter(item => {
        let weekOfday = moment(item.date).format('E')
        let date = moment(item.date)
          .subtract(weekOfday - item.week, 'days')
          .format('YYYY-MM-DD')
        return date === current
      })
    },
    getWeeks() {
      this.weeks = []
      for (let i = 1; i < 8; i++) {
        this.weeks.push({ week: i, date: this.start })
      }
    },

    onClickGetWeek() {
      this.getWeeks()
    },
    onChangeGetDate(date) {
      this.$emit('add', date)
    }
  },
  created() {
    this.start = this.startDate
    this.getWeeks()
  },
  components: {
    DateComponent,
    AddButton,
    ScheduleUnit,
    ScheduleCard
  }
}
</script>
