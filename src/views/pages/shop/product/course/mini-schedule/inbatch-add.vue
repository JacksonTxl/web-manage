<template>
  <st-panel>
    <div :class="b()">
      <st-form :class="b('head')" labelWidth="80px">
        <st-form-item label="小班课名称" required>
          <a-select placeholder="请选择" v-model="coachId">
            <a-select-option
              v-for="coach in {}"
              :key="coach.id"
              :value="coach.id"
            >
              {{ coach.staff_name }}
            </a-select-option>
          </a-select>
        </st-form-item>
        <st-form-item required label="排课方式">
          <a-select placeholder="请选择" v-model="scheduleId">
            <a-select-option key="1" value="1">
              周排课方式
            </a-select-option>
            <a-select-option key="0" value="0">
              自定义排课方式
            </a-select-option>
          </a-select>
        </st-form-item>
      </st-form>
      <div :class="b('schedule')">
        <div v-if="scheduleId == 1">
          <st-container v-for="(scheduleItem, i) in scheduleList" :key="i">
            <st-form labelWidth="80px">
              <st-form-item
                required
                label="上课周期"
                :class="b('select__date')"
              >
                <a-range-picker
                  @change="onChangeRangePicker"
                  v-model="pickerList[i]"
                  :disabledDate="disabledEndDate"
                ></a-range-picker>
              </st-form-item>
            </st-form>
            <div :class="b('schedule__table')">
              <div
                :class="b('schedule__item')"
                v-for="(item, index) in weekList"
                :key="index"
              >
                <st-t4 class="mg-b12">{{ item.date }}</st-t4>
                <div v-if="filterDate[i][item.week][0].week">
                  <div
                    :class="b('schedule__card')"
                    v-for="cardItem in filterDate[i][item.week]"
                    :key="cardItem.coach_id"
                  >
                    <span class="time">
                      <st-icon type="timer"></st-icon>
                      {{ cardItem.start_time }}-{{ cardItem.end_time }}
                    </span>
                    <st-t3 class="course__name">
                      {{ cardItem.current_course_name }}
                    </st-t3>
                    <p class="course__coach">
                      {{ $c('coach') }}：
                      <span>{{ cardItem.coach_name }}</span>
                    </p>
                    <p class="course__scene">
                      场地：
                      <span>{{ cardItem.court_name }}</span>
                    </p>
                  </div>
                </div>
                <add-course :item="filterDate[i][item.week]"></add-course>
              </div>
            </div>
            <div :class="b('schedule__tips')">
              即：上课时间为
              <span class="schedule__tips-date">2019/7/11~2019/7/18</span>
              <span class="schedule__tips-time">每周一9: 00,</span>
              共
              <span class="schedule__tips-num">8</span>
              节
            </div>
          </st-container>
          <div :class="b('add-schedule-btn')">
            <a v-if="addScheduleFlag" @click="addScheduleWeek">新增上课周期</a>
            <span v-else>新增上课周期</span>
          </div>
        </div>
        <div v-else>
          <st-container v-for="(scheduleItem, i) in scheduleList" :key="i">
            <st-form labelWidth="80px">
              <st-form-item
                required
                label="上课周期"
                :class="b('select__date')"
              >
                <span>2019/7/11~2019/9/12</span>
              </st-form-item>
            </st-form>
            <div :class="b('schedule__table-custom')">
              <div
                :class="b('schedule__item-custom')"
                v-for="(item, index) in weekList"
                :key="index"
              >
                <span class="time">
                  <st-icon type="timer"></st-icon>
                  <!-- {{ cardItem.start_time }}-{{ cardItem.end_time }} -->
                  2019-12-12 11:30 ~ 13:00
                </span>
                <st-t3 class="course__name">高强度有氧进阶 4级</st-t3>
                <div class="course-message">
                  <p class="course__coach">
                    {{ $c('coach') }}：
                    <span>狼狼</span>
                  </p>
                  <p class="course__scene mg-l16">
                    场地：
                    <span>VIP场地</span>
                  </p>
                </div>
              </div>
              <add-course :item="weekList[0]"></add-course>
            </div>
          </st-container>
        </div>
        <div :class="b('save-schedule-btn')">
          <st-button>
            保存
          </st-button>
          <st-button type="primary" @click="onClickSaveSchedule" class="mg-l12">
            完成排课
          </st-button>
        </div>
      </div>
    </div>
  </st-panel>
</template>

<script>
import AddCourse from './add-course'

