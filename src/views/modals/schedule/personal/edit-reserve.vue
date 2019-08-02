<template>
  <st-modal title="修改预约" @ok="save" v-model="show">
    <st-form :form="form">
      <st-form-item label="会员名称" required>
        <a-input v-model="info.member_name" disabled></a-input>
      </st-form-item>
      <st-form-item label="消费方式" required>
        <a-input v-model="info.consume_name" disabled></a-input>
      </st-form-item>
      <st-form-item label="课程" required>
        <a-input v-model="info.course_name" disabled></a-input>
      </st-form-item>
      <st-form-item label="上课教练" required>
        <a-select
          v-decorator="['coach_id']"
          placeholder="请选择上课教练"
          @change="onChangeCourseCoach"
        >
          <a-select-option
            v-for="courseCoach in courseCoachOptions"
            :key="courseCoach.id"
            :value="courseCoach.id"
          >
            {{ courseCoach.name }}
          </a-select-option>
        </a-select>
      </st-form-item>
      <st-form-item label="预约日期" required>
        <a-input v-model="info.start_date" disabled></a-input>
      </st-form-item>
      <st-form-item label="预约时间" required>
        <a-input v-model="info.start_time" disabled></a-input>
      </st-form-item>
    </st-form>
  </st-modal>
</template>

<script>
import { PersonalScheduleCommonService as CommonService } from '../../../pages/shop/product/course/schedule/personal.service#/common.service'
import { difference, cloneDeep } from 'lodash-es'
import { RouteService } from '@/services/route.service'
import { PersonalScheduleReserveService as ReserveService } from '../../../pages/shop/product/course/schedule/personal.service#/reserve.service'
export default {
  name: 'EditReserve',
  serviceInject() {
    return {
      commonService: CommonService,
      reserveService: ReserveService,
      routeService: RouteService
    }
  },
  rxState() {
    const cs = this.commonService
    return {
      query: this.routeService.query$,
      courseCoachOptions: cs.courseCoachOptions$ || [],
      consumeOptions: cs.consumeOptions$ || [],
      memberOptions: cs.memberOptions$ || [],
      courseOptions: cs.courseOptions$ || [],
      dateOptions: cs.dateOptions$ || [],
      timeOptions: cs.timeOptions$ || []
    }
  },
  props: {
    info: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      show: false,
      value: '',
      fetching: false,
      form: this.$form.createForm(this),
      reserveDate: ''
    }
  },
  mounted() {
    this.reserveService.getUpdateInfo(this.info.id).subscribe(res => {
      this.commonService.getCourseCoachList(res.info.course.id).subscribe()
    })
  },
  methods: {
    onChangeConsume(val) {
      const v = JSON.parse(val)
      this.commonService
        .getCourseList({ id: +v.id, consume_type: +v.consume_type })
        .subscribe()
    },
    onSearchMember(val) {
      this.fetching = false
      this.commonService.getOptions('getMemberList', { member: val }, () => {
        this.fetching = true
      })
    },
    onChangeCourse(val) {
      console.log(val)
      this.commonService.getCourseCoachList(val).subscribe()
    },
    onChangeDatePick(val) {
      let reserveDate = ''
      this.dateOptions.forEach(item => {
        val.format('YYYY-MM-DD') === item.schedule_date &&
          (reserveDate = item.id)
      })
      this.commonService.getOptions('getTimeList', reserveDate, () => {})
    },
    onChangeCourseCoach(val) {
      this.commonService.getOptions('getDateList', val, () => {})
    },
    range(start, end) {
      const result = []
      for (let i = start; i < end; i++) {
        result.push(i)
      }
      return result
    },
    disabledDate(current) {
      return (
        current &&
        !this.dateOptions
          .map(item => {
            return item.schedule_date
          })
          .includes(current.format('YYYY-MM-DD').valueOf())
      )
    },
    disabledMinutes(selectedHour) {
      let disabledMinutes = []
      const allTime = this.range(0, 60)
      for (let i = 0; i < this.timeOptions.timing.length; i++) {
        const startHour = +moment(
          `${this.timeOptions.schedule_date} ${
            this.timeOptions.timing[i].start_time
          }`
        )
          .format('HH')
          .valueOf()
        const endHour = +moment(
          `${this.timeOptions.schedule_date} ${
            this.timeOptions.timing[i].end_time
          }`
        )
          .format('HH')
          .valueOf()
        const start = +moment(
          `${this.timeOptions.schedule_date} ${
            this.timeOptions.timing[i].start_time
          }`
        )
          .format('mm')
          .valueOf()
        const end = +moment(
          `${this.timeOptions.schedule_date} ${
            this.timeOptions.timing[i].end_time
          }`
        )
          .format('mm')
          .valueOf()
        if (selectedHour === startHour) {
          return difference(allTime, this.range(start, 60))
        } else if (selectedHour === endHour) {
          return difference(allTime, this.range(0, end))
        }
      }
    },
    disabledHours() {
      let disabledHours = []
      const allTime = this.range(0, 24)
      for (let i = 0; i < this.timeOptions.timing.length; i++) {
        const start = +moment(
          `${this.timeOptions.schedule_date} ${
            this.timeOptions.timing[i].start_time
          }`
        )
          .format('H')
          .valueOf()
        const end = +moment(
          `${this.timeOptions.schedule_date} ${
            this.timeOptions.timing[i].end_time
          }`
        )
          .format('H')
          .valueOf()
        disabledHours = [...disabledHours, ...this.range(start, end)]
      }
      return difference(allTime, disabledHours)
    },
    save() {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.reserveService
            .update({ id: this.info.id, coach_id: values.coach_id })
            .subscribe(res => {
              this.show = false
              this.$router.push({ query: this.query, force: true })
            })
        }
      })
    },
    onChangeMember(val) {
      this.value = val
      this.commonService.getOptions('getConsumeList', val.key, () => {})
    }
  }
}
</script>

<style lang="scss" scoped></style>
