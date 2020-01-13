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
            v-model="day.popoverShow"
            :class="boardContent('hover-content')"
          >
            <!-- popover content -->
            <span
              slot="content"
              :class="popoverBox()"
              @mouseenter="onPopoverMouseEnter(day)"
              @click="hidePopover(day)"
            >
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
                  <div
                    :class="
                      course.schedule_status > 2
                        ? [
                            popoverBox('item-point'),
                            popoverBox('item-point--active')
                          ]
                        : popoverBox('item-point')
                    "
                  ></div>
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
                  <div
                    :class="
                      course.schedule_status > 2
                        ? [dayContent('point--active'), dayContent('point')]
                        : dayContent('point')
                    "
                  ></div>
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
              <div :class="addBtnContent('text')">{{ addTitle }}</div>
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
    addTitle: {
      type: String,
      default: '新增团体课'
    },
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
    this.getCoursesList()
  },
  methods: {
    onPopoverMouseEnter(day) {
      day.popoverShow = true
    },
    init() {
      this.date = this.$searchQuery.start_date
      this.dayList = this.getCurrentMonthDayList()
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
      return dates.map(item => {
        return {
          date: item.date(),
          fullDate: item.format('YYYY-MM-DD'),
          current: item.format('YYYY-MM-DD') === moment().format('YYYY-MM-DD'),
          isThisMonth: item.month() === nowMonth,
          addBtnShow: false,
          popoverShow: false,
          courses: []
        }
      })
    },
    onMouseMove(day, er) {
      if (day.courses.length !== 0) {
        day.popoverShow = true
        return
      }
      this.dayList.forEach(item => {
        item.addBtnShow = item.fullDate === day.fullDate ? true : false
      })
    },
    onMouseLeave(day) {
      day.addBtnShow = false
    },
    onClickAddBtn(e) {
      this.$emit('onClickAddBtn', {
        date: e.date,
        fullDate: e.fullDate
      })
    },
    hidePopover(e) {
      e.popoverShow = false
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
