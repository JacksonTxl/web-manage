<template>
  <st-modal title="补课" v-model="show" width="484px">
    <st-form :form="form" labelWidth="70px" labelAuto>
      <st-form-item label="会员名" required>
        <span>{{ info.member_name }}</span>
      </st-form-item>
      <st-form-item label="缺课班名" required>
        {{ info.lack_course_name }}
      </st-form-item>
      <st-form-item label="适应范围" required>
        {{ scopeApplication }}
      </st-form-item>
      <st-form-item :label="`${$c('small_course')}`" required>
        <a-select
          placeholder="选择课程"
          @change="onChangeCourse"
          v-decorator="decorators.course_id"
        >
          <a-select-option
            v-for="course in courseSmallCourseOptions"
            :key="course.id"
            :value="course.id"
          >
            {{ course.course_name }}
          </a-select-option>
        </a-select>
      </st-form-item>
      <st-form-item label="补课排期" required class="mg-b0">
        <a-select placeholder="请选择排期" v-decorator="decorators.id">
          <a-select-option
            v-for="schedule in scheduleOptions"
            :key="schedule.id"
            :value="schedule.id"
          >
            {{ schedule.course_name }} {{ schedule.start_date }}
            {{ schedule.start_time }}
          </a-select-option>
        </a-select>
      </st-form-item>
      <!-- <st-form-item label="日期" required class="mg-b0">
        <a-date-picker
          style="width:100%"
          :showTime="{ format: 'YYYY-MM-DD HH:mm' }"
          format="YYYY-MM-DD HH:mm"
          v-decorator="decorators.start_days"
          :disabled="disabled"
        />
      </st-form-item> -->
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
import { SmallCourseScheduleReserveService as ReserveService } from '@/views/pages/shop/product/course/schedule/small-course/service#/reserve.service'
import { SmallCourseScheduleCommonService } from '@/views/pages/shop/product/course/schedule/small-course/service#/common.service'
import { ruleOptions } from './remedial-course.config'
export default {
  name: 'RemedialCourse',
  serviceInject() {
    return {
      smallCourseScheduleService: SmallCourseScheduleService,
      reserveService: ReserveService,
      smallCourseScheduleCommonService: SmallCourseScheduleCommonService
    }
  },
  rxState() {
    const scsc = this.smallCourseScheduleCommonService
    return {
      loading: this.smallCourseScheduleService.loading$,
      courseSmallCourseOptions: scsc.courseSmallCourseOptions$
    }
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      show: false,
      disabled: true,
      scheduleOptions: [],
      courseSmallCourseOptions: '',
      smallCourseInfo: '',
      courseId: ''
    }
  },
  props: {
    info: {
      type: Object,
      default: () => {
        return {}
      }
    },
    id: {
      type: Number
    }
  },
  computed: {
    scopeApplication() {
      return this.info.scope_application.join(' ')
    }
  },
  created() {
    const member_id = this.info.member_id
    this.reserveService.courseList(member_id).subscribe(res => {
      this.courseSmallCourseOptions = res.list
    })
  },
  methods: {
    onChangeCourse(value) {
      this.courseId = value
      const params = {
        id: this.id,
        course_id: value
      }
      this.reserveService.sheduleList(params).subscribe(res => {
        this.scheduleOptions = res.list
      })
    },
    // onChangeSchedules(value) {
    //   this.courseOptions.forEach((item, index) => {
    //     if (item.id === value) {
    //       this.smallCourseInfo = item
    //       console.log(item)
    //       const day = item.start_date
    //       const time = item.start_time
    //       const start_days = moment(`${day} ${time}`)
    //       this.form.setFieldsValue({
    //         start_days: start_days
    //       })
    //     }
    //   })
    // },
    onSubmit() {
      this.form.validate().then(values => {
        this.show = false
        const params = {}
        params.schedule_id = values.id
        params.reserve_id = this.info.id
        params.member_id = this.info.member_id
        params.consume_id = this.info.consume_id
        console.log(params)
        this.reserveService.remedial(params).subscribe()
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
