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
    <ul
      :class="[
        boardContent(),
        { [boardContent('table', { small: true })]: dayList.length < 42 }
      ]"
    >
      <li
        v-for="(day, key) in dayList"
        :key="key"
        :class="[
          boardContent('day-item'),
          { [boardContent('day-item', { current: true })]: day.current },
          { [boardContent('day-item', { gray: true })]: !day.isThisMonth }
        ]"
      >
        <div
          :class="boardContent('item-content')"
          @mouseover="onMouseMove(day)"
          @mouseleave="onMouseLeave(day)"
        >
          <a-popover
            placement="right"
            v-if="!day.addBtnShow"
            :class="boardContent('hover-content')"
          >
            <!-- popover content -->
            <span slot="content" :class="popoverBox()">
              <st-button
                :class="popoverBox('hover-add-btn')"
                type="default"
                plain
                @click="onClickAddBtn(day)"
              >
                <st-icon type="add" size="12px" color="#3E4D5C"></st-icon>
                新增排期
              </st-button>
              <div :class="popoverBox('course-list')">
                <div
                  :class="popoverBox('list-item')"
                  v-for="course in day.courses"
                  :key="course.id"
                  @click="onClickCourse(course)"
                >
                  <div :class="popoverBox('item-point')"></div>
                  <div :class="popoverBox('item-text')">
                    {{ course.course_name }}
                  </div>
                </div>
              </div>
            </span>
            <!-- popover element -->
            <div
              :class="dayContent()"
              @mouseover="onMouseMove(day)"
              @mouseleave="onMouseLeave(day)"
            >
              <div :class="dayContent('popover')">
                <div class="font-number">{{ day.date }}</div>
                <div
                  v-for="(course, key) in day.courses.slice(0, 2)"
                  :key="key"
                  :class="dayContent('course-item')"
                >
                  <div :class="dayContent('point')"></div>
                  <div :class="dayContent('course-name')">
                    {{ course.course_name }}
                  </div>
                </div>
                <div
                  :class="dayContent('bottom-text')"
                  v-if="day.courses.length > 2"
                >
                  还有{{ day.courses.length - 2 }}节课程
                </div>
              </div>
            </div>
          </a-popover>
          <div
            :class="addBtnContent()"
            @mouseover="onMouseMove(day)"
            @mouseleave="onMouseLeave(day)"
            @click="onClickAddBtn(day)"
            v-if="!day.courses.length && day.addBtnShow"
          >
            <div :class="addBtnContent('add-btn')">
              <div class="mg-b8" :class="addBtnContent('icon')">
                <st-icon type="add"></st-icon>
              </div>
              <div :class="addBtnContent('text')">新增团体课</div>
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
    boardContent: 'board-content',
    dayContent: 'day-content',
    popoverBox: 'popover-box',
    addBtnContent: 'add-btn-content'
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
    // getMonthFristDay() {
    //   const startDate = this.$searchQuery.start_date
    //     ? moment(this.$searchQuery.start_date)
    //     : moment()
    //   let firstDay = ''
    //   // 判断当前日期的天是否大于15，如果是则取下一个月，如果不是则取当前月
    //   console.log(startDate)
    //   if (startDate.date() > 15) {
    //     firstDay = moment()
    //       .month(startDate.month() + 1)
    //       .format('YYYY-MM-DD')
    //   } else {
    //     firstDay = moment().format('YYYY-MM-DD')
    //   }
    //   return firstDay
    // },
    init() {
      // this.date = this.getMonthFristDay()
      this.date = this.$searchQuery.start_date
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
      let dates = []
      for (let i = 0; i < 42; i++) {
        const startDate = moment(this.date).date(1)
        startDate.startOf('week')
        dates[i] = startDate.weekday(i - 1)
      }
      // 判断当前是否含有上个月7天的数据，如果有则删除
      const startOfMonth = moment(this.date)
        .startOf('month')
        .format('YYYY-MM-DD')
      const firstDay = dates.findIndex(item => {
        return item.format('YYYY-MM-DD') === startOfMonth
      })
      if (firstDay > 6) {
        dates = dates.slice(7, dates.length)
      }
      // 判断是否包含下个月7天的数据，如果有则删除
      const startOfNextMonth = moment(this.date)
        .month(moment(this.date).month() + 1)
        .startOf('month')
        .format('YYYY-MM-DD')
      const nextMonthFirstDay = dates.findIndex(item => {
        return item.format('YYYY-MM-DD') === startOfNextMonth
      })
      if (nextMonthFirstDay !== -1 && dates.length - nextMonthFirstDay > 6) {
        dates = dates.slice(0, dates.length - 7)
      }
      // console.log(lastDay)
      console.log(dates)
      // console.log(dates[firstDay].format('YYYY-MM-DD'))
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
    onClickCourse(e) {
      this.$emit('onClickCourse', {
        ...e
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
