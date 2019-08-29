<template>
  <st-modal title="添加预约" @ok="save" v-model="show" size="small">
    <st-form :form="form">
      <st-form-item label="会员名称" required>
        <a-select
          showSearch
          placeholder="请输入会员名"
          v-decorator="decorators.member_id"
          style="width: 100%"
          :filterOption="false"
          @search="onSearchMember"
          @change="onChangeMember"
          notFoundContent="无搜索结果"
        >
          <a-spin v-if="fetching" slot="notFoundContent" size="small" />
          <a-select-option
            v-for="member in memberOptions"
            :key="member.member_id"
            :value="+member.member_id"
          >
            {{ member.member_name }}
          </a-select-option>
        </a-select>
      </st-form-item>
      <st-form-item label="消费方式" required>
        <a-select
          v-decorator="decorators.consume_type"
          @change="onChangeConsume"
          placeholder="选择消费方式"
        >
          <a-select-opt-group
            v-for="consumeType in consumeOptions"
            :key="consumeType.id"
            :value="consumeType.id"
          >
            <span slot="label">
              <a-icon type="snippets" />
              {{ consumeType.name }}
            </span>
            <a-select-option
              v-for="consume in consumeType.children"
              :value="JSON.stringify(consume)"
              :key="consume.id"
            >
              {{ consume.name }}
            </a-select-option>
          </a-select-opt-group>
        </a-select>
      </st-form-item>
      <st-form-item label="课程" required>
        <a-select
          placeholder="请选择课程"
          @change="onChangeCourse"
          v-decorator="decorators.course_id"
        >
          <a-select-option
            v-for="course in courseOptions"
            :key="course.id"
            :value="course.id"
          >
            {{ course.course_name }}
          </a-select-option>
        </a-select>
      </st-form-item>
      <st-form-item label="上课教练" required>
        <a-select
          v-decorator="decorators.coach_id"
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
        <a-date-picker
          @change="onChangeDatePick"
          v-decorator="decorators.scheduling_id"
          :disabledDate="disabledDate"
        />
      </st-form-item>
      <st-form-item label="预约时间" required>
        <a-time-picker
          format="HH:mm"
          v-decorator="decorators.reserve_start_time"
          :disabledMinutes="disabledMinutes"
          :disabledHours="disabledHours"
        />
      </st-form-item>
    </st-form>
  </st-modal>
</template>

<script>
import { PersonalScheduleCommonService as CommonService } from '@/views/pages/shop/product/course/schedule/personal/service#/common.service'
import { difference, cloneDeep } from 'lodash-es'
import { PersonalScheduleReserveService as ReserveService } from '@/views/pages/shop/product/course/schedule/personal/service#/reserve.service'
import { RouteService } from '@/services/route.service'
import { ruleOptions } from './add-reserve.config'
export default {
  name: 'AddReserve',
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
      courseCoachOptions: cs.courseCoachOptions$,
      consumeOptions: cs.consumeOptions$,
      memberOptions: cs.memberOptions$,
      courseOptions: cs.courseOptions$,
      dateOptions: cs.dateOptions$,
      timeOptions: cs.timeOptions$
    }
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      member_id: '',
      show: false,
      value: '',
      fetching: false,
      formKeyFlag: [
        'consume_type',
        'course_id',
        'coach_id',
        'scheduling_id',
        'reserve_start_time'
      ],
      reserveDate: ''
    }
  },
  methods: {
    // 获取消费方式 权重2
    onChangeConsume(val) {
      if (!val) return
      const v = JSON.parse(val)
      this.form.setFieldsValue({
        course_id: '',
        coach_id: '',
        scheduling_id: undefined,
        'reserve_start_time:': undefined
      })
      this.commonService
        .getCourseList({ id: +v.id, consume_type: +v.consume_type })
        .subscribe()
    },
    // 获取会员 权重1
    onSearchMember(val) {
      this.fetching = true
      this.commonService.getOptions('getMemberList', { member: val }, () => {
        this.fetching = false
      })
    },
    // 获取上课课程 权重4
    onChangeCourse(val) {
      this.form.setFieldsValue({
        coach_id: '',
        scheduling_id: undefined,
        reserve_start_time: undefined
      })
      this.commonService.getCourseCoachList(val).subscribe()
    },
    // 获取时期
    onChangeDatePick(val) {
      const course_id = this.form.getFieldValue('course_id')
      let reserveDate = {
        id: '',
        course_id
      }
      this.form.setFieldsValue({ reserve_start_time: undefined })
      this.dateOptions.forEach(item => {
        val.format('YYYY-MM-DD') === item.schedule_date &&
          (reserveDate.id = item.id)
      })
      const query = { ...reserveDate, member_id: this.member_id }
      this.commonService.getOptions('getTimeList', query, () => {})
    },
    onChangeCourseCoach(val) {
      this.form.setFieldsValue({
        scheduling_id: undefined,
        reserve_start_time: undefined
      })
      this.commonService.getOptions(
        'getDateList',
        { id: val, member_id: this.member_id },
        () => {}
      )
    },
    range(start, end) {
      const result = []
      for (let i = start; i <= end; i++) {
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
      if (!this.timeOptions.timing) return
      let disabledMinutes = []
      const allTime = this.range(0, 60)
      for (let i = 0; i < this.timeOptions.timing.length; i++) {
        const startHour = +moment(
          `${this.timeOptions.schedule_date} ${
            this.timeOptions.timing[i].start_time
          }`
        )
          .format('H')
          .valueOf()
        const endHour = +moment(
          `${this.timeOptions.schedule_date} ${
            this.timeOptions.timing[i].end_time
          }`
        )
          .format('H')
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
        if (+selectedHour === startHour && +selectedHour === endHour) {
          disabledMinutes = [...disabledMinutes, ...this.range(start, end)]
        } else {
          if (+selectedHour === startHour) {
            disabledMinutes = [...disabledMinutes, ...this.range(start, 60)]
          } else if (+selectedHour === endHour) {
            disabledMinutes = [...disabledMinutes, ...this.range(0, end)]
          } else if (+selectedHour > startHour && endHour > +selectedHour) {
            disabledMinutes = [...disabledMinutes, ...this.range(0, 60)]
          }
        }
      }
      return difference(allTime, disabledMinutes)
    },
    disabledHours() {
      if (!this.timeOptions.timing) return
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
        let end = +moment(
          `${this.timeOptions.schedule_date} ${
            this.timeOptions.timing[i].end_time
          }`
        )
          .format('H')
          .valueOf()
        if (!end && this.timeOptions.timing[i].end_time.includes('24')) {
          end = 24
        }
        disabledHours = [...disabledHours, ...this.range(start, end)]
      }
      return difference(allTime, disabledHours) || null
    },
    save() {
      this.form.validate().then(values => {
        const consume = JSON.parse(values.consume_type)
        let form = cloneDeep(values)
        form.member_id = values.member_id
        form.consume_type = consume.consume_type
        form.consume_id = consume.id
        form.reserve_start_time = values.reserve_start_time
          .format('HH:mm')
          .valueOf()
        this.dateOptions.forEach(item => {
          if (
            item.schedule_date ===
            values.scheduling_id.format('YYYY-MM-DD').valueOf()
          ) {
            form.scheduling_id = item.id
          }
        })
        this.reserveService.add(form).subscribe(res => {
          this.show = false
          this.$router.reload()
        })
      })
    },
    onChangeMember(val) {
      this.form.resetFields()
      this.member_id = val
      this.commonService.getOptions('getConsumeList', val, () => {})
    }
  }
}
</script>
