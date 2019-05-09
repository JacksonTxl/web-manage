<template>
  <st-modal title="新增课程排期" :footer="null" @ok="save" v-model="show" size="484px">
    <st-form :form="form">
      <st-form-item label="时间" required>
        <a-date-picker showTime format="YYYY-MM-DD HH:mm" @change="onChange">
          <a-icon slot="suffixIcon" type="clock-circle" />
        </a-date-picker>
      </st-form-item>
      <st-form-item label="课程" required>
        <a-select @change="onChange" />
      </st-form-item>
      <st-form-item label="教练" required>
        <a-select @change="onChange" />
      </st-form-item>
      <st-form-item label="场地">
        <a-select @change="onChange" />
      </st-form-item>
      <st-form-item label="人数" required>
        <a-input-search @change="onChange"> <a-button slot="enterButton">人</a-button> </a-input-search>
      </st-form-item>
      <st-form-item label="课时费" required>
        <a-input-search @change="onChange"> <a-button slot="enterButton">元/节</a-button> </a-input-search>
      </st-form-item>
      <a-row>
        <a-col
          :span="24"
          :style="{ textAlign: 'right' }"
        >
          <st-button  @click="onClick">批量设置</st-button>
          <st-button
            type="primary"
            @click="onSubmit"
            :loading="loading.postScheduleTeam">
            提交
          </st-button>
        </a-col>
      </a-row>
    </st-form>
  </st-modal>
</template>

<script>
import { ScheduleService } from './schedule.service.ts'
export default {
  name: 'AddCourseSchedule',
  serviceInject() {
    return {
      scheduleService: ScheduleService
    }
  },
  rxState() {
    return {
      loading: this.scheduleService.loading$
    }
  },
  data() {
    return {
      show: false,
      form: this.$form.createForm(this)
    }
  },
  methods: {
    onSubmit() {
      const form = {
        course_id: 23,
        coach_id: 1,
        start_time: '2018-03-10 12:12:12',
        limit_num: 12,
        course_fee: 100,
        court_id: 2,
        court_site_id: 2
      }
      this.scheduleService.postScheduleTeam(form).subscribe(() => {
        this.$alert('新增团课排期成功')
      })
    },
    onClick() {
      this.show = false
      this.$modalRouter.push({
        name: 'schedule-add-course-schedule-batch'
      })
    },
    handleReset() {

    },
    onChange() {

    },
    save() {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
