<template>
  <st-modal title="补课" v-model="show" width="484px">
    <st-form :form="form" labelWidth="70px" labelAuto>
      <st-form-item label="会员名" required>
        <span>{{}}</span>
      </st-form-item>
      <st-form-item label="缺课班名" required>
        {{ info.course_name }}
      </st-form-item>
      <st-form-item label="适应范围" required>
        黑带
      </st-form-item>
      <st-form-item label="补课课程" required>
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
      <st-form-item label="日期" required class="mg-b0">
        <a-date-picker
          style="width:100%"
          :showTime="{ format: 'YYYY-MM-DD HH:mm' }"
          format="YYYY-MM-DD HH:mm"
          v-decorator="decorators.start_days"
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
import { ruleOptions } from './remedial-course.config'
export default {
  name: 'RemedialCourse',
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
    info: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  created() {
    console.log(this.info)
  },
  mounted() {
    const item = this.item
    const court_item = [item.court_id.id, item.court_id.children.id]
    const time = moment(item.start_time)
    this.form.setFieldsValue({
      course_id: item.course_id,
      coach_id: item.coach_id,
      court_id: court_item,
      start_time: time
    })
    if (!this.cycle_type) {
      this.form.setFieldsValue({ start_days: time })
    }
  },
  methods: {
    onSubmit() {
      this.form.validate().then(values => {
        const form = cloneDeep(values)
        form.start_days = form.start_days.format('YYYY-MM-DD')
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
