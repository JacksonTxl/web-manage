<template>
  <a-popover
    trigger="click"
    overlayClassName="modal-shop-mini-add-course"
    v-model="showFlag"
    placement="bottom"
    title="添加课程"
  >
    <template :class="b('wrapper')" slot="content">
      <span :class="b('head-close')" @click="hide">X</span>
      <div class="add-course-conent">
        <st-form labelWidth="68px" :form="form">
          <st-form-item label="添加课程" required class="mg-t12">
            <a-select
              placeholder="请选择课程"
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
          <st-form-item label="日期" required v-if="scheduleId === 2">
            <a-date-picker
              style="width:100%"
              v-decorator="decorators.start_days"
            />
          </st-form-item>
          <st-form-item label="开始时间" required>
            <a-time-picker
              format="HH:mm"
              style="width:100%"
              v-decorator="decorators.start_time"
            />
          </st-form-item>
          <st-form-item label="结束时间" required>
            <a-time-picker
              format="HH:mm"
              style="width:100%"
              v-decorator="decorators.end_time"
            />
          </st-form-item>
          <st-form-item label="场地" required>
            <a-cascader
              placeholder="请选择场地"
              :options="courtOptions"
              :fieldNames="{ label: 'name', value: 'id', children: 'children' }"
              v-decorator="decorators.court_id"
              @change="onChangeCourt"
            />
          </st-form-item>
          <st-form-item label="教练" required>
            <a-select
              placeholder="请选择教练"
              @change="onChangeCoach"
              v-decorator="decorators.coach_id"
            >
              <a-select-option
                v-for="coach in coachSmallCourseOptions"
                :key="coach.id"
                :value="coach.id"
              >
                {{ coach.staff_name }}
              </a-select-option>
            </a-select>
          </st-form-item>
        </st-form>
      </div>
      <div class="footer">
        <div :class="b('save-schedule-btn')">
          <st-button @click="hide">
            取消
          </st-button>
          <st-button type="primary" class="mg-l12" @click="onSubmit">
            提交
          </st-button>
        </div>
      </div>
    </template>
    <st-button block type="dashed" icon="add">
      添加课程
    </st-button>
  </a-popover>
</template>

<script>
import { SmallCourseScheduleService } from '@/views/pages/shop/product/course/schedule/small-course/service#/schedule.service'
import { SmallCourseScheduleCommonService } from '@/views/pages/shop/product/course/schedule/small-course/service#/common.service'
import { ruleOptions } from './add-course.config'
import { cloneDeep } from 'lodash-es'
export default {
  name: 'ModalShopMiniAddCourse',
  bem: {
    b: 'modal-shop-mini-add-course'
  },
  serviceInject() {
    return {
      smallCourseScheduleService: SmallCourseScheduleService,
      smallCourseScheduleCommonService: SmallCourseScheduleCommonService
    }
  },
  rxState() {
    const scsc = this.smallCourseScheduleCommonService
    return {
      loading: this.smallCourseScheduleService.loading$,
      coachSmallCourseOptions: scsc.coachSmallCourseOptions$,
      courseSmallCourseOptions: scsc.courseSmallCourseOptions$,
      courtOptions: scsc.courtOptions$
    }
  },
  props: {
    item: {
      type: Array,
      default() {
        return [{}]
      }
    },
    customizeShow: {
      type: Boolean,
      default: false
    },
    cycleIndex: {
      type: Number,
      default: 0
    },
    cycle: {
      type: Array,
      default() {
        return []
      }
    },
    week: {
      type: Number,
      default: 1
    },
    scheduleId: {
      type: Number,
      default: 1
    }
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      coachId: '',
      form,
      decorators,
      showFlag: false,
      params: {}
    }
  },
  created() {
    this.showFlag = this.item[0].show || this.customizeShow
  },
  methods: {
    hide() {
      this.showFlag = false
    },
    onChangeCourse(value) {
      this.courseSmallCourseOptions.forEach((item, index) => {
        if (item.course_id === value) {
          this.params.course_name = item.course_name
        }
      })
    },
    onChangeCoach(value) {
      this.coachSmallCourseOptions.forEach((item, index) => {
        if (item.coach_id === value) {
          this.params.coach_name = item.coach_name
        }
      })
    },
    onChangeCourt(data) {
      this.courtOptions.forEach((item, index) => {
        if (item.id === data[0]) {
          if (data[1]) {
            item.children.forEach((childrenItem, index) => {
              if (childrenItem.id === data[1]) {
                this.params.court_site_name = childrenItem.name
              }
            })
          }
          this.params.coach_name = item.name
        }
        return
      })
    },
    // disabledDateTime() {
    //   const allTime = this.range(0, 24)
    //   console.log(allTime)
    //   return {
    //     disabledHours: () => this.range(0, 24).splice(4, 20),
    //     disabledMinutes: () => this.range(30, 60)
    //   }
    // },
    // disabledHours() {
    //   return this.range(0, 24).splice(4, 20)
    // },
    onSubmit() {
      this.form.validate().then(values => {
        const form = cloneDeep(values)
        if (this.scheduleId === 2) {
          form.start_days = form.start_days.format('YYYY-MM-DD')
        }
        form.start_time = form.start_time.format('HH:mm')
        form.end_time = form.end_time.format('HH:mm')
        form.court_id = values.court_id[0]
        form.court_site_id = values.court_id[1]
        form.week = this.week
        form.cycle_start_date = this.cycle[0].format('YYYY-MM-DD').valueOf()
        form.cycle_end_date = this.cycle[1].format('YYYY-MM-DD').valueOf()
        const verifyParams = Object.assign(this.params, form)
        console.log(verifyParams)
        this.smallCourseScheduleService
          .conflict(verifyParams)
          .subscribe(res => {
            if (this.scheduleId === 1) {
              this.$emit(
                'addCourse',
                this.cycleIndex,
                res.data.conflict,
                res.data.info,
                res.data.list
              )
              this.showFlag = false
            } else {
              if (res.data.conflict === 1) {
                // this.msg.success({ content: '取消成功' })
                this.msg.error({ content: '排期内容有冲突，请重新选择' })
              } else {
                this.$emit(
                  'addCustomCourse',
                  res.data.conflict,
                  res.data.info,
                  res.data.list
                )
                this.showFlag = false
              }
            }
          })
      })
    },
    save() {
      let reqdata = {
        id: this.coachId,
        schedule_start_time: this.start,
        schedule_end_time: this.end,
        scheduleInfo: this.scheduleInfo
      }
      this.scheduleService.addScheduleInBatch(reqdata).subscribe(() => {
        this.show = false
        this.$router.push({
          query: {
            ...this.$searchQuery
          }
        })
      })
    }
  }
}
</script>
