<template>
  <st-modal title="新增课程排期" v-model="show" width="520px">
    <st-form :form="form" labelWidth="72px" labelAuto>
      <st-form-item label="日期" required>
        <a-date-picker style="width:100%" v-decorator="decorators.start_days" />
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
            {{ coach.name }}
          </a-select-option>
        </a-select>
      </st-form-item>
      <st-form-item label="场地" required>
        <a-cascader
          placeholder="请选择场地"
          :options="courtOptions"
          :fieldNames="{ label: 'name', value: 'id', children: 'children' }"
          v-decorator="decorators.court_id"
        />
      </st-form-item>
      <st-form-item label="排课名称" class="mg-b0">
        <a-input
          placeholder="请输入"
          v-decorator="decorators.current_course_name"
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
      coachSmallCourseOptions: tss.coachBindOptions$,
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
      smallCourseInfo: {}
    }
  },
  props: {
    time: {
      type: Object,
      default: () => {
        return moment()
      }
    }
  },
  methods: {
    onChangeCourse(value) {
      this.smallCourseScheduleCommonService.getBindCoachList(value).subscribe()
      this.courseSmallCourseOptions.forEach((item, index) => {
        if (item.course_id === value) {
          this.smallCourseInfo = item
          console.log(item)
        }
      })
    },
    onSubmit() {
      this.form.validate().then(values => {
        const form = cloneDeep(values)
        console.log(values)
        const start_days = values.start_days.format('YYYY-MM-DD')
        const start_time = values.start_time.format('HH:mm')
        const end_time = values.end_time.format('HH:mm')
        form.start_time = start_days + ' ' + start_time
        form.end_time = start_days + ' ' + end_time
        form.cycle_start_date = this.smallCourseInfo.course_begin_time
        form.cycle_end_date = this.smallCourseInfo.course_end_time
        if (form.court_id) {
          form.court_site_id = +form.court_id[1]
          form.court_id = +form.court_id[0]
        }
        // 提交
        console.log(form)
        this.smallCourseScheduleService.add(form).subscribe(res => {
          if (!res.conflict) {
            this.$emit('ok')
            this.show = false
            this.onScheduleChange()
          }
        })
      })
    },
    onScheduleChange() {
      this.$router.reload()
    },
    onClick() {
      this.show = false
    }
  }
}
</script>
