<template>
  <st-panel>
    <div :class="b()">
      <st-form :class="b('head')" labelWidth="80px" :form="form">
        <st-form-item :label="`${$c('small_course')}`" required>
          <a-select
            placeholder="请选择"
            @change="onChangeCourse"
            v-decorator="decorators.course_id"
          >
            <a-select-option
              v-for="course in courseSmallCourseOptions"
              :key="course.course_id"
              :value="course.course_id"
            >
              {{ course.course_name }}
            </a-select-option>
          </a-select>
        </st-form-item>
        <st-form-item required label="排课方式">
          <a-select placeholder="请选择" v-model="cycle_type">
            <a-select-option :key="1" :value="1">
              周排课方式
            </a-select-option>
            <a-select-option :key="0" :value="0">
              自定义排课方式
            </a-select-option>
          </a-select>
        </st-form-item>
      </st-form>
      <div :class="b('schedule')">
        <div v-if="cycle_type == 1">
          <st-container v-for="(scheduleItem, i) in scheduleList" :key="i">
            <st-form labelWidth="80px">
              <st-form-item
                required
                label="上课周期"
                :class="b('select__date')"
              >
                <a-range-picker
                  @change="onChangeRangePicker($event, $event, i)"
                  v-model="pickerList[i]"
                  :disabledDate="disabledEndDate"
                ></a-range-picker>
              </st-form-item>
            </st-form>
            <div :class="b('schedule__table')">
              <div
                :class="b('schedule__item')"
                v-for="item in weekList"
                :key="item.weekId"
              >
                <st-t4 class="mg-b12">{{ item.date }}</st-t4>
                <div v-if="filterDate[i][item.week][0].week">
                  <div
                    :class="b('schedule__card')"
                    v-for="(cardItem, index) in filterDate[i][item.week]"
                    :key="cardItem.coach_id"
                  >
                    <course-card-popover
                      :cardItem="cardItem"
                      @onEditCourse="onEditCourseSchedule(cardItem, i, index)"
                      @onDeleteCourse="
                        onDeleteCourseSchedule(cardItem, i, index)
                      "
                    ></course-card-popover>
                  </div>
                </div>
                <add-course
                  @addCourse="pushCourseInfo"
                  :item="filterDate[i][item.week]"
                  :disabledAddCourseBtn="disabledAddCourseBtn"
                  :cycleIndex="i"
                  :week="item.week"
                  :cycle="pickerList[i]"
                  :cycle_type="cycle_type"
                ></add-course>
              </div>
            </div>
            <div :class="b('schedule__tips')" v-if="pickerList.length">
              即：上课时间为
              <span class="schedule__tips-date">
                {{ pickerList[i][0].format('YYYY/MM/DD').valueOf() }}~{{
                  pickerList[i][1].format('YYYY/MM/DD').valueOf()
                }}
              </span>
              <span class="schedule__tips-time">{{ tipsText[i] }}</span>
              共
              <span class="schedule__tips-num">{{ tipsCourseNum[i] }}</span>
              节
            </div>
          </st-container>
          <div :class="b('add-schedule-btn')">
            <a v-if="addScheduleFlag" @click="addScheduleWeek">新增上课周期</a>
            <span v-else>新增上课周期</span>
          </div>
        </div>
        <div v-else>
          <st-container>
            <st-form labelWidth="80px">
              <st-form-item
                required
                label="上课周期"
                :class="b('select__date')"
              >
                <span>
                  {{ pickerList[0][0].format('YYYY/MM/DD').valueOf() }}~{{
                    pickerList[0][1].format('YYYY/MM/DD').valueOf()
                  }}
                </span>
              </st-form-item>
            </st-form>
            <div :class="b('schedule__table-custom')">
              <div
                :class="b('schedule__item-custom')"
                v-for="(item, index) in customizeScheduleList"
                :key="index"
              >
                <div class="eidt-current-course-btns">
                  <a
                    href="javascript:;"
                    @click="onEditCustomSchedule(item, index)"
                  >
                    <st-icon type="edit" class="edit-course-btn"></st-icon>
                  </a>
                  <a href="javascript:;" @click="onDeleteCustomSchedule(index)">
                    <st-icon type="delete" class="delete-course-btn"></st-icon>
                  </a>
                </div>
                <span class="time">
                  <st-icon type="timer"></st-icon>
                  {{ item.start_time }}-{{ item.end_time }}
                </span>
                <st-t3 class="course__name">
                  {{ item.course_name }}
                </st-t3>
                <div class="course-message">
                  <p class="course__coach">
                    {{ $c('coach') }}：
                    <span>{{ item.coach_name }}</span>
                  </p>
                  <p class="course__scene mg-l16">
                    场地：
                    <span>{{ item.court_name }}</span>
                  </p>
                </div>
              </div>
              <add-course
                :customizeShow="customizeShow"
                :disabledCustomBtn="disabledCustomBtn"
                @addCustomCourse="pushCustomCourseInfo"
                :cycle_type="cycle_type"
              ></add-course>
            </div>
          </st-container>
        </div>
        <div :class="b('save-schedule-btn')">
          <st-button @click="onClickGoBack">
            取消
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
import moment from 'moment'
import AddCourse from './add-course'
import CourseCardPopover from './course-card-popover'
import { SmallCourseScheduleService } from '@/views/pages/shop/product/course/schedule/small-course/service#/schedule.service'
import { SmallCourseScheduleCommonService } from '@/views/pages/shop/product/course/schedule/small-course/service#/common.service'
import { InbatchAddService } from './inbatch-add.service'
import ScheduleSmallCourseEditCourse from '@/views/biz-modals/schedule/small-course/edit-course'
import ScheduleSmallCourseSubmitCourse from '@/views/biz-modals/schedule/small-course/submit-course'
import { ruleOptions } from './inbatch-add.config'
export default {
  name: 'AddScheduleInBatch',
  bem: {
    b: 'page-shop-schedule-inbatch-add'
  },
  modals: {
    ScheduleSmallCourseEditCourse,
    ScheduleSmallCourseSubmitCourse
  },
  serviceInject() {
    return {
      inbatchAddService: InbatchAddService,
      smallCourseScheduleService: SmallCourseScheduleService,
      smallCourseScheduleCommonService: SmallCourseScheduleCommonService
    }
  },
  rxState() {
    const scsc = this.smallCourseScheduleCommonService
    return {
      courseSmallCourseOptions: scsc.courseSmallCourseOptions$
    }
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      showList: false,
      form,
      decorators,
      moment: moment,
      customizeShow: false,
      disabledAddCourseBtn: true,
      disabledCustomBtn: true,
      coachId: undefined,
      cycle_type: 1,
      start_date: '2019-12-16',
      end_date: '2019-12-30',
      picker_start_date: '2019-12-16',
      picker_end_date: '2019-12-30',
      pickerList: [],
      disabledDate: [],
      tipsText: [],
      tipsCourseNum: [],
      smallCourseInfo: '',
      weekList: [
        { weekId: 'week1', week: 1, date: '周一' },
        { weekId: 'week2', week: 2, date: '周二' },
        { weekId: 'week3', week: 3, date: '周三' },
        { weekId: 'week4', week: 4, date: '周四' },
        { weekId: 'week5', week: 5, date: '周五' },
        { weekId: 'week6', week: 6, date: '周六' },
        { weekId: 'week7', week: 7, date: '周日' }
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
                  coach_id: 53705630613549,
                  court_id: {
                    children: [{ id: 232748355223619, name: '54e' }],
                    id: 181184018055233,
                    name: '测试VIP区域'
                  },
                  week: 1,
                  current_course_name: '当前课程名称',
                  start_time: '2019-12-17 09:00:00',
                  end_time: '2019-01-01 10:00:00',
                  coach_name: '张张',
                  court_name: '测试VIP区域'
                },
                {
                  schedule_id: 1111,
                  course_id: 2,
                  coach_id: 2,
                  court_id: 181184018055233,
                  week: 1,
                  start_time: '2019-01-01 09:00:00',
                  end_time: '2019-01-01 10:00:00',
                  coach_name: '张张',
                  court_name: '测试VIP区域'
                }
              ]
            },
            {
              week: 2,
              list: [
                {
                  schedule_id: 1111,
                  course_id: 1,
                  coach_id: 3,
                  court_id: 1,
                  week: 2,
                  current_course_name: '当前课程名称',
                  start_time: '2019-01-01 09:00:00',
                  end_time: '2019-01-01 10:00:00'
                },
                {
                  schedule_id: 1111,
                  course_id: 2,
                  coach_id: 2,
                  court_id: 2,
                  week: 2,
                  start_time: '2019-01-01 09:00:00',
                  end_time: '2019-01-01 10:00:00'
                }
              ]
            }
          ]
        }
      ],
      customizeScheduleList: []
    }
  },
  computed: {
    addScheduleFlag() {
      return !(this.end_date === this.picker_end_date)
    }
  },
  watch: {
    // filterDate(newVal) {
    //   console.log(newVal)
    // },
    // deep: true
  },
  created() {
    this.filterDateList(this.scheduleList)
    this.pickerList.push([moment(), moment()])
  },
  methods: {
    dealScheduleDate() {
      this.scheduleList.forEach((item, index) => {
        this.pickerList[index] = [
          moment(item.cycle_begin_date),
          moment(item.cycle_end_date)
        ]
      })
    },
    onChangeCourse(value) {
      this.courseSmallCourseOptions.forEach((item, index) => {
        if (item.course_id === value) {
          this.smallCourseInfo = item
        }
      })
      const params = {
        course_id: value,
        cycle_type: 1
      }
      this.smallCourseScheduleService
        .editScheduleInBatch(params)
        .subscribe(res => {
          console.log(res)
        })
      // 用回显数据判断是新增还是编辑
      if (
        this.scheduleList.length &&
        this.smallCourseInfo.small_course_type === 1
      ) {
        this.dealScheduleDate(this.scheduleList)
      } else if (
        !this.scheduleList.length &&
        this.smallCourseInfo.small_course_type === 1
      ) {
        this.pickerList[0] = [
          moment(this.smallCourseInfo.course_begin_time),
          moment(this.smallCourseInfo.course_end_time)
        ]
      } else if (this.smallCourseInfo.small_course_type === 2) {
        this.pickerList[0] = [
          moment(this.smallCourseInfo.course_begin_time),
          moment(this.smallCourseInfo.course_end_time)
        ]
      }
      console.log(this.smallCourseInfo)
      this.disabledAddCourseBtn = false
      this.disabledCustomBtn = false
      this.filterDateList(this.scheduleList)
    },
    onChangeRangePicker(date, dateString, PickerIndex) {
      // this.picker_start_date = date[0].format('YYYY-MM-DD').valueOf()
      this.picker_end_date = date[1].format('YYYY-MM-DD').valueOf()
      //console.log(this.pickerList)
      let pickerFlag = false
      this.pickerList.forEach((item, index) => {
        console.log(item)
        if (PickerIndex === index) {
          return
        } else {
          if (
            (date[0] >= item[0] && date[0] <= item[1]) ||
            (date[1] >= item[0] && date[1] <= item[1])
          ) {
            console.log('时间有交叉')
            pickerFlag = true
            return false
          }
        }
      })
      if (!pickerFlag) {
        this.pickerList[PickerIndex][0] = date[0]
        this.pickerList[PickerIndex][1] = date[1]
        this.scheduleList[PickerIndex].cycle_begin_date = date[0]
          .format('YYYY-MM-DD')
          .valueOf()
        this.scheduleList[PickerIndex].cycle_end_date = date[1]
          .format('YYYY-MM-DD')
          .valueOf()
      }
      console.log(this.pickerList)
    },
    disabledEndDate(current) {
      return (
        (current && current > moment(this.end_date).valueOf()) ||
        current < moment(this.start_date).valueOf()
      )
    },
    getScheduleTips(index, text, courseNum) {
      this.tipsText[index] = text
      this.tipsCourseNum[index] = courseNum
    },
    filterDateList(dateList) {
      let list = []
      dateList.forEach((item, dateIndex) => {
        let listItemCard = {} //批次的大的集合对象
        let courseNum = 0
        let text = ''
        item.course_time.forEach((item, index) => {
          if (item.week) {
            courseNum += item.list.length
            text += this.weekList[item.week - 1].date
            item.list.forEach((item, index) => {
              item.show = false
              if (!item.conflict) {
                item.conflict = 0
                item.conflictList = []
              }
              text += item.start_time + ','
            })
            this.getScheduleTips(dateIndex, text, courseNum)
            listItemCard[item.week] = item.list
            listItemCard[item.week][0].show = false
          }
        })
        for (let i = 1; i <= 7; i++) {
          if (!listItemCard[i]) {
            listItemCard[i] = []
            let item = {}
            item.show = false
            listItemCard[i].push(item)
          }
        }
        list.push(listItemCard)
      })
      console.log(list)
      console.log(dateList)
      this.filterDate = list
      // if (this.disabledAddCourseBtn) {
      //   this.filterDate = list
      // } else {
      //   this.$nextTick(function() {
      //     this.filterDate = list
      //   })
      // }
    },
    // 增加课程
    createCourseWeek(week, courseItem, courseTime) {
      let courseWeek = {}
      courseWeek.week = week
      courseWeek.list = []
      courseWeek.list.push(courseItem)
      courseTime.push(courseWeek)
      this.filterDateList(this.scheduleList)
    },
    pushCourseInfo(cycleIndex, conflict, info, list) {
      let courseItem = {
        schedule_id: this.schedule_id,
        course_id: info.course_id,
        coach_id: info.coach_id,
        court_id: info.court_id,
        week: info.week,
        current_course_name: info.courseMessage,
        start_time: info.start_time,
        end_time: info.end_time,
        conflict: conflict,
        conflictList: list
      }
      if (!this.scheduleList[cycleIndex].course_time.length) {
        console.log('批次是否有数据')
        this.createCourseWeek(
          week,
          courseItem,
          this.scheduleList[cycleIndex].course_time
        )
        return
      }
      let findWeekFlag = false
      this.scheduleList[cycleIndex].course_time.forEach((item, index) => {
        if (item.week === week) {
          console.log('匹配对应的周几')
          findWeekFlag = true
          item.list.push(courseItem)
          this.filterDateList(this.scheduleList)
        }
      })
      if (!findWeekFlag) {
        console.log('无对应周几，添加一个周几列')
        this.createCourseWeek(
          week,
          courseItem,
          this.scheduleList[cycleIndex].course_time
        )
        console.log(this.scheduleList)
      }
    },
    pushCustomCourseInfo(conflict, info, list) {
      console.log(info)
      let courseItem = {
        course_id: info.course_id,
        coach_id: info.coach_id,
        court_id: info.court_id,
        court_site_id: info.court_site_id,
        course_name: info.course_name,
        coach_name: info.coach_name,
        court_name: info.court_name,
        current_course_name: info.courseMessage,
        start_time: info.start_time,
        end_time: info.end_time,
        conflict: conflict,
        conflictList: list
      }
      this.customizeScheduleList.push(courseItem)
    },
    // 编辑课程
    onEditCourseSchedule(item, cycleIndex, positionIndex) {
      const cycle = this.pickerList[cycleIndex]
      const cycle_type = this.cycle_type
      this.$modalRouter.push({
        name: 'schedule-small-course-edit-course',
        props: { item, cycleIndex, cycle, positionIndex, cycle_type },
        on: {
          editCourse: (cycleIndex, positionIndex, conflict, info, list) => {
            this.scheduleList[cycleIndex].course_time.forEach(
              (dayItems, index) => {
                if (dayItems.week === info.week) {
                  let weekItem = dayItems.list[positionIndex]
                  dayItems.list[positionIndex] = info
                  // ;(weekItem.start_time = info.start_time),
                  //   (weekItem.current_course_name = info.current_course_name),
                  //   (weekItem.coach_name = info.coach_name),
                  //   (weekItem.court_name = info.court_name),
                  dayItems.list[positionIndex].conflictList = list
                  dayItems.list[positionIndex].conflict = conflict
                  this.filterDateList(this.scheduleList)
                  return
                }
              }
            )
          }
        }
      })
    },
    // 删除课程
    onDeleteCourseSchedule(item, cycleIndex, positionIndex) {
      this.scheduleList[cycleIndex].course_time.forEach((dayItems, index) => {
        if (dayItems.week === item.week) {
          dayItems.list.splice(positionIndex, 1)
          if (dayItems.list.length === 0) {
            this.scheduleList[cycleIndex].course_time.splice(index, 1)
          }
          this.filterDateList(this.scheduleList)
          return
        }
      })
    },
    onDeleteCustomSchedule(index) {
      this.customizeScheduleList.splice(index, 1)
    },
    onEditCustomSchedule(initem, positionIndexdex) {
      this.$modalRouter.push({
        name: 'schedule-small-course-edit-course',
        props: { item, positionIndex },
        on: {
          editCourse: (cycleIndex, positionIndex, conflict, info, list) => {
            this.customizeScheduleList[positionIndex] = info
            // ;(this.customizeScheduleList[positionIndex].start_time =
            //   info.start_time),
            //   (this.customizeScheduleList[positionIndex].current_course_name =
            //     info.current_course_name),
            //   (this.customizeScheduleList[positionIndex].coach_name =
            //     info.coach_name),
            //   (this.customizeScheduleList[positionIndex].court_name =
            //     info.court_name),
            this.customizeScheduleList[positionIndex].conflictList = list
            this.customizeScheduleList[positionIndex].conflict = conflict
            return
          }
        }
      })
    },
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
      this.picker_end_date = this.end_date
      console.log(this.pickerList)
      let item = {}
      item.course_time = []
      this.scheduleList.push(item)
      this.filterDateList(this.scheduleList)
    },
    onClickSaveSchedule() {
      let courseList
      if (this.cycle_type === 0) {
        courseList = this.customizeScheduleList
      }
      const courseScheduleList = this.scheduleList
      const smallCourseInfo = this.smallCourseInfo
      const courseNum = this.tipsCourseNum
      const cycle_type = this.cycle_type
      console.log(smallCourseInfo)
      this.$modalRouter.push({
        name: 'schedule-small-course-submit-course',
        props: {
          scheduleList: courseList,
          courseInfo: smallCourseInfo,
          cycle_type: cycle_type,
          courseNum: courseNum
        },
        on: {
          // editCourse: (cycleIndex, week, positionIndex) => {
          // }
        }
      })
    },
    onClickGoBack() {
      let weekOfday = moment().format('E')
      let start_date = moment()
        .subtract(weekOfday - 1, 'days')
        .format('YYYY-MM-DD')
      let end_date = moment()
        .add(7 - weekOfday, 'days')
        .format('YYYY-MM-DD')
      this.$router.push({
        path: '/shop/product/course/schedule/small-course/small-course',
        query: {
          start_date,
          end_date
        }
      })
    },
    formatTime(time) {
      let t = moment(time).format('HH:mm')
      console.log(t)
    }
  },
  components: {
    AddCourse,
    CourseCardPopover
  }
}
</script>
