<template>
  <div class="schedule-calendar">
    <div class="sc-toolbar pd-x24">
      <div class="left">
        <slot name="toolbar-left"></slot>
      </div>
      <div class="center">
        <DateComponent @pre="oChangeDate" @next="oChangeDate" @today="oChangeDate"></DateComponent>
      </div>
      <div class="right">
        <slot name="toolbar-right"></slot>
        <a-button-group>
          <st-button @click="onClickGetWeek">周</st-button>
          <st-button @click="onClickGetCurrent" class="mg-r32">日</st-button>
        </a-button-group>
        <st-button>三</st-button>
      </div>
    </div>
    <div class="sc-content">
      <div class="time-collection">
      </div>

      <ul class="date-group" v-if="weeks.length === 1">
        <li class="item" :class="item | currentDay" v-for="(item, index) in weeks" :key="item.week">

          <ul class="time-group">
            <li class="date">
              <span class="date-text-day">{{item | dateString}}</span>
            </li>

            <unit :class="{'first-unit': index===0, 'unit-day': weeks.length === 1}" v-for="i in 24" :key="i" :date="item" :time="i" @change="onChangeGetDate">
              <div class="day-layout">
                <div class="time">{{i | timeStr}}</div>
                <div class="add-button-day-group">
                  <div class="add-button-day-box" v-for="j in 7" :key="j">
                    <add-button :title="addTitle"  class="unit-add-day"></add-button>
                  </div>
                </div>
              </div>
            </unit>

          </ul>

          <section
            v-for="group in myMatrix(item.week)"
            :key='group.id'
            :class="['item-group-day','item-group',`item-group--has-${group.length}`]">
            <div
              class="con-item"
              :class="[`item-${i}`]"
              v-for="(item,i) in group"
              :key='i'
              :style="itemStyle(item)">
                <div class="bar" :class="item | barClass"></div>
                <div class="content">
                  <h3 class="course__name">{{ item.course_name }} {{item.start_time}}-{{item.end_time}}</h3>
                  <p class="course__coach">
                    教练：{{ item.coach_name }}
                  </p>
                </div>
                <div class="item__extra">
                  {{ item.course_name }}
                </div>
              </div>
          </section>
        </li>
      </ul>

      <ul class="date-group" v-else>
        <li class="item" :class="item | currentDay" v-for="(item, index) in weeks" :key="item.week">

          <ul class="time-group">
            <li class="date">
              <span class="date-text">{{item | dateString}}</span>
              <div class="date-button">
                <span class="mg-r8">{{item | dateString}}</span>
                <a href="javascript:;" @click="onClickGetDay(item)">查看日期</a>
              </div>
            </li>
            <unit :class="{'first-unit': index===0}" v-for="i in 24" :key="i" :date="item" :time="i" @change="onChangeGetDate">
              <div v-if="index===0">
                <div class="time">{{i | timeStr}}</div>
                <add-button :title="addTitle" class="unit-add"></add-button>
              </div>
              <add-button v-else :title="addTitle" class="unit-add"></add-button>
            </unit>
          </ul>

          <section
            v-for="group in myMatrix(item.week)"
            :key='group.id'
            :class="['item-group',`item-group--has-${group.length}`]">
            <div
              class="con-item"
              :class="[`item-${i}`]"
              v-for="(item,i) in group"
              :key='i'
              :style="itemStyle(item)">
                <div class="bar" :class="item | barClass"></div>
                <div class="content">
                  <h3 class="course__name">{{ item.course_name }} {{item.start_time}}-{{item.end_time}}</h3>
                  <p class="course__coach">
                    教练：{{ item.coach_name }}
                  </p>
                </div>
                <div class="item__extra">
                  {{ item.course_name }}
                </div>
              </div>
          </section>

        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import DateComponent from './date#/date-component'
