<template>
  <st-modal title="编辑课程" v-model="show" width="520px">
    <st-form :form="form" labelWidth="72px" labelAuto>
      <st-form-item label="排课名称" required>
        <a-input
          placeholder="请输入"
          v-decorator="decorators.current_course_name"
        />
      </st-form-item>
      <st-form-item label="日期" required v-if="!cycle_type">
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
            {{ coach.staff_name }}
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
import { ruleOptions } from './add-course.config'
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
      coachSmallCourseOptions: tss.coachSmallCourseOptions$,
      courtOptions: tss.courtOptions$
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
      cycle_begin_date: '',
      cycle_end_date: ''
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
  created() {},
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
    if (this.cycle_type === 2) {
      console.log(this.cycle_type)
      console.log(time)
      this.form.setFieldsValue({
        start_time: moment(`${this.item.start_date} ${this.item.start_time}`),
        end_time: moment(`${this.item.start_date} ${this.item.end_time}`),
        start_days: time
      })
    } else {
      this.form.setFieldsValue({
        start_time: moment(`${this.cycle_begin_date} ${this.item.start_time}`),
        end_time: moment(`${this.cycle_end_date} ${this.item.end_time}`)
      })
    }
    this.onChangeCoach(item.coach_id)
    this.onChangeCourt(court_item)
  },
  methods: {
    onChangeCoach(value) {
      this.coachSmallCourseOptions.forEach((item, index) => {
        if (item.id === value) {
          this.params.coach_name = item.staff_name
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
            this.params.court_site_name = 'none'
          }
        }
        return
      })
    },
    addCourse(cycleIndex, conflict, params, list) {
      this.$emit(
        'addCourse',
        cycleIndex,
        this.positionIndex,
        conflict,
        params,
        list
      )
      this.show = false
    },
    addCustomCourse(params) {
      this.$emit('addCustomCourse', this.positionIndex, params)
      this.show = false
    },
    editSchedule(verifyParams) {
      this.smallCourseScheduleService
        .editScheduleInBatchs(verifyParams)
        .subscribe(res => {
          console.log(res)
          this.addCourse(this.cycleIndex, res.conflict, verifyParams, res.list)
        })
    },
    editScheduleCustom(verifyParams) {
      this.smallCourseScheduleService
        .editScheduleInBatchCustoms(verifyParams)
        .subscribe(res => {
          console.log(res)
          if (!res.conflict) {
            this.$emit('addCustomCourse', verifyParams)
          }
        })
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
        form.cycle_begin_date = this.cycle[0].format('YYYY-MM-DD')
        form.cycle_end_date = this.cycle[1].format('YYYY-MM-DD')
        form.course_id = this.courseInfo.course_id
        const verifyParams = Object.assign(this.params, form)
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
      this.$router.push({ query: this.$searchQuery })
    }
  }
}
</script>
