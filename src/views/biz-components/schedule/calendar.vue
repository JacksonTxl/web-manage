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
          :value="$searchQuery.time_unit"
          @change="handleSizeChange($event, 'date')"
        >
          <a-radio-button :value="TIME_UNIT.TIME_DAY">
            日
          </a-radio-button>
          <a-radio-button :value="TIME_UNIT.TIME_WEEK">
            周
          </a-radio-button>
          <a-radio-button :value="TIME_UNIT.TIME_MONTH" v-if="!smallCourseType">
            月
          </a-radio-button>
        </a-radio-group>
        <a-radio-group
          :value="pageBtnFocusState"
          @change="handleSizeChange($event, 'page')"
        >
          <a-radio-button value="calendar" class="mg-l12">
            <st-icon type="calendar"></st-icon>
          </a-radio-button>
          <a-radio-button value="list" @click="onClickGetTable">
            <st-icon type="list"></st-icon>
          </a-radio-button>
        </a-radio-group>
      </div>
    </div>
    <div :class="bSchedule('content')">
      <div
        :class="bContent('time-collection')"
        v-if="$searchQuery.time_unit !== TIME_UNIT.TIME_MONTH"
      ></div>

      <ul
        :class="bContent('day-group')"
        v-if="$searchQuery.time_unit === TIME_UNIT.TIME_DAY"
      >
        <li
          class="day"
          :class="currentDay(item)"
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
                      v-if="authAdd"
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

      <ul
        :class="bContent('day-group')"
        v-else-if="$searchQuery.time_unit === TIME_UNIT.TIME_WEEK"
      >
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
                  v-if="authAdd"
                  @change="onChangeGetDate"
                  class="unit-add"
                >
                  {{ addTitle }}
                </add-button>
              </div>
              <add-button
                v-else-if="authAdd"
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
      <!-- 月度组件 -->
      <month-board
        v-if="$searchQuery.time_unit === TIME_UNIT.TIME_MONTH"
        :courses="cardList"
        :addTitle="addTitle"
        @onClickAddBtn="addTeamCourse"
        @onClickCourse="onClickCourse"
      />
    </div>
  </div>
</template>

<script>
import DateComponent from './date#/date-component'
import AddButton from './date#/add-button'
import ScheduleUnit from './date#/schedule-unit'
import ScheduleCard from './date#/schedule-card'
import MonthBoard from './date#/month-board'
import moment from 'moment'
import { cloneDeep } from 'lodash-es'
import { TIME_UNIT } from '@/constants/course/team'

export default {
  name: 'ScheduleCalendar',
  bem: {
    bSchedule: 'schedule-calendar',
    bToolbar: 'toolbar',
    bContent: 'content'
  },
  data() {
    return {
      start: '',
      currentWeek: '',
      weeks: [],
      pageBtnFocusState: 'calendar',
      TIME_UNIT
    }
  },
  props: {
    addTitle: {
      type: String,
      default: '添加课程排期'
    },
    authAdd: {
      type: Boolean,
      default: true
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
    },
    smallCourseType: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isDay() {
      const start = this.$searchQuery.start_date
      const end = this.$searchQuery.end_date
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
      // this.isDay = this.$searchQuery.start_date === this.$searchQuery.end_date
      this.start = this.$searchQuery.start_date
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
        if (evt.target.value === this.TIME_UNIT.TIME_DAY) {
          this.onClickGetCurrent()
        } else if (evt.target.value === this.TIME_UNIT.TIME_MONTH) {
          this.onClickGetMonth()
        } else {
          this.onClickGetWeek()
        }
        this.$searchQuery.time_unit = evt.target.value
      } else {
        this.pageBtnFocusState = evt.target.valuevalue
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
      this.weeks = []
      this.weeks.push({ week: 0, date: this.start })
      this.$searchQuery.time_unit = this.TIME_UNIT.TIME_DAY
      // let current = moment().format('YYYY-MM-DD')
      this.getWeeks()
      this.$router.push({
        query: {
          start_date: this.start,
          end_date: this.start,
          time_unit: this.TIME_UNIT.TIME_DAY,
          date: this.start
        }
      })
    },
    onClickGetMonth() {
      const startDate = moment(this.start)
        .startOf('month')
        .format('YYYY-MM-DD')
      const endDate = moment(this.start)
        .endOf('month')
        .format('YYYY-MM-DD')
      this.getWeeks()
      this.$router.push({
        query: {
          start_date: startDate,
          end_date: endDate,
          time_unit: this.TIME_UNIT.TIME_MONTH
        }
      })
    },
    getWeeks(val) {
      console.log('start', this.start)
      if (val !== 'week' && this.isDay) {
        this.weeks = []
        this.weeks.push({ week: 0, date: this.$searchQuery.start_date })
        this.$nextTick().then(() => {
          // 减去232固定高度
          window.scrollTo({
            top: this.heightToTop(document.querySelector('#timer-9')) - 232
          })
        })
        this.dataBtnFocusState = 'day'
        return
      }
      if (val === 'week') {
        this.weeks = []
        for (let i = 1; i < 8; i++) {
          this.weeks.push({ week: i, date: this.start })
        }
        this.dataBtnFocusState = 'week'
      }
    },
    onClickGetWeek() {
      let weekOfday = moment(this.start).format('E')
      this.currentWeek.start_date = moment(this.start)
        .subtract(weekOfday - 1, 'days')
        .format('YYYY-MM-DD')
      this.currentWeek.end_date = moment(this.start)
        .add(7 - weekOfday, 'days')
        .format('YYYY-MM-DD')
      this.$router.push({
        query: { ...this.currentWeek, time_unit: this.TIME_UNIT.TIME_WEEK }
      })
      this.getWeeks('week')
    },
    onChangeGetDate(date) {
      this.$emit('add', date)
    },
    heightToTop(ele) {
      //ele为指定跳转到该位置的DOM节点
      let root = document.body
      let height = 0
      do {
        height += ele.offsetTop
        ele = ele.offsetParent
      } while (ele !== root)
      return height
    },
    addTeamCourse(e) {
      console.log('点击新增团体课按钮', e)
      this.$emit('add', moment(e.fullDate))
    },
    onClickCourse(e) {
      console.log('点击某个课程', e)
      this.$emit('detail', e)
    }
  },
  created() {
    this.currentWeek = cloneDeep(this.$searchQuery)
    console.log('created', this.currentWeek, this.$searchQuery)
    this.start = this.startDate || moment().format('YYYY-MM-DD')
    if (this.isDay) {
      this.getWeeks()
    } else {
      this.getWeeks('week')
    }
    this.$nextTick().then(() => {
      // 减去232固定高度
      if (this.$searchQuery.time_unit !== TIME_UNIT.TIME_MONTH) {
        window.scrollTo({
          top: this.heightToTop(document.querySelector('#timer-9')) - 232
        })
      }
    })
  },
  components: {
    DateComponent,
    AddButton,
    ScheduleUnit,
    ScheduleCard,
    MonthBoard
  }
}
</script>