import AddButton from './date#/add-button'
import Unit from './date#/unit'
const toTen = time => {
  return time
    .split(':')
    .map((n, i) => {
      return {
        0: +n,
        1: +n / 60
      }[i]
    })
    .reduce((res, n) => res + n, 0)
}
export default {
  name: 'ScheduleCalendar',
  data() {
    return {
      start: moment(),
      weeks: [],
      cardList: [{ 'id': 96055669096767, 'coach_name': '团课教练汤汤测试勿动', 'member_id': 77159390052771, 'member_name': '汤汤汤测试', 'course_name': '汤汤好私教', 'consume_name': '范围内的课程（汤汤好私教）', 'reserve_status': 3, 'is_checkin': 0, 'start_date': '2019-07-27', 'start_time': '09:40', 'end_time': '11:20', 'end_date': '2019-07-27', 'auth': { 'shop:reserve:personal_course_reserve|del': 1, 'shop:reserve:personal_course_reserve|checkin': 1 } }, { 'id': 100256717537549, 'coach_name': '丝绒', 'member_id': 56635117076730, 'member_name': '汤汤测试用户617', 'course_name': '核心马杀鸡', 'consume_name': '不限课程的课程包', 'reserve_status': 3, 'is_checkin': 0, 'start_date': '2019-07-26', 'start_time': '16:38', 'end_time': '17:08', 'end_date': '2019-07-26', 'auth': { 'shop:reserve:personal_course_reserve|del': 1, 'shop:reserve:personal_course_reserve|checkin': 1 } }, { 'id': 101853925278289, 'coach_name': '闵行店私教教练1', 'member_id': 56635117076730, 'member_name': '汤汤测试用户617', 'course_name': '闵行店的健美操', 'consume_name': '不限课程的课程包', 'reserve_status': 3, 'is_checkin': 0, 'start_date': '2019-07-22', 'start_time': '13:39', 'end_time': '14:29', 'end_date': '2019-07-22', 'auth': { 'shop:reserve:personal_course_reserve|del': 1, 'shop:reserve:personal_course_reserve|checkin': 1 } }, { 'id': 107532677349444, 'coach_name': '丝绒', 'member_id': 56635117076730, 'member_name': '汤汤测试用户617', 'course_name': '丝绒私教课测试', 'consume_name': '不限课程的课程包', 'reserve_status': 3, 'is_checkin': 0, 'start_date': '2019-07-24', 'start_time': '06:18', 'end_time': '06:58', 'end_date': '2019-07-24', 'auth': { 'shop:reserve:personal_course_reserve|del': 1, 'shop:reserve:personal_course_reserve|checkin': 1 } }, { 'id': 107532677349445, 'coach_name': '丝绒', 'member_id': 56635117076730, 'member_name': '汤汤测试用户617', 'course_name': '丝绒私教课测试', 'consume_name': '不限课程的课程包', 'reserve_status': 3, 'is_checkin': 0, 'start_date': '2019-07-24', 'start_time': '00:18', 'end_time': '00:58', 'end_date': '2019-07-24', 'auth': { 'shop:reserve:personal_course_reserve|del': 1, 'shop:reserve:personal_course_reserve|checkin': 1 } }, { 'id': 107532677349446, 'coach_name': '丝绒', 'member_id': 56635117076730, 'member_name': '汤汤测试用户617', 'course_name': '丝绒私教课测试', 'consume_name': '不限课程的课程包', 'reserve_status': 3, 'is_checkin': 0, 'start_date': '2019-07-24', 'start_time': '01:18', 'end_time': '01:58', 'end_date': '2019-07-24', 'auth': { 'shop:reserve:personal_course_reserve|del': 1, 'shop:reserve:personal_course_reserve|checkin': 1 } }, { 'id': 107532677349581, 'coach_name': '闵行店私教教练1', 'member_id': 56635117076730, 'member_name': '汤汤测试用户617', 'course_name': '汤汤好私教', 'consume_name': '固定课程（汤汤好私教）', 'reserve_status': 3, 'is_checkin': 1, 'start_date': '2019-07-22', 'start_time': '05:55', 'end_time': '07:35', 'end_date': '2019-07-22', 'auth': [] }, { 'id': 107532677349582,
        'coach_name': '闵行门店的私教3',
        'member_id': 56635117076730,
        'member_name': '汤汤测试用户617',
        'course_name': '丝绒私教课测试',
        'consume_name': '不限课程的课程包',
        'reserve_status': 3,
        'is_checkin': 0,
        'start_date': '2019-07-22',
        'start_time': '19:00',
        'end_time': '19:40',
        'end_date': '2019-07-22',
        'auth': { 'shop:reserve:personal_course_reserve|del': 1, 'shop:reserve:personal_course_reserve|checkin': 1 } }, { 'id': 96055669096767, 'coach_name': '团课教练汤汤测试勿动', 'member_id': 77159390052771, 'member_name': '汤汤汤测试', 'course_name': '汤汤好私教', 'consume_name': '范围内的课程（汤汤好私教）', 'reserve_status': 3, 'is_checkin': 0, 'start_date': '2019-07-27', 'start_time': '09:40', 'end_time': '11:20', 'end_date': '2019-07-27', 'auth': { 'shop:reserve:personal_course_reserve|del': 1, 'shop:reserve:personal_course_reserve|checkin': 1 } }, { 'id': 100256717537549, 'coach_name': '丝绒', 'member_id': 56635117076730, 'member_name': '汤汤测试用户617', 'course_name': '核心马杀鸡', 'consume_name': '不限课程的课程包', 'reserve_status': 3, 'is_checkin': 0, 'start_date': '2019-07-26', 'start_time': '16:38', 'end_time': '17:08', 'end_date': '2019-07-26', 'auth': { 'shop:reserve:personal_course_reserve|del': 1, 'shop:reserve:personal_course_reserve|checkin': 1 } }, { 'id': 101853925278289, 'coach_name': '闵行店私教教练1', 'member_id': 56635117076730, 'member_name': '汤汤测试用户617', 'course_name': '闵行店的健美操', 'consume_name': '不限课程的课程包', 'reserve_status': 3, 'is_checkin': 0, 'start_date': '2019-07-22', 'start_time': '13:39', 'end_time': '14:29', 'end_date': '2019-07-22', 'auth': { 'shop:reserve:personal_course_reserve|del': 1, 'shop:reserve:personal_course_reserve|checkin': 1 } }, { 'id': 107532677349444, 'coach_name': '丝绒', 'member_id': 56635117076730, 'member_name': '汤汤测试用户617', 'course_name': '丝绒私教课测试', 'consume_name': '不限课程的课程包', 'reserve_status': 3, 'is_checkin': 0, 'start_date': '2019-07-24', 'start_time': '06:18', 'end_time': '06:58', 'end_date': '2019-07-24', 'auth': { 'shop:reserve:personal_course_reserve|del': 1, 'shop:reserve:personal_course_reserve|checkin': 1 } }, { 'id': 107532677349445, 'coach_name': '丝绒', 'member_id': 56635117076730, 'member_name': '汤汤测试用户617', 'course_name': '丝绒私教课测试', 'consume_name': '不限课程的课程包', 'reserve_status': 3, 'is_checkin': 0, 'start_date': '2019-07-24', 'start_time': '00:18', 'end_time': '00:58', 'end_date': '2019-07-24', 'auth': { 'shop:reserve:personal_course_reserve|del': 1, 'shop:reserve:personal_course_reserve|checkin': 1 } }, { 'id': 107532677349446, 'coach_name': '丝绒', 'member_id': 56635117076730, 'member_name': '汤汤测试用户617', 'course_name': '丝绒私教课测试', 'consume_name': '不限课程的课程包', 'reserve_status': 3, 'is_checkin': 0, 'start_date': '2019-07-24', 'start_time': '01:18', 'end_time': '01:58', 'end_date': '2019-07-24', 'auth': { 'shop:reserve:personal_course_reserve|del': 1, 'shop:reserve:personal_course_reserve|checkin': 1 } }, { 'id': 107532677349581, 'coach_name': '闵行店私教教练1', 'member_id': 56635117076730, 'member_name': '汤汤测试用户617', 'course_name': '汤汤好私教', 'consume_name': '固定课程（汤汤好私教）', 'reserve_status': 3, 'is_checkin': 1, 'start_date': '2019-07-22', 'start_time': '05:55', 'end_time': '07:35', 'end_date': '2019-07-22', 'auth': [] }, { 'id': 107532677349582,
        'coach_name': '闵行门店的私教3',
        'member_id': 56635117076730,
        'member_name': '汤汤测试用户617',
        'course_name': '丝绒私教课测试',
        'consume_name': '不限课程的课程包',
        'reserve_status': 3,
        'is_checkin': 0,
        'start_date': '2019-07-22',
        'start_time': '19:00',
        'end_time': '19:40',
        'end_date': '2019-07-22',
        'auth': { 'shop:reserve:personal_course_reserve|del': 1, 'shop:reserve:personal_course_reserve|checkin': 1 } }, { 'id': 107532677349589, 'coach_name': '丝绒', 'member_id': 56635117076730, 'member_name': '汤汤测试用户617', 'course_name': '丝绒私教课测试', 'consume_name': '不限课程的课程包', 'reserve_status': 3, 'is_checkin': 0, 'start_date': '2019-07-24', 'start_time': '01:58', 'end_time': '02:38', 'end_date': '2019-07-24', 'auth': { 'shop:reserve:personal_course_reserve|del': 1, 'shop:reserve:personal_course_reserve|checkin': 1 } }, { 'id': 107532677349592, 'coach_name': '丝绒', 'member_id': 56635117076730, 'member_name': '汤汤测试用户617', 'course_name': '丝绒私教课测试', 'consume_name': '不限课程的课程包', 'reserve_status': 3, 'is_checkin': 0, 'start_date': '2019-07-24', 'start_time': '04:58', 'end_time': '05:38', 'end_date': '2019-07-24', 'auth': { 'shop:reserve:personal_course_reserve|del': 1, 'shop:reserve:personal_course_reserve|checkin': 1 } }, { 'id': 107532677349593, 'coach_name': '丝绒', 'member_id': 56635117076730, 'member_name': '汤汤测试用户617', 'course_name': '丝绒私教课测试', 'consume_name': '不限课程的课程包', 'reserve_status': 3, 'is_checkin': 0, 'start_date': '2019-07-24', 'start_time': '02:38', 'end_time': '03:18', 'end_date': '2019-07-24', 'auth': { 'shop:reserve:personal_course_reserve|del': 1, 'shop:reserve:personal_course_reserve|checkin': 1 } }]
    }
  },
  props: {
    addTitle: {
      type: String,
      default: '添加课程排期'
    }
  },
  computed: {
  },
  filters: {
    timeStr(val) {
      const time = val - 1
      return time < 9 ? `0${time}:00` : `${time}:00`
    },
    currentDay(val) {
      let weekOfday = moment(val.date).format('E')
      let date = moment(val.date).subtract(weekOfday - val.week, 'days').format('YYYY-MM-DD')
      let current = moment().format('YYYY-MM-DD')
      return date === current ? 'active' : ''
    },
    barClass(item) {
      const date = moment(`${item.start_date} ${item.start_time}`).valueOf()
      const current = moment().valueOf()
      if (date > current) {
        return 'after'
      } else if (date === current) {
        return 'current'
      } else if (date < current) {
        return 'before'
      }
    },
    dateString(val) {
      let weekOfday = moment(val.date).format('E')
      let week = moment(val.date).subtract(weekOfday - val.week, 'days').format('ddd')
      let date = moment(val.date).subtract(weekOfday - val.week, 'days').format('DD')
      return `${date} ${week}`
    }
  },
  methods: {
    oChangeDate(date) {
      this.start = date.start_time
      this.getWeeks()
    },
    onClickGetDay(item) {
      this.weeks = [item]
    },
    onClickGetCurrent() {
      let current = moment().format('YYYY-MM-DD')
      this.weeks = this.weeks.filter(item => {
        let weekOfday = moment(item.date).format('E')
        let date = moment(item.date).subtract(weekOfday - item.week, 'days').format('YYYY-MM-DD')
        return date === current
      })
    },
    getWeeks() {
      this.weeks = []
      for (let i = 1; i < 8; i++) {
        this.weeks.push({ week: i, date: this.start })
      }
    },
    myMatrix(n) {
      let weekOfday = moment(this.start).format('E')
      let date = moment(this.start).subtract(weekOfday - n, 'days').format('YYYY-MM-DD')
      const sortedList = this.cardList
        .filter(item => item.start_date === date)
        .map(item => {
          if (moment(item.end_date) > moment(item.start_date)) {
            item.overload = 1
          }
          item.start = toTen(item.start_time)
          item.end = toTen(item.end_time)
          return item
        })
        .sort((a, b) => {
          return a.start - b.start
        })

      const timeMatrix = []
      let prevStart
      let prevEnd
      let group = []
      let groupIndex = 0

      sortedList.forEach(item => {
        if (prevStart === undefined) {
          prevStart = item.start
          prevEnd = item.end
        } else {
          if (item.start < prevEnd) {
            if (item.end > prevEnd) {
              prevEnd = item.end
            }
          } else {
            // 以当前item标记开始位和结束位
            prevStart = item.start
            prevEnd = item.end
            // 添加分组
            group = []
            groupIndex++
          }
        }
        group.push(item)

        timeMatrix[groupIndex] = group
      })

      return timeMatrix
    },
    itemStyle(item) {
      return {
        top: `calc(${(item.start / 24) * 100}% + 40px)`,
        height: `${((item.end - item.start) / 24) * 100}%`
      }
    },
    onClickGetWeek() {
      this.getWeeks()
    },
    onChangeGetDate(date) {
      console.log(date)
      this.$modalRouter.push({
        name: 'schedule-team-add-course-schedule',
        props: { time: date }
      })
    }
  },
  created() {
    this.getWeeks()
  },
  components: {
    DateComponent,
    AddButton,
    Unit
  }
}
</script>
