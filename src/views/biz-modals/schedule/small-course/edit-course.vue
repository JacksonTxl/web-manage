<template>
  <st-modal title="编辑课程" v-model="show" width="484px">
    <st-form :form="form" labelWidth="40px" labelAuto>
      <st-form-item label="日期" required v-if="!scheduleId">
        <a-date-picker
          style="width:100%"
          :showTime="{ format: 'YYYY-MM-DD' }"
          format="YYYY-MM-DD"
          v-decorator="decorators.start_days"
          :disabledHours="disabledHours"
        />
      </st-form-item>
      <st-form-item label="时间" required>
        <a-time-picker
          style="width: 100%"
          placeholder="请选择时间"
          :showTime="{ format: 'HH:mm' }"
          format="HH:mm"
          v-decorator="decorators.start_time"
        >
          <a-icon slot="suffixIcon" type="clock-circle" />
        </a-time-picker>
      </st-form-item>
      <st-form-item label="课程" required>
        <a-select
          placeholder="请选择课程"
          @change="onChange"
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
      <st-form-item :label="$c('coach')" required>
        <a-select
          :placeholder="`请选择${$c('coach')}`"
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
      courseItem: ''
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
    positionIndex: {
      type: Number,
      default: () => {
        return 0
      }
    },
    scheduleId: {
      type: String,
      default: '0'
    }
  },
  created() {
    console.log(this.item)
    console.log(this.item.week)
    console.log(this.positionIndex)
  },
  mounted() {
    // start_day 无法setValue -- 课程的结束时间是否需要传递
    const item = this.item
    const court_item = [item.court_id.id, item.court_id.children.id]
    const time = moment(item.start_time)
    this.form.setFieldsValue({
      course_id: item.course_id,
      coach_id: item.coach_id,
      court_id: court_item,
      start_time: time
    })
    if (!this.scheduleId) {
      this.form.setFieldsValue({ start_days: time })
    }
  },
  methods: {
    onChange(value) {
      // 这里是否需要遍历查找对应的course信息
      console.log(value)
    },
    onSubmit() {
      this.form.validate().then(values => {
        const form = cloneDeep(values)
        if (!this.scheduleId) {
          form.start_days = form.start_days.format('YYYY-MM-DD')
        }
        form.start_time = form.start_time.format('HH:mm')
        if (form.court_id) {
          form.court_site_id = +form.court_id[1]
          form.court_id = +form.court_id[0]
        }
        // 提交 效验课程冲突
        console.log(form)
        this.$emit(
          'editCourse',
          this.cycleIndex,
          this.item.week,
          this.positionIndex
        )
        this.show = false
        // this.miniTeamScheduleScheduleService.add(form).subscribe(() => {
        //   this.$emit('editCourse')
        //   this.show = false
        // })
      })
    },
    onClick() {
      this.show = false
      // this.$modalRouter.push({
      //   name: 'schedule-team-add-course-batch',
      //   on: {
      //     ok: res => {
      //       this.onScheduleChange()
      //     }
      //   }
      // })
    },
    onScheduleChange() {
      this.$router.push({ query: this.$searchQuery })
    }
  }
}
</script>
