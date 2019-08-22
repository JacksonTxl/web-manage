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
        <!-- TODO: 需要添加初始值-->
        <a-select
          v-decorator="decorators.coach_id"
          placeholder="请选择上课教练"
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
import { PersonalScheduleCommonService as CommonService } from '@/views/pages/shop/product/course/schedule/personal/service#/common.service'
import { difference, cloneDeep } from 'lodash-es'
import { RouteService } from '@/services/route.service'
import { PersonalScheduleReserveService as ReserveService } from '@/views/pages/shop/product/course/schedule/personal/service#/reserve.service'
import { ruleOptions } from './add-reserve.config'
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
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      show: false,
      value: '',
      fetching: false,
      reserveDate: ''
    }
  },
  mounted() {
    this.reserveService.getUpdateInfo(this.info.id).subscribe(res => {
      this.commonService
        .getCourseCoachList(res.info.course.id)
        .subscribe(() => {
          this.form.setFieldsValue({
            coach_id: res.info.coach.id
          })
        })
    })
  },
  methods: {
    save() {
      this.form.validate().then(values => {
        this.reserveService
          .update({ id: this.info.id, coach_id: values.coach_id })
          .subscribe(res => {
            this.show = false
            this.$router.push({ query: this.query, force: true })
          })
      })
    }
  }
}
</script>
