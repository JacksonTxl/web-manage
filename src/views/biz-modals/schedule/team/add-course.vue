<template>
  <st-modal
    title="新增课程排期"
    v-model="show"
    width="484px"
    wrapClassName="modal-shop-team-add-course"
  >
    <st-form :form="form" labelAuto>
      <st-form-item label="时间" required>
        <a-date-picker
          style="width: 100%"
          placeholder="请选择时间"
          :showTime="{ format: 'HH:mm' }"
          format="YYYY-MM-DD HH:mm"
          v-decorator="decorators.start_time"
        >
          <a-icon slot="suffixIcon" type="clock-circle" />
        </a-date-picker>
      </st-form-item>
      <st-form-item label="课程" required>
        <a-select placeholder="请选择课程" v-decorator="decorators.course_id">
          <a-select-option
            v-for="course in courseOptions"
            :key="course.id"
            :value="course.id"
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
            v-for="coach in coachOptions"
            :key="coach.id"
            :value="coach.id"
          >
            {{ coach.staff_name }}
          </a-select-option>
        </a-select>
      </st-form-item>
      <st-form-item label="场地">
        <a-cascader
          placeholder="请选择场地"
          :options="courtOptions"
          :fieldNames="{ label: 'name', value: 'id', children: 'children' }"
          v-decorator="decorators.court_id"
        />
      </st-form-item>
      <st-form-item label="人数" required>
        <st-input-number
          placeholder="请输入人数"
          v-decorator="decorators.limit_num"
        >
          <span slot="addonAfter" class="addon-width">人</span>
        </st-input-number>
      </st-form-item>
      <st-form-item label="单节预约价格" required class="mg-b0">
        <st-input-number
          placeholder="请输入单节预约价格"
          v-decorator="decorators.course_fee"
        >
          <span slot="addonAfter" class="addon-width">元/节</span>
        </st-input-number>
      </st-form-item>
    </st-form>
    <template slot="footer">
      <st-button @click="onClick">批量设置</st-button>
      <st-button type="primary" :loading="loading.add" @click="onSubmit">
        提交
      </st-button>
    </template>
  </st-modal>
</template>

<script>
import { cloneDeep } from 'lodash-es'
import { TeamScheduleScheduleService } from '@/views/pages/shop/product/course/schedule/team/service#/schedule.service'
import { TeamScheduleCommonService } from '@/views/pages/shop/product/course/schedule/team/service#/common.service'
import { TeamService } from '@/views/pages/shop/product/course/schedule/team/team.service'
import ScheduleTeamAddCourseBatch from '@/views/biz-modals/schedule/team/add-course-batch'
import { ruleOptions } from './add-course.config'
export default {
  name: 'AddCourseSchedule',
  modals: {
    ScheduleTeamAddCourseBatch
  },
  serviceInject() {
    return {
      teamScheduleCommomService: TeamScheduleCommonService,
      teamScheduleScheduleService: TeamScheduleScheduleService,
      teamService: TeamService
    }
  },
  rxState() {
    const tss = this.teamScheduleCommomService
    return {
      loading: this.teamScheduleScheduleService.loading$,
      coachOptions: tss.coachOptions$,
      courseOptions: tss.courseOptions$,
      courtOptions: tss.courtOptions$
    }
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      show: false
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
    onSubmit() {
      this.form.validate().then(values => {
        const form = cloneDeep(values)
        form.start_time = form.start_time.format('YYYY-MM-DD HH:mm')
        if (form.court_id) {
          form.court_site_id = +form.court_id[1]
          form.court_id = +form.court_id[0]
        }
        form.course_fee = form.course_fee
        form.limit_num = form.limit_num
        this.teamScheduleScheduleService.add(form).subscribe(() => {
          this.$emit('ok')
          this.show = false
        })
      })
    },
    onClick() {
      this.show = false
      this.$modalRouter.push({
        name: 'schedule-team-add-course-batch',
        on: {
          ok: res => {
            this.onScheduleChange()
          }
        }
      })
    },
    onScheduleChange() {
      this.$router.push({ query: this.$searchQuery })
    }
  }
}
</script>
