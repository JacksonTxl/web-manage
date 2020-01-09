<template>
  <div :class="basic()">
    <ul :class="bHeader()">
      <li
        :class="bHeader('header-item')"
        v-for="(week, key) in weekList"
        :key="key"
      >
        {{ week }}
      </li>
    </ul>
    <ul :class="bContent()">
      <li
        v-for="(day, key) in dayList"
        :key="key"
        :class="[
          bContent('day-item'),
          { [bContent('day-item', { current: true })]: day.current },
          { [bContent('day-item', { gray: true })]: !day.isThisMonth }
        ]"
      >
        <div
          :class="bContent('item-content')"
          @mouseover="onMouseMove(day)"
          @mouseleave="onMouseLeave(day)"
        >
          <a-popover
            placement="right"
            v-if="!day.addBtnShow"
            :class="bContent('hover-content')"
          >
            <!-- <span slot="title">操作人：AAA 操作时间：2018/10/10 23:59:59</span> -->
            <span slot="content">
              <st-button type="default" plain>
                <st-icon type="add"></st-icon>
                新增排期
              </st-button>
              <div :class="hoverItem()">
                <div :class="hoverItem('item')">游泳课程</div>
              </div>
            </span>
            <div
              :class="bContent('popover')"
              @mouseover="onMouseMove(day)"
              @mouseleave="onMouseLeave(day)"
            >
              <div :class="bContent('popover')">
                <div>{{ day.date }}</div>
                <div v-for="(course, key) in day.courses" :key="key" class="">
                  {{ course.course_name }}
                </div>
                <div v-if="day.courses.length > 2">
                  还有{{ day.courses.length - 2 }}节课程
                </div>
              </div>
            </div>
          </a-popover>
          <div
            :class="bContent('add-content')"
            @mouseover="onMouseMove(day)"
            @mouseleave="onMouseLeave(day)"
          >
            <div
              :class="bContent('add-btn')"
              v-if="!day.courses.length && day.addBtnShow"
            >
              <div class="icon mg-b8">
                <st-icon type="add"></st-icon>
              </div>
              新增团体课
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import moment from 'moment'

export default {
  name: 'MonthBoard',
  bem: {
    basic: 'months-group-board',
    bHeader: 'board-header',
    bContent: 'board-content',
    hoverItem: 'hover-content'
  },
  props: {
    date: {
      type: String,
      default: moment().format('YYYY-MM-DD')
    }
  },
  watch: {
    date() {
      this.init()
    }
  },
  data() {
    return {
      // 星期一到星期日文字
      weekList: moment()
        .localeData()
        .weekdays(),
      // 日列表
      dayList: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      console.log(this.date)
      this.dayList = this.getCurrentMonthDayList()
    },
    getCurrentMonthDayList() {
      // 当前日期的月份
      const nowMonth = moment(this.date).month()
      const dates = []
      for (let i = 0; i < 42; i++) {
        const startDate = moment(this.date).date(1)
        startDate.startOf('week')
        dates[i] = startDate.weekday(i - 1)
      }
      // console.log(dates[4].month())
      // console.log(dates[14].month())
      return dates.map(item => {
        return {
          date: item.date(),
          current:
            item.date() === moment(this.date).date() &&
            item.month() === nowMonth,
          isThisMonth: item.month() === nowMonth,
          addBtnShow: false,
          courses:
            Math.random() * 10 > 5
              ? [
                  {
                    id: Math.floor(Math.random() * 100),
                    start_date: '2019-02-03',
                    start_time: '12:05',
                    end_time: '23:55',
                    course_name: '新增团体课',
                    coach_name: 'json',
                    court_name: 'ddd',
                    checkin_num: 0,
                    reserved_num: 3,
                    reserve_max: 3,
                    backup_num: 0
                  }
                ]
              : []
        }
      })
    },
    onMouseMove(day) {
      console.log('hover', day)
      day.courses.length === 0 && (day.addBtnShow = true)
    },
    onMouseLeave(day) {
      console.log('leave')
      day.addBtnShow = false
    }
  }
}
</script>
