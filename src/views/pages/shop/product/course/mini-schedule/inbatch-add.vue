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
          <a-select
            placeholder="请选择"
            @change="onChangeScheduleType"
            v-model="cycle_type"
            :disabled="disabledChangeScheduleType"
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
                  v-model="pickerList[i]"
                  :disabledDate="disabledEndDate"
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
                        onDeleteCourseSchedule(
                          DELETE_TYPE.SINGLE,
                          cardItem,
                          i,
                          index
                        )
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
                  <a @click="onDeleteCustomSchedule(item, index)">
                    <st-icon type="delete" class="delete-course-btn"></st-icon>
                  </a>
                </div>
                <span class="time">
                  <st-icon type="timer"></st-icon>
                  {{ item.start_time }}-{{ item.end_time }}
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
import { MessageService } from '@/services/message.service'
import { DELETE_TYPE } from '@/constants/stat/course'
import { ruleOptions } from './inbatch-add.config'
export default {
  name: 'AddScheduleInBatch',
  bem: {
    b: 'page-shop-schedule-inbatch-add'
  },
  modals: {
    ScheduleSmallCourseEditCourse
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
    },
    disabledChangeScheduleType() {
      // 如果清空数据不转化，还要在第一次添加之后加一个标志位
      return this.cycle_type === 2 && this.customizeScheduleList.length > 0
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
          moment(item.cycle_begin_date),
          moment(item.cycle_end_date)
        ])
      })
    },
    initScheduleDate() {
      this.pickerList = []
      this.pickerList.push([
        moment(this.smallCourseInfo.course_begin_time),
        moment(this.smallCourseInfo.course_end_time)
      ])
    },
    onChangeCourse(value) {
      this.courseSmallCourseOptions.forEach((item, index) => {
        if (item.course_id === value) {
          this.smallCourseInfo = item
        }
      })
      console.log(this.smallCourseInfo)
      this.start_date = this.smallCourseInfo.course_begin_time
      this.end_date = this.smallCourseInfo.course_end_time
      this.courseId = value
      this.customizeScheduleList = []
      this.scheduleList = [
        {
          course_time: []
        }
      ]
      this.filterDateList(this.scheduleList)
      const params = {}
      params.course_id = this.courseId
      this.getScheduleInBatch(params)
    },
    onChangeScheduleType(value) {
      console.log('更改类型值' + value)
      this.initScheduleDate()
      this.customizeScheduleList = []
      const params = {
        course_id: this.courseId,
        cycle_type: value
      }
      this.getScheduleInBatch(params)
    },
    getScheduleInBatch(params) {
      this.smallCourseScheduleService
        .getScheduleInBatch(params)
        .subscribe(res => {
          console.log(res)
          // 用回显数据判断是新增还是编辑
          this.disabledAddCourseBtn = false
          this.disabledCustomBtn = false
          this.initScheduleList(res.list, res.cycle_type)
        })
    },
    initScheduleList(list, type) {
      if (list.length && type === 1) {
        console.log('周期有数据')
        this.cycle_type = type
        this.scheduleList = list
        this.dealScheduleDate(this.scheduleList)
        this.filterDateList(this.scheduleList)
      } else if (!list.length && type === 1) {
        console.log('周期无数据')
        this.cycle_type = type
        this.initScheduleDate()
      } else if (type === 2) {
        console.log('自主')
        this.cycle_type = type
        this.initScheduleDate()
        this.customizeScheduleList = list
        console.log(this.customizeScheduleList)
      } else if (!list.length && type === 0) {
        console.log('无数据无类型')
        this.initScheduleDate()
      }
    },
    onChangeRangePicker(date, dateString, PickerIndex) {
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
            this.msg.error({ content: '排课周期时间不能有交叉重叠！' })
            const oldDate = this.pickerList[PickerIndex]
            this.pickerList.splice(PickerIndex, 1, oldDate)
            pickerFlag = true
            return false
          }
        }
      })
      // 还是要添加是否有数据的判断
      if (!pickerFlag) {
        if (this.cycle_type === 1) {
          this.$confirm({
            title: '提示',
            content: `修改后会清空当前周期下的已有小班课排期，请确认修改`,
            onCancel: () => {
              const oldDate = this.pickerList[PickerIndex]
              this.pickerList.splice(PickerIndex, 1, oldDate)
            },
            onOk: () => {
              // 调用批量删除的接口and清空本地数据
              this.onDeleteCourseSchedule(
                DELETE_TYPE.CYCLE,
                [date[0], date[1]],
                PickerIndex
              )
            }
          })
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
    createCourseWeek(courseItem, courseTime) {
      let courseWeek = {}
      courseWeek.week = courseItem.week
      courseWeek.list = []
      courseWeek.list.push(courseItem)
      courseTime.push(courseWeek)
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
        this.createCourseWeek(
          courseItem,
          this.scheduleList[cycleIndex].course_time
        )
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
        this.createCourseWeek(
          courseItem,
          this.scheduleList[cycleIndex].course_time
        )
        console.log(this.scheduleList)
      }
    },
    pushCustomCourseInfo(info) {
      console.log('增加自主课程排期')
      console.log(info)
      this.customizeScheduleList.push(info)
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
            console.log('周期排课')
            console.log(info)
            this.scheduleList[cycleIndex].course_time.forEach(
              (dayItems, index) => {
                if (dayItems.week == info.week) {
                  dayItems.list[positionIndex] = info
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
    onEditCustomSchedule(item, positionIndex) {
      const cycle = this.pickerList[0]
      const cycle_type = this.cycle_type
      const courseInfo = this.smallCourseInfo
      this.$modalRouter.push({
        name: 'schedule-small-course-edit-course',
        props: { item, cycle, positionIndex, cycle_type, courseInfo },
        on: {
          editCourse: (positionIndex, info) => {
            console.log('自主排课')
            console.log(info)
            this.customizeScheduleList.splice(positionIndex, 1, info)
            console.log(this.customizeScheduleList)
            return
          }
        }
      })
    },
    onDeleteCourseSchedule(del_type, item, cycleIndex) {
      console.log(del_type)
      console.log(item)
      console.log(cycleIndex)
      // 这里需要一个所有的排期id参数！！ 封装一个promise方法可以减少一次判断
      if (
        (!this.customizeScheduleList.length && this.cycle_type === 2) ||
        (!this.scheduleList.length && this.cycle_type === 1)
      ) {
        this.onClickGoBack()
        return
      }
      if (this.cycle_type === 1) {
        let params = {}
        if (del_type === DELETE_TYPE.SINGLE) {
          params = item
        } else if (del_type === DELETE_TYPE.CYCLE) {
          const cycleDate = this.pickerList[cycleIndex]
          params.cycle_begin_date = moment(cycleDate[0])
          params.cycle_end_date = moment(cycleDate[1])
          params.course_id = this.smallCourseInfo.course_id
          params.schedule_id = []
        } else {
          params.course_id = this.smallCourseInfo.course_id
          params.schedule_id = []
        }
        params.del_type = del_type
        console.log('删除周期排课')
        console.log(params)
        this.smallCourseScheduleService.cancelCycle(params).subscribe(res => {
          if (del_type === DELETE_TYPE.SINGLE) {
            this.scheduleList[cycleIndex].course_time.forEach(
              (dayItems, index) => {
                if (dayItems.week === item.week) {
                  dayItems.list.splice(positionIndex, 1)
                  if (dayItems.list.length === 0) {
                    this.scheduleList[cycleIndex].course_time.splice(index, 1)
                  }
                  this.filterDateList(this.scheduleList)
                  return
                }
              }
            )
          } else if (del_type === DELETE_TYPE.CYCLE) {
            this.scheduleList[cycleIndex].course_time = []
            this.pickerList.splice(cycleIndex, 1, item)
            this.filterDateList(this.scheduleList)
          } else {
            this.onClickGoBack()
          }
        })
      } else if (this.cycle_type === 2) {
        const params = []
        this.customizeScheduleList.forEach((item, index) => {
          params.push(item.id)
        })
        this.smallCourseScheduleService
          .cancelCustomAll(params)
          .subscribe(res => {
            this.onClickGoBack()
          })
      }
    },
    // 删除周期整个批次
    onDeleteCycleSchedule(index) {
      let params = {}
      const cycleDate = this.pickerList[cycleIndex]
      params.cycle_begin_date = moment(cycleDate[0])
      params.cycle_end_date = moment(cycleDate[1])
      params.course_id = this.smallCourseInfo.course_id
      params.schedule_id = []
      params.del_type = DELETE_TYPE.CYCLE
      this.smallCourseScheduleService.cancelCycle(params).subscribe(res => {
        this.scheduleList.splice(index, 1)
        this.pickerList.splice(index, 1)
        //this.filterDateList(this.scheduleList)
      })
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
      if (this.cycle_type === 1) {
        this.smallCourseScheduleService
          .cancelCustomAll(params)
          .subscribe(res => {
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
    },
    // 新增周期排课
    addScheduleWeek() {
      this.pickerList.push([
        moment(this.picker_end_date)
          .add(1, 'days')
          .valueOf(),
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
      const smallCourseInfo = this.smallCourseInfo
      console.log(smallCourseInfo)
      if (this.cycle_type === 2) {
        const params = {}
        params.course_id = this.smallCourseInfo.course_id
        params.schedule_ids = []
        this.customizeScheduleList.forEach((item, index) => {
          params.schedule_ids.push(item.id)
        })
        this.smallCourseScheduleService.saveCustom(params).subscribe()
      } else {
        this.smallCourseScheduleService
          .save(smallCourseInfo.course_id)
          .subscribe()
      }
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
