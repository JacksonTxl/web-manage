<template>
  <div :class="[bSchedule(), { 'schedule-calendar--fixed': fixed }]">
    <div :class="bSchedule('toolbar')" class="pd-x24">
      <div :class="bToolbar('left')">
        <slot name="toolbar-left"></slot>
      </div>
      <div :class="bToolbar('center')">
        <date-component
          @pre="oChangeDate"
          @next="oChangeDate"
          @today="oChangeDate"
        ></date-component>
      </div>
      <div :class="bToolbar('right')">
        <slot name="toolbar-right"></slot>
        <a-radio-group
          :value="dataBtnFocusState"
          @change="handleSizeChange($event, 'date')"
        >
          <a-radio-button value="week" @click="onClickGetWeek">
            周
          </a-radio-button>
          <a-radio-button value="day" @click="onClickGetCurrent">
            日
          </a-radio-button>
        </a-radio-group>
        <a-radio-group
          :value="pageBtnFocusState"
          @change="handleSizeChange($event, 'page')"
        >
          <a-radio-button value="calendar" class="mg-l32">
            <st-icon type="calendar"></st-icon>
          </a-radio-button>
          <a-radio-button value="list" @click="onClickGetTable">
            <st-icon type="list"></st-icon>
          </a-radio-button>
        </a-radio-group>
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
          <div class="current-bar" :style="itemStyle">
            <span class="current-time-text">{{ currentTime }}</span>
          </div>
          <ul class="time-group daily-time-group">
            <schedule-unit
              :class="{
                'first-unit': index === 0,
                'unit-day': weeks.length === 1
              }"
              :id="'timer-' + i"
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
          ></schedule-card>
        </li>
      </ul>

      <ul :class="bContent('day-group')" v-else>
        <li
          class="day"
          :class="[currentDay(item), index === 6 ? 'last' : '']"
          v-for="(item, index) in weeks"
          :key="item.week"
        >
          <ul class="time-group">
            <li class="date">
              <span class="date-text">{{ item | dateString }}</span>
              <div class="date-button">
                <span class="mg-r8">{{ item | dateString }}</span>
                <a href="javascript:;" @click="onClickGetDay(item)">查看详情</a>
              </div>
            </li>
            <schedule-unit
              :class="{ 'first-unit': index === 0 }"
              :id="index === 0 ? 'timer-' + i : ''"
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
import { cloneDeep } from 'lodash-es'

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
      currentWeek: '',
      weeks: [],
      dataBtnFocusState: 'week',
      pageBtnFocusState: 'calendar'
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
    fixed: {
      type: Boolean,
      default: false
    },
    rangeTime: {
      type: Array,
      default: () => [8, 24]
    },
    cardList: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    isDay() {
      const start = this.$searchQuerystart_date
      const end = this.$searchQueryend_date
      return start === end
    },
    currentTime() {
      return moment().format('HH:mm')
    },
    itemStyle() {
      const hour = +moment().format('HH')
      const minute = +moment().format('mm')
      return {
        top: `calc(${(hour / 24) * 100}% + 16px + ${(minute / (60 * 24)) *
          100}%)`
      }
    }
  },
  watch: {
    $route(newValue, oldValue) {
      this.getWeeks()
    }
  },
  filters: {
    timeStr(val) {
      const time = val - 1
      return time <= 9 ? `0${time}:00` : `${time}:00`
    },
    dateString(val) {
      let weekOfday = moment(val.date).format('E')
      let week = !val.week
        ? moment(val.date).format('ddd')
        : moment(val.date)
            .subtract(weekOfday - val.week, 'days')
            .format('ddd')
      let date = !val.week
        ? moment(val.date).format('DD')
        : moment(val.date)
            .subtract(weekOfday - val.week, 'days')
            .format('DD')
      return `${date} ${week}`
    }
  },
  methods: {
    handleSizeChange(evt, type) {
      if (type === 'date') {
        this.dataBtnFocusState = evt.target.value
      } else {
        this.pageBtnFocusState = evt.target.value
      }
    },
    onClickAdd() {
      this.$emit('add')
    },
    currentDay(val) {
      let weekOfday = moment(val.date).format('E')
      let date =
        val.week === 0
          ? val.date
          : moment(val.date)
              .subtract(weekOfday - val.week, 'days')
              .format('YYYY-MM-DD')
      let current = moment().format('YYYY-MM-DD')
      return date === current ? 'active' : ''
    },
    oChangeDate(date) {
      this.start = date.start_date
      this.$router.push({ query: { ...date } })
      this.isDay ? this.getWeeks() : this.getWeeks('week')
    },
    onClickGetTable() {
      this.$emit('get-table')
    },
    onClickGetDay(item) {
      this.weeks = [item]
      const date = this.isDay
        ? item.date
        : moment(item.date)
            .add(item.week - 1, 'days')
            .format('YYYY-MM-DD')
      this.$router.push({
        query: {
          start_date: date,
          end_date: date
        }
      })
    },
    onDetail(info) {
      this.$emit('detail', info)
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
    getWeeks(val) {
      if (val !== 'week' && this.isDay) {
        this.weeks = []
        this.weeks.push({ week: 0, date: this.$searchQuerystart_date })
        return
      }
      if (val === 'week') {
        this.weeks = []
        for (let i = 1; i < 8; i++) {
          this.weeks.push({ week: i, date: this.start })
        }
      }
    },

    onClickGetWeek() {
      this.$router.push({ query: { ...this.currentWeek } })
      this.getWeeks('week')
    },
    onChangeGetDate(date) {
      this.$emit('add', date)
    }
  },
  created() {
    this.currentWeek = cloneDeep(this.$searchQuery)
    this.start = this.startDate
    if (this.isDay) {
      this.getWeeks()
    } else {
      this.getWeeks('week')
    }
    this.$nextTick().then(() => {
      document.getElementById('timer-8').scrollIntoView()
    })
  },
  components: {
    DateComponent,
    AddButton,
    ScheduleUnit,
    ScheduleCard
  }
}
</script>