export default {
  name: 'AddScheduleInBatch',
  bem: {
    b: 'page-shop-schedule-inbatch-add'
  },
  // serviceInject() {
  //   return {
  //     commonService: PersonalScheduleCommonService,
  //     scheduleService: PersonalScheduleScheduleService
  //   }
  // },
  // rxState() {
  //   return {
  //     loading: this.scheduleService.loading$,
  //     coachOptions: this.commonService.coachInBatchOptions$
  //   }
  // },
  data() {
    return {
      coachId: undefined,
      scheduleId: '1',
      start_date: '2019-12-16',
      end_date: '2019-12-23',
      picker_start_date: '2019-12-16',
      picker_end_date: '2019-12-23',
      pickerList: [],
      disabledDate: [],
      weekList: [
        { week: 1, date: '周一' },
        { week: 2, date: '周二' },
        { week: 3, date: '周三' },
        { week: 4, date: '周四' },
        { week: 5, date: '周五' },
        { week: 6, date: '周六' },
        { week: 7, date: '周日' }
      ],
      filterDate: {},
      scheduleList: [
        {
          cycle_begin_date: '2019-12-11 00:09:00',
          cycle_end_date: '2019-12-19 00:18:00',
          cycle_id: 111,
          course_time: [
            {
              week: 1,
              list: [
                {
                  schedule_id: 1111,
                  course_id: 1,
                  coach_id: 1,
                  court_id: 1,
                  week: 1,
                  current_course_name: '当前课程名称',
                  start_time: '2019-01-01 09:00:00',
                  end_time: '2019-01-01 10:00:00',
                  show: false
                },
                {
                  schedule_id: 1111,
                  course_id: 1,
                  coach_id: 1,
                  court_id: 1,
                  week: 1,
                  start_time: '2019-01-01 09:00:00',
                  end_time: '2019-01-01 10:00:00',
                  show: false
                }
              ]
            }
          ]
        },
        {
          cycle_begin_date: '2019-12-11 00:09:00',
          cycle_end_date: '2019-12-19 00:18:00',
          cycle_id: 111,
          course_time: [
            {
              week: 2,
              list: [
                {
                  schedule_id: 1111,
                  course_id: 1,
                  coach_id: 1,
                  court_id: 1,
                  week: 2,
                  current_course_name: '当前课程名称',
                  start_time: '2019-01-01 09:00:00',
                  end_time: '2019-01-01 10:00:00',
                  show: false
                },
                {
                  schedule_id: 1111,
                  course_id: 1,
                  coach_id: 1,
                  court_id: 1,
                  week: 2,
                  start_time: '2019-01-01 09:00:00',
                  end_time: '2019-01-01 10:00:00',
                  show: false
                }
              ]
            }
          ]
        },
        {
          cycle_begin_date: '2019-12-11 00:09:00',
          cycle_end_date: '2019-12-19 00:18:00',
          cycle_id: 111,
          course_time: [
            {
              week: 5,
              list: [
                {
                  schedule_id: 1111,
                  course_id: 1,
                  coach_id: 1,
                  court_id: 1,
                  week: 5,
                  current_course_name: '当前课程名称',
                  start_time: '2019-01-01 09:00:00',
                  end_time: '2019-01-01 10:00:00',
                  show: false
                },
                {
                  schedule_id: 1111,
                  course_id: 1,
                  coach_id: 1,
                  court_id: 1,
                  week: 5,
                  start_time: '2019-01-01 09:00:00',
                  end_time: '2019-01-01 10:00:00',
                  show: false
                }
              ]
            }
          ]
        }
      ]
    }
  },
  watch: {
    scheduleId(newVal) {
      console.log(newVal)
    }
  },
  computed: {
    addScheduleFlag() {
      return this.end_date != this.picker_end_date
    }
  },
  created() {
    // console.log(this.scheduleList[0].scheduleInfo['date1'])
    // this.pickerList[0] = moment(this.start_date)
    // this.pickerList[1] = moment(this.end_date)
    this.pickerList.push([moment(this.start_date), moment(this.end_date)])
    this.filterDateList(this.scheduleList)
  },
  methods: {
    onChangeRangePicker(val, dateString) {
      this.picker_start_date = val[0].format('YYYY-MM-DD').valueOf()
      this.picker_end_date = val[1].format('YYYY-MM-DD').valueOf()
      console.log(this.picker_end_date)
    },
    disabledEndDate(current) {
      return (
        (current && current > moment(this.end_date).valueOf()) ||
        current < moment(this.start_date).valueOf()
      )
    },
    hide() {
      this.weekList[0].show = false
    },
    filterDateList(dateList) {
      let list = []
      let listItemCard
      dateList.forEach((item, index) => {
        item.course_time.forEach((item, index) => {
          listItemCard = {}
          if (item.week) {
            if (!listItemCard[item.week]) {
              listItemCard[item.week] = item.list
              listItemCard[item.week][0].show = false
            }
          }
          for (let i = 1; i <= 7; i++) {
            if (!listItemCard[i]) {
              listItemCard[i] = []
              let item = {}
              item.show = false
              listItemCard[i].push(item)
            }
          }
        })
        list.push(listItemCard)
      })
      console.log(list)
      this.filterDate = list
    },
    // 增加课程
    addCourse() {},
    // 新增周期排课
    addScheduleWeek() {
      this.pickerList.push([
        moment(
          moment(this.picker_end_date)
            .add(1, 'days')
            .valueOf()
        ),
        moment(this.end_date)
      ])
      let item = {}
      item.course_time = []
      this.scheduleList.push(item)
      this.filterDateList(this.scheduleList)
    },
    onClickSaveSchedule() {
      this.$router.push({
        path: '/shop/product/course/mini-schedule/inbatch-info',
        query: {
          schedule_id: this.scheduleId
        }
        // on: {
        //   ok: res => {
        //     this.onScheduleChange()
        //   }
        // }
      })
    }
    // save() {
    //   let reqdata = {
    //     id: this.coachId,
    //     schedule_start_time: this.start,
    //     schedule_end_time: this.end,
    //     scheduleInfo: this.scheduleInfo
    //   }
    //   this.scheduleService.addScheduleInBatch(reqdata).subscribe(() => {
    //     this.show = false
    //     this.$router.push({
    //       query: {
    //         ...this.$searchQuery
    //       }
    //     })
    //   })
    // }
  },
  components: {
    AddCourse
  }
}
</script>
