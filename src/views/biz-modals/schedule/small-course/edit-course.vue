<template>
  <st-modal title="编辑课程" v-model="show" width="520px">
    <st-form :form="form" labelWidth="72px" labelAuto>
      <st-form-item label="排课名称" class="mg-t12">
        <a-input
          placeholder="请输入"
          v-decorator="decorators.current_course_name"
        />
      </st-form-item>
      <st-form-item label="日期" required v-if="cycle_type === 2">
        <a-date-picker
          style="width:100%"
          format="YYYY-MM-DD"
          v-decorator="decorators.start_days"
        />
      </st-form-item>
      <st-form-item label="开始时间" required>
        <a-time-picker
          format="HH:mm"
          style="width:100%"
          @change="changeStartTime"
          v-decorator="decorators.start_time"
        />
      </st-form-item>
      <st-form-item label="结束时间" required>
        <a-time-picker
          format="HH:mm"
          style="width:100%"
          @change="changeEndTime"
          v-decorator="decorators.end_time"
        />
      </st-form-item>
      <st-form-item :label="$c('coach')" required>
        <a-select
          :placeholder="`请选择${$c('coach')}`"
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
      <st-form-item label="场地" required class="mg-b0">
        <a-cascader
          placeholder="请选择场地"
          :options="courtOptions"
          :fieldNames="{ label: 'name', value: 'id', children: 'children' }"
          v-decorator="decorators.court_id"
          @change="onChangeCourt"
        />
      </st-form-item>
    </st-form>
    <template slot="footer">
      <st-button @click="onClick">取消</st-button>
      <st-button type="primary" :loading="loading.add" @click="onSubmit">
        提交
      </st-button>
    </template>
  </st-modal>
</template>

