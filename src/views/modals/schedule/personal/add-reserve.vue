<template>
  <st-modal title="添加预约" @ok="save" v-model="show">
    <st-form :form="form">
      <st-form-item label="会员名称" required>
        <a-select
          labelInValue
          showSearch
          placeholder="请输入会员名"
          v-decorator="['member_id']"
          style="width: 100%"
          :filterOption="false"
          @search="onSearchMember"
          @change="onChangeMember"
          :notFoundContent="fetching ? undefined : null">
          <a-spin v-if="fetching" slot="notFoundContent" size="small"/>
          <a-select-option v-for="member in memberOptions" :key="member.member_id">{{member.member_name}}</a-select-option>
        </a-select>
      </st-form-item>
      <st-form-item label="消费方式" required>
        <a-select
          v-decorator="['consume_type']"
          placeholder="选择消费方式">
          <a-select-opt-group v-for="consumeType in consumeOptions" :key="consumeType.id">
            <span slot="label"><a-icon type="snippets"/>{{consumeType.name}}</span>
            <a-select-option v-for="consume in consumeType.children" :value="JSON.stringify(consume)" :key="consume.id">{{consume.name}}</a-select-option>
          </a-select-opt-group>
        </a-select>
      </st-form-item>
      <st-form-item label="课程" required>
        <a-select placeholder="请选择课程"
        @change="onChangeCourse"
        v-decorator="['course_id']">
          <a-select-option v-for="course in courseOptions" :key="course.id" :value="course.id">{{course.course_name}}</a-select-option>
        </a-select>
      </st-form-item>
      <st-form-item label="上课教练"

      required>
        <a-select v-decorator="['coach_id']" placeholder="请选择上课教练" @change="onChangeCourseCoach">
          <a-select-option v-for="courseCoach in courseCoachOptions" :key="courseCoach.id" :value="courseCoach.id">{{courseCoach.name}}</a-select-option>
        </a-select>
      </st-form-item>
      <st-form-item label="预约日期" required>

        <a-date-picker @change="onChangeDatePick" v-decorator="['scheduling_id']" :disabledDate="disabledDate"/>
      </st-form-item>
      <st-form-item label="预约时间" required>

        <a-time-picker format="HH:mm" v-decorator="['reserve_start_time']" :disabledMinutes="disabledMinutes" :disabledHours="disabledHours" />
      </st-form-item>
    </st-form>

  </st-modal>
</template>

<script>
import { PersonalScheduleCommonService as CommonService } from '../../../pages/shop/product/course/schedule/personal.service#/common.service'
import { difference, cloneDeep } from 'lodash-es'
import { PersonalScheduleReserveService as ReserveService } from '../../../pages/shop/product/course/schedule/personal.service#/reserve.service'
export default {
  name: 'AddReserve',
  serviceInject() {
    return {
      commonService: CommonService,
      reserveService: ReserveService
    }
  },
  rxState() {
    console.log(this.commonService)
    const cs = this.commonService
    return {
      courseCoachOptions: cs.courseCoachOptions$ || [],
      consumeOptions: cs.consumeOptions$ || [],
      memberOptions: cs.memberOptions$ || [],
      courseOptions: cs.courseOptions$ || [],
      dateOptions: cs.dateOptions$ || [],
      timeOptions: cs.timeOptions$ || []
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
  methods: {
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
        val.format('YYYY-MM-DD') === item.schedule_date && (reserveDate = item.id)
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
      return current && !this.dateOptions.map(item => {
        return item.schedule_date
      }).includes(current.format('YYYY-MM-DD').valueOf())
    },
    disabledMinutes(selectedHour) {
      let disabledMinutes = []
      const allTime = this.range(0, 60)
      for (let i = 0; i < this.timeOptions.timing.length; i++) {
        const startHour = +moment(`${this.timeOptions.schedule_date} ${this.timeOptions.timing[i].start_time}`).format('HH').valueOf()
        const endHour = +moment(`${this.timeOptions.schedule_date} ${this.timeOptions.timing[i].end_time}`).format('HH').valueOf()
        const start = +moment(`${this.timeOptions.schedule_date} ${this.timeOptions.timing[i].start_time}`).format('mm').valueOf()
        const end = +moment(`${this.timeOptions.schedule_date} ${this.timeOptions.timing[i].end_time}`).format('mm').valueOf()
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
        const start = +moment(`${this.timeOptions.schedule_date} ${this.timeOptions.timing[i].start_time}`).format('H').valueOf()
        const end = +moment(`${this.timeOptions.schedule_date} ${this.timeOptions.timing[i].end_time}`).format('H').valueOf()
        disabledHours = [...disabledHours, ...this.range(start, end)]
      }
      return difference(allTime, disabledHours)
    },
    save() {
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          const consume = JSON.parse(values.consume_type)
          let form = cloneDeep(values)
          form.member_id = values.member_id.key
          form.consume_type = consume.consume_type
          form.consume_id = consume.id
          form.reserve_start_time = values.reserve_start_time.format('HH:mm').valueOf()
          this.dateOptions.forEach(item => {
            if (item.schedule_date === values.scheduling_id.format('YYYY-MM-DD').valueOf()) {
              form.scheduling_id = item.id
            }
          })
          this.reserveService.curd('add', form, () => {
            this.show = false
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

<style lang="scss" scoped>

</style>
