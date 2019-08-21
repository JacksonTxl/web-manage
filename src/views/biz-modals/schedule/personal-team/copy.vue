<template>
  <st-modal title="复制排期" :footer="null" v-model="show">
    <st-form :form="form">
      <st-form-item label="时间" required>
        <a-radio-group v-model="timeType" @change="onChangeTimeType">
          <a-radio value="month">
            上月
          </a-radio>
          <a-radio value="week">
            上周
          </a-radio>
          <a-radio value="custom">
            自定义
          </a-radio>
        </a-radio-group>
      </st-form-item>
      <st-form-item label="复制排期" required>
        <a-range-picker
          v-model="copyDefaulValue"
          :disabled="disabled"
          @change="onChangeCopyTime"
        />
      </st-form-item>
      <st-form-item required>
        <template slot="label">
          应用排期
          <st-help-tooltip id="TSGC001" />
        </template>
        <a-date-picker
          v-model="applyStartDate"
          @change="onChangeApplyStartDate"
        />
        ~
        <a-date-picker v-model="applyEndDate" disabled />
      </st-form-item>
      <div class="ta-r">
        <st-button type="primary" @click="onSubmit">确认复制</st-button>
      </div>
    </st-form>
  </st-modal>
</template>

<script>
import { MessageService } from '@/services/message.service'
import { PersonalTeamScheduleScheduleService as ScheduleService } from '@/views/pages/shop/product/course/schedule/personal-team/service#/schedule.service'
export default {
  name: 'CopySchedule',
  serviceInject() {
    return {
      messageService: MessageService,
      scheduleService: ScheduleService
    }
  },
  data() {
    return {
      timeType: 'week',
      moment: moment,
      show: false,
      disabled: true,
      form: this.$form.createForm(this),
      applyStartDate: moment(),
      applyEndDate: moment(),
      addTime: 0,
      copyDefaulValue: []
    }
  },
  created() {
    this.init('week')
  },
  methods: {
    onChangeTimeType(e) {
      this.init(e.target.value)
    },
    init(type) {
      switch (type) {
        case 'month':
          this.disabled = true
          this.copyDefaulValue[0] = moment()
            .month(moment().month() - 1)
            .startOf('month')
          this.copyDefaulValue[1] = moment()
            .month(moment().month() - 1)
            .endOf('month')
          this.applyEndDate = moment(
            this.applyStartDate.valueOf() +
              (this.copyDefaulValue[1].valueOf() -
                this.copyDefaulValue[0].valueOf())
          )
          break
        case 'week':
          this.disabled = true
          this.copyDefaulValue[0] = moment()
            .week(moment().week() - 1)
            .startOf('week')
          this.copyDefaulValue[1] = moment()
            .week(moment().week() - 1)
            .endOf('week')
          this.applyEndDate = moment(
            this.applyStartDate.valueOf() +
              (this.copyDefaulValue[1].valueOf() -
                this.copyDefaulValue[0].valueOf())
          )
          break
        case 'custom':
        default:
          this.disabled = false
          break
      }
    },
    onChangeCopyTime(val) {
      this.applyEndDate = moment(
        this.applyStartDate.valueOf() +
          (this.copyDefaulValue[1].valueOf() -
            this.copyDefaulValue[0].valueOf())
      )
    },
    onChangeApplyStartDate(val) {
      this.applyEndDate = moment(
        val.valueOf() +
          (this.copyDefaulValue[1].valueOf() -
            this.copyDefaulValue[0].valueOf())
      )
    },
    onSubmit() {
      const form = {
        copy_start_time: this.copyDefaulValue[0].format('YYYY-MM-DD'),
        copy_end_time: this.copyDefaulValue[1].format('YYYY-MM-DD'),
        apply_start_time: this.applyStartDate.format('YYYY-MM-DD'),
        apply_end_time: this.applyEndDate.format('YYYY-MM-DD')
      }
      this.scheduleService.copy(form).subscribe(this.onCopyScheduleSuccess)
    },
    onCopyScheduleSuccess() {
      this.show = false
      this.messageService.success({
        content: '复制成功'
      })
      this.$emit('ok')
    }
  }
}
</script>
