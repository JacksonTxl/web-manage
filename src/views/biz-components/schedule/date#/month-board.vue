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
            <span slot="content">
              <st-button type="default" plain @click="onClickAddBtn(day)">
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
                <div class="font-number">{{ day.date }}</div>
                <div
                  v-for="(course, key) in day.courses"
                  :key="key"
                  :class="bContent('course-item')"
                >
                  <div :class="bContent('point')"></div>
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
            @click="onClickAddBtn(day)"
            v-if="!day.courses.length && day.addBtnShow"
          >
            <div :class="bContent('add-btn')">
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
    // date: {
    //   type: String,
    //   default: () => {
    //     return moment()
    //       .format('YYYY-MM-DD')
    //       .toString()
    //   }
    // }，
    courses: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  watch: {
    $route(val) {
      this.init()
    },
    courses() {
      this.getCoursesList()
    }
  },
  data() {
    return {
      date: '',
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
      this.date = this.$searchQuery.start_date || moment().format('YYYY-MM-DD')
      console.log(this.date)
      this.dayList = this.getCurrentMonthDayList()
      this.$emit(
        'onComplete',
        this.dayList.map(item => {
          return {
            date: item.date,
            fullDate: item.fullDate,
            courses: item.courses.map(item => {
              return {
                id: Math.floor(Math.random() * 100)
              }
            })
          }
        })
      )
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
      return dates.map(item => {
        return {
          date: item.date(),
          fullDate: item.format('YYYY-MM-DD'),
          current: item.format('YYYY-MM-DD') === moment().format('YYYY-MM-DD'),
          isThisMonth: item.month() === nowMonth,
          addBtnShow: false,
          courses: []
        }
      })
    },
    onMouseMove(day) {
      // console.log('hover', day)
      if (day.courses.length !== 0) return
      this.dayList.forEach(item => {
        item.addBtnShow = item.fullDate === day.fullDate ? true : false
      })
    },
    onMouseLeave(day) {
      // console.log('leave')
      day.addBtnShow = false
    },
    onClickAddBtn(e) {
      this.$emit('onClickAddBtn', {
        date: e.date,
        fullDate: e.fullDate,
        courses: e.courses.map(item => {
          return {
            id: Math.floor(Math.random() * 100)
          }
        })
      })
    },
    getCoursesList() {
      this.dayList.forEach(day => {
        this.courses.forEach(course => {
          if (day.fullDate === course.start_date) {
            day.courses.push(course)
          }
        })
      })
    }
  }
}
</script>
