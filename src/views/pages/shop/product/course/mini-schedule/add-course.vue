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
          <st-form-item label="排课名称" class="mg-t12">
            <a-input
              placeholder="请输入"
              v-decorator="decorators.current_course_name"
            />
          </st-form-item>
          <st-form-item label="日期" required v-if="cycle_type === 2">
            <a-date-picker
              style="width:100%"
              v-decorator="decorators.start_days"
            />
          </st-form-item>
          <st-form-item label="开始时间" required>
            <a-time-picker
              format="HH:mm"
              style="width:100%"
              @change="onchangeStartTime"
              v-decorator="decorators.start_time"
            />
          </st-form-item>
          <st-form-item label="结束时间" required>
            <a-time-picker
              format="HH:mm"
              style="width:100%"
              @change="onchangeEndTime"
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
                {{ coach.name }}
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
    <st-button block type="dashed" icon="add" :disabled="DisabledAddCourseBtn">
      添加课程
    </st-button>
  </a-popover>
</template>

<script>
import { SmallCourseScheduleService } from '@/views/pages/shop/product/course/schedule/small-course/service#/schedule.service'
import { SmallCourseScheduleCommonService } from '@/views/pages/shop/product/course/schedule/small-course/service#/common.service'
import { MessageService } from '@/services/message.service'
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
      smallCourseScheduleCommonService: SmallCourseScheduleCommonService,
      msg: MessageService
    }
  },
  rxState() {
    const scsc = this.smallCourseScheduleCommonService
    return {
      loading: this.smallCourseScheduleService.loading$,
      coachSmallCourseOptions: scsc.coachBindOptions$,
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
    disabledCustomBtn: {
      type: Boolean,
      default: true
    },
    disabledAddCourseBtn: {
      type: Boolean,
      default: true
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
      default: 0
    },
    cycle_type: {
      type: Number,
      default: 1
    },
    courseInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    editScheduleCycleFlag: {
      type: Boolean,
      default: () => {
        return false
      }
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
      params: {},
      cycle_start_date: '',
      cycle_end_date: ''
    }
  },
  computed: {
    DisabledAddCourseBtn() {
      return this.cycle_type === 1
        ? this.disabledAddCourseBtn
        : this.disabledCustomBtn
    }
  },
  created() {
    this.showFlag = this.item[0].show || this.customizeShow
  },
  methods: {
    hide() {
      this.showFlag = false
      this.resetForm()
    },
    onchangeStartTime(value) {
      const endTime = this.form.getFieldValue('end_time')
      if (endTime) {
        this.form.validate(['end_time'])
      }
    },
    onchangeEndTime(value) {
      const startTime = this.form.getFieldValue('start_time')
      if (startTime) {
        this.form.validate(['start_time'])
      }
    },
    onChangeCoach(value) {
      this.coachSmallCourseOptions.forEach((item, index) => {
        if (item.id === value) {
          this.params.coach_name = item.name
        }
      })
    },
    onChangeCourt(data) {
      this.courtOptions.forEach((item, index) => {
        if (item.id === data[0]) {
          this.params.court_name = item.name
          if (data[1]) {
            item.children.forEach((childrenItem, index) => {
              if (childrenItem.id === data[1]) {
                this.params.court_site_name = childrenItem.name
              }
            })
          } else {
            this.params.court_site_name = ''
          }
        }
        return
      })
    },
    addCourse(cycleIndex, conflict, params, list) {
      this.$emit('addCourse', cycleIndex, conflict, params, list)
      this.showFlag = false
    },
    addCustomCourse(params) {
      this.$emit('addCustomCourse', params)
      this.showFlag = false
    },
    addSchedule(verifyParams) {
      this.smallCourseScheduleService
        .addScheduleInBatch(verifyParams)
        .subscribe(res => {
          console.log(res)
          if (!res.conflict) {
            verifyParams.schedule_ids = res.schedule_ids
          }
          this.addCourse(this.cycleIndex, res.conflict, verifyParams, res.list)
          this.resetForm()
        })
    },
    addScheduleCustom(verifyParams) {
      this.smallCourseScheduleService
        .addScheduleInBatchCustom(verifyParams)
        .subscribe(res => {
          console.log(res)
          if (!res.conflict) {
            verifyParams.id = res.schedule_id
            this.addCustomCourse(verifyParams)
            this.resetForm()
          }
        })
    },
    resetForm() {
      this.form.resetFields()
    },
    onSubmit() {
      this.form.validate().then(values => {
        const form = cloneDeep(values)
        if (this.cycle_type === 2) {
          const start_days = values.start_days.format('YYYY-MM-DD')
          const start_time = values.start_time.format('HH:mm')
          const end_time = values.end_time.format('HH:mm')
          form.start_time = start_days + ' ' + start_time
          form.end_time = start_days + ' ' + end_time
        } else {
          form.start_time = values.start_time.format('HH:mm')
          form.end_time = values.end_time.format('HH:mm')
        }
        form.court_id = values.court_id[0]
        form.court_site_id = values.court_id[1] || 0
        form.week = this.week
        form.cycle_start_date = this.cycle[0].format('YYYY-MM-DD')
        form.cycle_end_date = this.cycle[1].format('YYYY-MM-DD')
        form.course_id = this.courseInfo.course_id
        const verifyParams = Object.assign(this.params, form)
        console.log(verifyParams)
        console.log(this.cycle_type)
        if (this.cycle_type === 1) {
          this.addSchedule(verifyParams)
        } else {
          console.log(verifyParams)
          this.addScheduleCustom(verifyParams)
        }
      })
    }
  }
}
</script>
