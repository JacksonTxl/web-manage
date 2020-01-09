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
              <div :class="b('delete')" @click="onDeleteCycleSchedule(i)">
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
                    :key="index"
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
                {{ pickerList[i][0].format('YYYY/MM/DD').valueOf() }}~{{
                  pickerList[i][1].format('YYYY/MM/DD').valueOf()
                }}
              </span>
              <span class="schedule__tips-time">{{ tipsText[i] }}</span>
              共
              <span class="schedule__tips-num" v-if="tipsCourseNum[i]">
                {{ tipsCourseNum[i].length }}
              </span>
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
                  {{ smallCourseInfo.course_begin_time }} ~
                  {{ smallCourseInfo.course_end_time }}
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
                    <span>{{ item.court_name }}</span>
                  </p>
                </div>
              </div>
              <add-course
                :customizeShow="customizeShow"
                :disabledCustomBtn="disabledCustomBtn"
                @addCustomCourse="pushCustomCourseInfo"
                :cycle="pickerList[0]"
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
      return !(this.end_date === this.picker_end_date)
    }
    // disabledChangeScheduleType() {
    //   return this.cycle_type === 2 && this.customizeScheduleList.length > 0
    // }
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
      this.courseId = value
      this.customizeScheduleList = []
      this.pickerList = []
      this.scheduleList = [
        {
          course_time: []
        }
      ]
      this.initScheduleDate()
      this.filterDateList(this.scheduleList)
      const params = {}
      params.course_id = this.courseId
      this.getScheduleInBatch(params)
      this.smallCourseScheduleCommonService.getBindCoachList(value).subscribe()
    },
    onChangeScheduleType(value) {
      console.log('更改类型值' + value)
      if (!this.courseId) {
        return
      }
      const params = {
        course_id: this.courseId,
        cycle_type: value
      }
      this.getScheduleInBatch(params, value)
    },
    getScheduleInBatch(params, changeTyps) {
      this.smallCourseScheduleService.getScheduleInBatch(params).subscribe(
        res => {
          console.log(res)
          if (changeTyps && this.cycle_type === 1) {
            this.initScheduleDate()
            this.customizeScheduleList = []
          }
          this.disabledAddCourseBtn = false
          this.disabledCustomBtn = false
          this.initScheduleList(res.list, res.cycle_type, changeTyps)
        },
        err => {
          this.select_cycle_type = 2
          this.$warning({
            title: '提示',
            okText: '我知道了',
            content: `已有排课信息，无法切换为周期排课，若需切换，请先删除排课信息`,
            onOk: () => {}
          })
        }
      )
    },
    initScheduleList(list, type, changeTyps) {
      this.select_cycle_type = type
      changeTyps ? (this.cycle_type = changeTyps) : (this.cycle_type = type)
      if (list.length && this.cycle_type === 1) {
        console.log('周期有数据')
        this.scheduleList = list
        this.dealScheduleDate(this.scheduleList)
        this.filterDateList(this.scheduleList)
      } else if (!list.length && this.cycle_type === 1) {
        console.log('周期无数据')
        this.initScheduleDate()
      } else if (this.cycle_type === 2) {
        console.log('自主')
        this.select_cycle_type = 2
        this.initScheduleDate()
        this.customizeScheduleList = list
        console.log(this.customizeScheduleList)
      } else if (!list.length && this.cycle_type === 0) {
        console.log('无数据无类型')
        this.select_cycle_type = 1
        this.cycle_type = 1
        this.initScheduleDate()
      }
    },
    onChangeRangePicker(date, dateString, PickerIndex) {
      console.log(this.pickerList)
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
            this.msg.error({ content: '排课周期时间不能有交叉重叠！' })
            pickerFlag = true
            return false
          }
        }
      })
      if (!pickerFlag) {
        if (
          this.cycle_type === 1 &&
          this.scheduleList[PickerIndex].course_time.length > 0
        ) {
          this.$confirm({
            title: '提示',
            content: `修改后会清空当前周期下的已有小班课排期，请确认修改`,
            onCancel: () => {
              const oldDate = this.pickerList[PickerIndex]
              this.pickerList.splice(PickerIndex, 1, oldDate)
            },
            onOk: () => {
              this.onDeleteCourseScheduleCycle([date[0], date[1]], PickerIndex)
            }
          })
        } else {
          this.picker_end_date = date[1].format('YYYY-MM-DD')
          this.pickerList.splice(PickerIndex, 1, date)
        }
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
      this.tipsCourseNum[index] = courseNum.split(',')
      this.tipsCourseNum[index].pop()
    },
    filterDateList(dateList) {
      let list = []
      dateList.forEach((item, dateIndex) => {
        let listItemCard = {} //批次的大的集合对象
        let courseNum = ''
        let text = ''
        item.course_time.forEach((item, index) => {
          if (item.week || item.week == 0) {
            if (item.week == 0) {
              text += this.weekList[this.weekList.length - 1].date
            } else {
              text += this.weekList[item.week - 1].date
            }
            item.list.forEach((item, index) => {
              item.show = false
              if (!item.conflict) {
                item.conflict = 0
                item.conflictList = []
              }
              text += item.start_time + ','
              courseNum += item.schedule_ids + ','
            })
            this.getScheduleTips(dateIndex, text, courseNum)
            listItemCard[item.week] = item.list
            listItemCard[item.week][0].show = false
          }
        })
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
      console.log(list)
      console.log(dateList)
      this.filterDate = list
    },
    // 增加课程
    createCourseWeek(courseItem, cycleIndex) {
      let courseWeek = {}
      courseWeek.week = courseItem.week
      courseWeek.list = []
      courseWeek.list.push(courseItem)
      this.scheduleList[cycleIndex].course_time.push(courseWeek)
      this.filterDateList(this.scheduleList)
    },
    pushCourseInfo(cycleIndex, conflict, info, list) {
      console.log('增加周期性课程排期')
      console.log(info)
      let courseItem = info
      courseItem.court_site_id = info.court_site_id || 0
      courseItem.conflict = conflict
      courseItem.conflictList = list
      if (!this.scheduleList[cycleIndex].course_time.length) {
        console.log('批次没有数据')
        this.createCourseWeek(courseItem, cycleIndex)
        return
      }
      let findWeekFlag = false
      this.scheduleList[cycleIndex].course_time.forEach((item, index) => {
        if (item.week == courseItem.week) {
          console.log('匹配对应的周几')
          findWeekFlag = true
          if (item.list.length >= 100) {
            this.msg.error({ content: '单日排课不得超过100节！' })
            return
          }
          item.list.push(courseItem)
          this.filterDateList(this.scheduleList)
        }
      })
      if (!findWeekFlag) {
        console.log('无对应周几，添加一个周几列')
        this.createCourseWeek(courseItem, cycleIndex)
        console.log(this.scheduleList)
      }
    },
    pushCustomCourseInfo(info) {
      const courseInfo = cloneDeep(info)
      this.customizeScheduleList.push(courseInfo)
      console.log(this.customizeScheduleList)
    },
    // 编辑课程
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
      console.log('删除周期的单个排期')
      let params = {}
      params = item
      params.del_type = DELETE_TYPE.SINGLE
      console.log(params)
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
    // 删除周期单个批次内容
    onDeleteCourseScheduleCycle(dateList, cycleIndex) {
      let params = {}
      console.log(this.pickerList)
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
        console.log('修改成功')
      })
    },
    // 顶部删除周期整个批次
    onDeleteCycleSchedule(cycleIndex) {
      if (this.scheduleList.length <= 1) {
        return
      }
      if (this.scheduleList[cycleIndex].course_time.length <= 0) {
        this.scheduleList.splice(cycleIndex, 1)
        this.pickerList.splice(cycleIndex, 1)
        this.picker_end_date = this.pickerList[
          this.pickerList.length - 1
        ][1].format('YYYY-MM-DD')
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
                this.scheduleList.splice(cycleIndex, 1)
                this.pickerList.splice(cycleIndex, 1)
                this.picker_end_date = this.pickerList[
                  this.pickerList.length - 1
                ][1].format('YYYY-MM-DD')
              })
            this.resetCourseNumTips('single', cycleIndex)
          }
        })
      }
    },
    // 自主约课单个删除
    onDeleteCustomSchedule(item, index) {
      console.log(item)
      console.log('自主删除单个' + item.id)
      this.smallCourseScheduleService.cancelCustom(item.id).subscribe(res => {
        this.customizeScheduleList.splice(index, 1)
      })
    },
    // 取消删除所有未发布
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
              console.log('删除周期所有')
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
              console.log(params)
              console.log('自主删除所有')
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
    // 新增周期排课
    addScheduleWeek() {
      console.log(this.picker_end_date)
      console.log(this.end_date)
      this.pickerList.push([
        moment(this.picker_end_date).add(1, 'days'),
        moment(this.end_date)
      ])
      this.picker_end_date = this.end_date
      console.log(this.pickerList)
      let item = {}
      item.course_time = []
      this.scheduleList.push(item)
      this.filterDateList(this.scheduleList)
    },
    // 保存发布
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
