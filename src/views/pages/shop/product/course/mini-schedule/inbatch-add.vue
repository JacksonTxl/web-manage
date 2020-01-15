<template>
  <st-panel app>
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
              :value="+course.course_id"
            >
              {{ course.course_name }}
            </a-select-option>
          </a-select>
        </st-form-item>
        <st-form-item required label="排课方式">
          <a-select
            placeholder="请选择"
            @change="onChangeScheduleType"
            v-model="select_cycle_type"
          >
            <a-select-option :key="1" :value="1">
              周排课方式
            </a-select-option>
            <a-select-option :key="2" :value="2">
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
                  :value="pickerList[i]"
                  :disabledDate="disabledEndDate"
                  format="YYYY-MM-DD"
                ></a-range-picker>
              </st-form-item>
              <div
                :class="
                  scheduleList.length > 1
                    ? [b('delete-btn'), b('delete')]
                    : [b('delete-btn'), b('disabled-delete')]
                "
                @click="onDeleteCycleSchedule(i)"
              >
                <st-icon type="delete" class="delete-course-btn"></st-icon>
                删除排期
              </div>
            </st-form>
            <div :class="b('schedule__table')">
              <div
                :class="b('schedule__item')"
                v-for="item in weekList"
                :key="item.weekId"
              >
                <st-t4 class="mg-b12">{{ item.date }}</st-t4>
                <div
                  v-if="
                    filterDate[i][item.week][0].week ||
                      filterDate[i][item.week][0].week == 0
                  "
                >
                  <div
                    :class="b('schedule__card')"
                    v-for="(cardItem, index) in filterDate[i][item.week]"
                    :key="cardItem.schedule_ids"
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
                  :courseInfo="smallCourseInfo"
                  :editScheduleCycleFlag="editScheduleCycleFlag"
                ></add-course>
              </div>
            </div>
            <div :class="b('schedule__tips')" v-if="pickerList.length">
              即：上课时间为
              <span class="schedule__tips-date">
                {{ pickerList[i][0].format('YYYY/MM/DD') }}~{{
                  pickerList[i][1].format('YYYY/MM/DD')
                }}
              </span>
              <span class="schedule__tips-time">{{ tipsText[i] }}</span>
              共
              <span class="schedule__tips-num" v-if="tipsCourseNum[i]">
                {{ tipsCourseNum[i] }}
              </span>
              节
            </div>
          </st-container>
          <div :class="b('add-schedule-btn')">
            <a v-if="addScheduleFlag" @click="addScheduleWeek">
              新增上课周期
            </a>
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
                  {{ smallCourseInfo.course_begin_time }} ~
                  {{ smallCourseInfo.course_end_time }}
                </span>
              </st-form-item>
            </st-form>
            <div :class="b('schedule__table-custom')">
              <div
                :class="b('schedule__item-custom')"
                v-for="(item, index) in customizeScheduleList"
                :key="item.id"
              >
                <div class="eidt-current-course-btns">
                  <a @click="onEditCustomSchedule(item, index)">
                    <st-icon type="edit" class="edit-course-btn"></st-icon>
                  </a>
                  <a @click="onDeleteCustomSchedule(item, index)">
                    <st-icon type="delete" class="delete-course-btn"></st-icon>
                  </a>
                </div>
                <span class="time">
                  <st-icon type="timer"></st-icon>
                  {{ item.start_time }} -
                  {{ item.end_time }}
                </span>
                <st-t3 class="course__name">
                  {{ item.current_course_name }}
                </st-t3>
                <div class="course-message">
                  <p class="course__coach">
                    {{ $c('coach') }}：
                    <span>{{ item.coach_name }}</span>
                  </p>
                  <p class="course__scene mg-l16">
                    场地：
                    <span>
                      {{
                        dealCourtSiteName(item.court_name, item.court_site_name)
                      }}
                    </span>
                  </p>
                </div>
              </div>
              <add-course
                :customizeShow="customizeShow"
                :disabledCustomBtn="disabledCustomBtn"
                @addCustomCourse="pushCustomCourseInfo"
                :cycle="smallPickerList"
                :cycle_type="cycle_type"
                :courseInfo="smallCourseInfo"
                :editScheduleCycleFlag="editScheduleCycleFlag"
              ></add-course>
            </div>
          </st-container>
        </div>
        <div :class="b('save-schedule-btn')">
          <st-button @click="onDeleteScheduleAll">
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
import { MessageService } from '@/services/message.service'
import { DELETE_TYPE } from '@/constants/stat/course'
import { SCHEDULE_CODE } from '@/constants/course/small-course'
import { cloneDeep } from 'lodash-es'
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
      smallCourseScheduleCommonService: SmallCourseScheduleCommonService,
      msg: MessageService
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
      SCHEDULE_CODE,
      showList: false,
      form,
      decorators,
      moment: moment,
      customizeShow: false,
      disabledAddCourseBtn: true,
      disabledCustomBtn: true,
      coachId: undefined,
      editScheduleCycleFlag: false,
      courseId: '',
      cycle_type: 1,
      select_cycle_type: 1,
      start_date: '',
      end_date: '',
      picker_start_date: '',
      picker_end_date: '',
      smallPickerList: [],
      pickerList: [],
      disabledDate: [],
      tipsText: [],
      tipsCourseNum: [],
      scheduleIdList: [],
      smallCourseInfo: {},
      weekList: [
        { weekId: 'week1', week: 1, date: '周一' },
        { weekId: 'week2', week: 2, date: '周二' },
        { weekId: 'week3', week: 3, date: '周三' },
        { weekId: 'week4', week: 4, date: '周四' },
        { weekId: 'week5', week: 5, date: '周五' },
        { weekId: 'week6', week: 6, date: '周六' },
        { weekId: 'week0', week: 0, date: '周日' }
      ],
      filterDate: {},
      scheduleList: [
        {
          course_time: []
        }
      ],
      customizeScheduleList: []
    }
  },
  computed: {
    addScheduleFlag() {
      return this.end_date !== this.picker_end_date
    }
  },
  created() {
    this.filterDateList(this.scheduleList)
    this.pickerList.push([moment(), moment()])
  },
  methods: {
    dealScheduleDate() {
      this.pickerList = []
      this.scheduleList.forEach((item, index) => {
        this.pickerList.push([
          moment(item.cycle_start_date),
          moment(item.cycle_end_date)
        ])
      })
      this.picker_end_date = this.scheduleList[
        this.scheduleList.length - 1
      ].cycle_end_date
    },
    initScheduleDate() {
      const smallCourseInfo = this.smallCourseInfo
      this.pickerList = []
      this.pickerList.push([
        moment(smallCourseInfo.course_begin_time),
        moment(smallCourseInfo.course_end_time)
      ])
      this.end_date = moment(smallCourseInfo.course_end_time).format(
        'YYYY-MM-DD'
      )
      this.picker_end_date = moment(smallCourseInfo.course_end_time).format(
        'YYYY-MM-DD'
      )
    },
    initScheduleCourse() {
      this.customizeScheduleList = []
      this.scheduleList = [
        {
          course_time: []
        }
      ]
      this.filterDateList(this.scheduleList)
    },
    onChangeCourse(value) {
      this.getCourseInfo(value)
    },
    getCourseInfo(value) {
      this.courseSmallCourseOptions.forEach((item, index) => {
        if (item.course_id === value) {
          this.smallCourseInfo = item
        }
      })
      console.log('课程信息')
      console.log(this.smallCourseInfo)
      this.start_date = this.smallCourseInfo.course_begin_time
      this.end_date = this.smallCourseInfo.course_end_time
      const start_date = this.start_date
      const end_date = this.end_date
      this.smallPickerList = [moment(start_date), moment(end_date)]
      this.courseId = value
      const params = {}
      params.course_id = this.courseId
      this.getScheduleInBatch(params)
      this.smallCourseScheduleCommonService.getBindCoachList(value).subscribe()
    },
    onChangeScheduleType(value) {
      if (!this.courseId) {
        this.select_cycle_type = value
        this.cycle_type = value
        return
      }
      const params = {
        course_id: this.courseId,
        cycle_type: value
      }
      let hasCoursesFlag = false
      if (this.cycle_type === 1) {
        this.scheduleList.forEach((item, index) => {
          if (item.course_time.length > 0) {
            hasCoursesFlag = true
          }
        })
      }
      if (hasCoursesFlag) {
        this.$confirm({
          title: '提示',
          content: `切换为自定义排课方式后，若需切换回周期排课，已排课程无法保存，确认切换？`,
          onCancel: () => {
            this.select_cycle_type = 1
          },
          onOk: () => {
            this.getScheduleInBatch(params, value)
          }
        })
      } else {
        this.getScheduleInBatch(params, value)
      }
    },
    getScheduleInBatch(params, changeTyps) {
      this.smallCourseScheduleService.getScheduleInBatch(params).subscribe(
        res => {
          this.disabledAddCourseBtn = false
          this.disabledCustomBtn = false
          this.initScheduleList(res.list, res.cycle_type, changeTyps)
        },
        err => {
          if (err.response.code === SCHEDULE_CODE.ERR) {
            this.select_cycle_type = 2
            this.$warning({
              title: '提示',
              okText: '我知道了',
              content: `已有排课信息，无法切换为周期排课，若需切换，请先删除排课信息`,
              onOk: () => {}
            })
          }
        }
      )
    },
    initScheduleList(list, type, changeTyps) {
      if (type) {
        this.cycle_type = type
        this.select_cycle_type = type
      }
      if (changeTyps) {
        this.cycle_type = changeTyps
        this.select_cycle_type = changeTyps
      }
      if (!type && !changeTyps) {
        this.cycle_type = 1
        this.select_cycle_type = 1
      }
      if (!list.length && type === 0) {
        this.initScheduleDate()
        this.initScheduleCourse()
        return
      }
      if (list.length && this.cycle_type === 1) {
        this.scheduleList = list
        this.dealScheduleDate(this.scheduleList)
        this.filterDateList(this.scheduleList)
      } else if (!list.length && this.cycle_type === 1) {
        this.initScheduleDate()
        this.initScheduleCourse()
      } else if (this.cycle_type === 2 && list.length) {
        this.initScheduleCourse()
        this.customizeScheduleList = list
      }
    },
    onChangeRangePicker(date, dateString, pickerIndex) {
      if (!this.courseId) {
        return
      }
      let pickerFlag = false
      this.pickerList.forEach((item, index) => {
        if (pickerIndex === index) {
          return
        } else {
          if (
            (date[0] >= item[0] && date[0] <= item[1]) ||
            (date[1] >= item[0] && date[1] <= item[1])
          ) {
            this.msg.error({ content: '排课周期时间不能有交叉重叠！' })
            pickerFlag = true
            return false
          }
        }
      })
      if (!pickerFlag) {
        if (
          this.cycle_type === 1 &&
          this.scheduleList[pickerIndex].course_time.length > 0
        ) {
          this.$confirm({
            title: '提示',
            content: `修改后会清空当前周期下的已有小班课排期，请确认修改`,
            onCancel: () => {
              const oldDate = this.pickerList[pickerIndex]
              this.pickerList.splice(pickerIndex, 1, oldDate)
            },
            onOk: () => {
              this.onDeleteCourseScheduleCycle([date[0], date[1]], pickerIndex)
            }
          })
        } else {
          this.picker_end_date = date[1].format('YYYY-MM-DD')
          this.pickerList.splice(pickerIndex, 1, date)
        }
      }
    },
    disabledEndDate(current) {
      return (
        (current && current > moment(this.end_date)) ||
        current < moment(this.start_date)
      )
    },
    getScheduleTips(index, text, courseNum) {
      this.tipsText[index] = text
      this.tipsCourseNum[index] = courseNum
    },
    filterDateList(dateList) {
      let list = []
      dateList.forEach((item, dateIndex) => {
        let listItemCard = {}
        let courseNum = 0
        let text = ''
        item.course_time.forEach((weekItem, index) => {
          if (weekItem.week || weekItem.week == 0) {
            if (weekItem.week == 0) {
              text += this.weekList[this.weekList.length - 1].date
            } else {
              text += this.weekList[weekItem.week - 1].date
            }
            weekItem.list.forEach((courseItem, index) => {
              courseItem.show = false
              if (!courseItem.conflict) {
                courseItem.conflict = 0
                courseItem.conflictList = []
                text += courseItem.start_time + ','
                courseNum += courseItem.schedule_ids.split(',').length
              }
            })
            listItemCard[weekItem.week] = weekItem.list
            listItemCard[weekItem.week][0].show = false
          }
        })
        this.getScheduleTips(dateIndex, text, courseNum)
        for (let i = 0; i <= 6; i++) {
          if (!listItemCard[i]) {
            listItemCard[i] = []
            let item = {}
            item.show = false
            listItemCard[i].push(item)
          }
        }
        list.push(listItemCard)
      })
      this.filterDate = list
    },
    dealCourtSiteName(courtName, CourtSiteName) {
      return CourtSiteName ? courtName + ' / ' + CourtSiteName : courtName
    },
    createCourseWeek(courseItem, cycleIndex) {
      let courseWeek = {}
      courseWeek.week = courseItem.week
      courseWeek.list = []
      courseWeek.list.push(courseItem)
      this.scheduleList[cycleIndex].course_time.push(courseWeek)
      this.filterDateList(this.scheduleList)
    },
    pushCourseInfo(cycleIndex, conflict, info, list) {
      let courseItem = cloneDeep(info)
      courseItem.court_site_id = info.court_site_id || 0
      courseItem.conflict = conflict
      courseItem.conflictList = list
      if (!this.scheduleList[cycleIndex].course_time.length) {
        this.createCourseWeek(courseItem, cycleIndex)
        return
      }
      let findWeekFlag = false
      this.scheduleList[cycleIndex].course_time.forEach((item, index) => {
        if (item.week == courseItem.week) {
          findWeekFlag = true
          item.list.push(courseItem)
          this.filterDateList(this.scheduleList)
        }
      })
      if (!findWeekFlag) {
        this.createCourseWeek(courseItem, cycleIndex)
      }
    },
    pushCustomCourseInfo(info) {
      const courseInfo = cloneDeep(info)
      this.customizeScheduleList.push(courseInfo)
    },
    onEditCourseSchedule(item, cycleIndex, positionIndex) {
      const cycle = this.pickerList[cycleIndex]
      const cycle_type = this.cycle_type
      const courseInfo = this.smallCourseInfo
      this.$modalRouter.push({
        name: 'schedule-small-course-edit-course',
        props: {
          item,
          cycleIndex,
          cycle,
          positionIndex,
          cycle_type,
          courseInfo
        },
        on: {
          editCourse: (cycleIndex, positionIndex, conflict, info, list) => {
            info.conflictList = list
            info.conflict = conflict
            this.scheduleList[cycleIndex].course_time.forEach(
              (dayItems, index) => {
                if (dayItems.week == info.week) {
                  dayItems.list.splice(positionIndex, 1, info)
                  this.filterDateList(this.scheduleList)
                  return
                }
              }
            )
          }
        }
      })
    },
    onEditCustomSchedule(item, positionIndex) {
      const cycle = this.pickerList[0]
      const cycle_type = this.cycle_type
      const courseInfo = this.smallCourseInfo
      this.$modalRouter.push({
        name: 'schedule-small-course-edit-course',
        props: { item, cycle, positionIndex, cycle_type, courseInfo },
        on: {
          editCustomCourse: (positionIndex, info) => {
            this.customizeScheduleList.splice(positionIndex, 1, info)
            return
          }
        }
      })
    },
    onDeleteCourseSchedule(item, cycleIndex, positionIndex) {
      let params = {}
      params = item
      params.del_type = DELETE_TYPE.SINGLE
      this.smallCourseScheduleService.cancelCycle(params).subscribe(res => {
        this.scheduleList[cycleIndex].course_time.forEach((dayItems, index) => {
          if (dayItems.week == item.week) {
            dayItems.list.splice(positionIndex, 1)
            if (dayItems.list.length === 0) {
              this.scheduleList[cycleIndex].course_time.splice(index, 1)
            }
            this.filterDateList(this.scheduleList)
            return
          }
        })
      })
    },
    onDeleteCourseScheduleCycle(dateList, cycleIndex) {
      let params = {}
      const cycleDate = this.pickerList[cycleIndex]
      params.cycle_start_date = moment(cycleDate[0]).format('YYYY-MM-DD')
      params.cycle_end_date = moment(cycleDate[1]).format('YYYY-MM-DD')
      params.course_id = this.smallCourseInfo.course_id
      params.del_type = DELETE_TYPE.CYCLE
      this.smallCourseScheduleService.cancelCycle(params).subscribe(res => {
        this.scheduleList[cycleIndex].course_time = []
        this.pickerList.splice(cycleIndex, 1, dateList)
        this.picker_end_date = this.pickerList[
          this.pickerList.length - 1
        ][1].format('YYYY-MM-DD')
        this.filterDateList(this.scheduleList)
        this.resetCourseNumTips('single', cycleIndex)
      })
    },
    onDealDeleteResult(cycleIndex) {
      this.scheduleList.splice(cycleIndex, 1)
      this.pickerList.splice(cycleIndex, 1)
      this.picker_end_date = this.pickerList[
        this.pickerList.length - 1
      ][1].format('YYYY-MM-DD')
    },
    onDeleteCycleSchedule(cycleIndex) {
      if (this.scheduleList.length <= 1) {
        return
      }
      if (this.scheduleList[cycleIndex].course_time.length <= 0) {
        this.onDealDeleteResult(cycleIndex)
        return
      } else {
        this.$confirm({
          title: '提示',
          content: `修改后会清空当前周期下的已有小班课排期，请确认修改`,
          onCancel: () => {},
          onOk: () => {
            let params = {}
            const cycleDate = this.pickerList[cycleIndex]
            params.cycle_start_date = moment(cycleDate[0]).format('YYYY-MM-DD')
            params.cycle_end_date = moment(cycleDate[1]).format('YYYY-MM-DD')
            params.course_id = this.smallCourseInfo.course_id
            params.del_type = DELETE_TYPE.CYCLE
            this.smallCourseScheduleService
              .cancelCycle(params)
              .subscribe(res => {
                this.onDealDeleteResult(cycleIndex)
              })
            this.resetCourseNumTips('single', cycleIndex)
          }
        })
      }
    },
    onDeleteCustomSchedule(item, index) {
      this.smallCourseScheduleService.cancelCustom(item.id).subscribe(res => {
        this.customizeScheduleList.splice(index, 1)
      })
    },
    onDeleteScheduleAll() {
      let hasCoursesFlag = false
      if (this.cycle_type === 2 && this.customizeScheduleList > 0) {
        hasCoursesFlag = true
      }
      if (this.cycle_type === 1) {
        this.scheduleList.forEach((item, index) => {
          if (item.course_time.length > 0) {
            hasCoursesFlag = true
          }
        })
      }
      if (!hasCoursesFlag) {
        this.onClickGoBack()
        return
      } else {
        this.$confirm({
          title: '提示',
          content: `取消后会清空当前课程下所有未发布的排期，请确认已完成排课`,
          onCancel: () => {},
          onOk: () => {
            if (this.cycle_type === 1) {
              let params = {}
              params.course_id = this.smallCourseInfo.course_id
              params.del_type = DELETE_TYPE.ALL_CYCLE
              this.smallCourseScheduleService
                .cancelCycle(params)
                .subscribe(res => {
                  this.resetCourseNumTips('all')
                  this.onClickGoBack()
                })
            } else if (this.cycle_type === 2) {
              const params = {}
              params.course_id = this.smallCourseInfo.course_id
              params.schedule_ids = []
              this.customizeScheduleList.forEach((item, index) => {
                params.schedule_ids.push(item.id)
              })
              this.smallCourseScheduleService
                .cancelCustomAll(params)
                .subscribe(res => {
                  this.onClickGoBack()
                })
            } else {
              this.onClickGoBack()
            }
          }
        })
      }
    },
    resetCourseNumTips(type, index) {
      if (type === 'all') {
        this.tipsCourseNum.splice(0, this.tipsCourseNum.length)
      } else {
        this.tipsCourseNum.splice(index, 1)
      }
    },
    addScheduleWeek() {
      this.pickerList.push([
        moment(this.picker_end_date).add(1, 'days'),
        moment(this.end_date)
      ])
      this.picker_end_date = this.end_date
      let item = {}
      item.course_time = []
      this.scheduleList.push(item)
      this.filterDateList(this.scheduleList)
    },
    onClickSaveSchedule() {
      if (
        (this.cycle_type === 1 &&
          this.scheduleList[0].course_time.length <= 0) ||
        (this.cycle_type === 2 && this.customizeScheduleList <= 0)
      ) {
        this.msg.warning({
          content: '请先添加排期'
        })
        return
      }
      const cycle_type = this.cycle_type
      const courseInfo = this.smallCourseInfo
      let scheduleList
      if (cycle_type === 1) {
        scheduleList = this.tipsCourseNum
      } else {
        scheduleList = this.customizeScheduleList
      }
      this.$modalRouter.push({
        name: 'schedule-small-course-submit-course',
        props: { scheduleList, cycle_type, courseInfo }
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
    }
  },
  components: {
    AddCourse,
    CourseCardPopover
  }
}
</script>