<script>
import { cloneDeep } from 'lodash-es'
import { SmallCourseScheduleService } from '@/views/pages/shop/product/course/schedule/small-course/service#/schedule.service'
import { SmallCourseScheduleCommonService } from '@/views/pages/shop/product/course/schedule/small-course/service#/common.service'
import { ruleOptions } from './edit-course.config'
export default {
  name: 'AddCourseSchedule',
  serviceInject() {
    return {
      smallCourseScheduleService: SmallCourseScheduleService,
      smallCourseScheduleCommonService: SmallCourseScheduleCommonService
    }
  },
  rxState() {
    const tss = this.smallCourseScheduleCommonService
    return {
      loading: this.smallCourseScheduleService.loading$,
      coachSmallCourseOptions: tss.coachBindOptions$,
      courtOptions: tss.courtOptions$
    }
  },
  computed: {
    compareTime() {
      return this.startTime >= this.endTime ? true : ''
    }
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      show: false,
      courseItem: '',
      params: {},
      cycle_start_date: '',
      cycle_end_date: '',
      startTime: '',
      endTime: ''
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    },
    cycleIndex: {
      type: Number,
      default: () => {
        return 0
      }
    },
    cycle: {
      type: Array,
      default() {
        return []
      }
    },
    positionIndex: {
      type: Number,
      default: () => {
        return 0
      }
    },
    cycle_type: {
      type: Number,
      default: 0
    },
    courseInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  created() {
    const cycleDate = this.cycle
    this.cycle_start_date = cycleDate[0].format('YYYY-MM-DD')
    this.cycle_end_date = cycleDate[1].format('YYYY-MM-DD')
  },
  mounted() {
    const item = cloneDeep(this.item)
    console.log(item)
    console.log(this.cycle)
    const court_item = [item.court_id, item.court_site_id]
    const time = moment(item.start_date)
    this.form.setFieldsValue({
      current_course_name: item.current_course_name,
      coach_id: item.coach_id,
      court_id: court_item
    })
    let start_time, end_time
    if (this.cycle_type === 2) {
      console.log(this.cycle_type)
      console.log(time)
      start_time = moment(this.item.start_time)
      end_time = moment(this.item.end_time)
      this.form.setFieldsValue({
        start_days: time
      })
    } else {
      start_time = moment(`${this.cycle_start_date} ${this.item.start_time}`)
      end_time = moment(`${this.cycle_start_date} ${this.item.end_time}`)
    }
    this.form.setFieldsValue({
      start_time: start_time,
      end_time: end_time
    })
    this.startTime = start_time
    this.endTime = end_time
    this.onChangeCoach(item.coach_id)
    this.onChangeCourt(court_item)
  },
  methods: {
    changeStartTime(value) {
      this.startTime = value
      const endTime = this.form.getFieldValue('end_time')
      if (endTime) {
        setTimeout(() => {
          this.form.validate({ force: false, forceFields: ['end_time'] })
        }, 500)
      }
    },
    changeEndTime(value) {
      this.endTime = value
      const startTime = this.form.getFieldValue('start_time')
      if (startTime) {
        setTimeout(() => {
          this.form.validate({ force: false, forceFields: ['start_time'] })
        })
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
    editCourse(cycleIndex, conflict, params, list) {
      this.$emit(
        'editCourse',
        cycleIndex,
        this.positionIndex,
        conflict,
        params,
        list
      )
      this.show = false
    },
    editCustomCourse(params) {
      this.$emit('editCustomCourse', this.positionIndex, params)
      this.show = false
    },
    editSchedule(verifyParams) {
      this.smallCourseScheduleService
        .editScheduleInBatchs(verifyParams)
        .subscribe(res => {
          console.log(res)
          this.editCourse(this.cycleIndex, res.conflict, verifyParams, res.list)
        })
    },
    editScheduleCustom(verifyParams) {
      this.smallCourseScheduleService
        .editScheduleInBatchCustoms(verifyParams)
        .subscribe(res => {
          console.log(res)
          if (!res.conflict) {
            this.editCustomCourse(verifyParams)
          }
        })
    },
    addSchedule(verifyParams) {
      this.smallCourseScheduleService
        .addScheduleInBatch(verifyParams)
        .subscribe(res => {
          console.log(res)
          if (!res.conflict) {
            verifyParams.schedule_ids = res.schedule_ids
          }
          this.editCourse(this.cycleIndex, res.conflict, verifyParams, res.list)
        })
    },
    addCourse(cycleIndex, conflict, params, list) {
      this.$emit('addCourse', cycleIndex, conflict, params, list)
      this.show = false
    },
    addScheduleCustom(verifyParams) {
      this.smallCourseScheduleService
        .addScheduleInBatchCustom(verifyParams)
        .subscribe(res => {
          console.log(res)
          if (!res.conflict) {
            verifyParams.id = res.schedule_id
            this.addCustomCourse(verifyParams)
          }
        })
    },
    addCustomCourse(params) {
      this.$emit('addCustomCourse', params)
      this.show = false
    },
    onSubmit() {
      this.form.validate().then(values => {
        console.log(values)
        const form = cloneDeep(values)
        if (this.cycle_type === 2) {
          const start_days = values.start_days.format('YYYY-MM-DD')
          const start_time = values.start_time.format('HH:mm')
          const end_time = values.end_time.format('HH:mm')
          form.start_time = start_days + ' ' + start_time
          form.end_time = start_days + ' ' + end_time
        } else {
          form.start_time = form.start_time.format('HH:mm')
          form.end_time = form.end_time.format('HH:mm')
        }
        form.court_id = values.court_id[0]
        form.court_site_id = values.court_id[1]
        form.week = this.item.week
        form.cycle_start_date = this.cycle[0].format('YYYY-MM-DD')
        form.cycle_end_date = this.cycle[1].format('YYYY-MM-DD')
        form.id = this.item.id
        form.course_id = this.courseInfo.course_id
        form.schedule_ids = this.item.schedule_ids
        const verifyParams = Object.assign(this.params, form)
        console.log('提交参数')
        console.log(verifyParams)
        if (verifyParams.schedule_ids === undefined && this.cycle_type === 1) {
          this.addSchedule(verifyParams)
          return
        }
        if (verifyParams.id === undefined && this.cycle_type === 2) {
          this.addScheduleCustom(verifyParams)
          return
        }
        if (this.cycle_type === 1) {
          this.editSchedule(verifyParams)
        } else {
          this.editScheduleCustom(verifyParams)
        }
      })
    },
    onClick() {
      this.show = false
    },
    onScheduleChange() {
      this.$router.reload()
    }
  }
}
</script>
