<template>
  <st-modal title="编辑课程" v-model="show" width="520px">
    <st-form :form="form" labelWidth="40px" labelAuto>
      <st-form-item label="课程" required>
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
      <st-form-item label="日期" required v-if="!cycle_type">
        <a-date-picker
          style="width:100%"
          :showTime="{ format: 'YYYY-MM-DD' }"
          format="YYYY-MM-DD"
          v-decorator="decorators.start_days"
          :disabledHours="disabledHours"
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
      courseSmallCourseOptions: tss.courseSmallCourseOptions$,
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
      params: {}
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
    }
  },
  created() {},
  mounted() {
    // start_day 无法setValue -- 课程的结束时间是否需要传递
    const item = this.item
    console.log(item)
    const court_item = [item.court_id.id, item.court_id.children.id]
    const time = moment(item.start_time)
    this.form.setFieldsValue({
      course_id: item.course_id,
      coach_id: item.coach_id,
      court_id: court_item,
      start_time: moment(item.start_time),
      end_time: moment(item.end_time)
    })
    if (!this.cycle_type) {
      this.form.setFieldsValue({ start_days: time })
    }
    this.onChangeCourse(item.course_id)
    this.onChangeCoach(item.coach_id)
    this.onChangeCourt(item.court_item)
  },
  methods: {
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
    onSubmit() {
      this.form.validate().then(values => {
        console.log(values)
        const form = cloneDeep(values)
        if (!this.cycle_type) {
          form.start_days = form.start_days.format('YYYY-MM-DD')
        }
        form.start_time = form.start_time.format('HH:mm')
        form.end_time = form.end_time.format('HH:mm')
        form.court_id = values.court_id[0]
        form.court_site_id = values.court_id[1]
        form.week = this.item.week
        form.cycle_start_date = this.cycle[0].format('YYYY-MM-DD').valueOf()
        form.cycle_end_date = this.cycle[1].format('YYYY-MM-DD').valueOf()
        const verifyParams = Object.assign(this.params, form)
        console.log(verifyParams)
        this.miniTeamScheduleScheduleService
          .conflict(verifyParams)
          .subscribe(res => {
            if (this.cycle_type === 1) {
              this.$emit(
                'editCourse',
                this.cycleIndex,
                this.positionIndex,
                res.data.conflict,
                res.data.info,
                res.data.list
              )
              this.show = false
            } else {
              if (res.data.conflict === 1) {
                this.msg.error({ content: '排期内容有冲突，请重新选择' })
              } else {
                this.$emit(
                  'editCourse',
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
    onClick() {
      this.show = false
    },
    onScheduleChange() {
      this.$router.push({ query: this.$searchQuery })
    }
  }
}
</script>
