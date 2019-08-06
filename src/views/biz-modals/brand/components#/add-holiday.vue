<template>
  <div>
    <st-form :form="form" labelWidth="100px" @submit.prevent="onSubmit">
      <a-row>
        <a-col :xs="22">
          <div>{{ shopName }}</div>
          <st-form-item v-show="false">
            <input type="hidden" v-decorator="decorators.shop_id" />
          </st-form-item>
          <st-form-item label="放假开始时间" required class="mg-t16">
            <a-date-picker
              v-decorator="decorators.start_time"
              :showTime="{ format: appConfig.DATE_FORMAT.time }"
              :format="appConfig.DATE_FORMAT.datetime"
              placeholder="请选择放假开始时间"
              style="width: 240px"
              :disabledDate="disabledStartDate"
            />
          </st-form-item>
          <st-form-item label="放假结束时间" required class="mg-t16">
            <a-date-picker
              v-decorator="decorators.end_time"
              :showTime="{ format: appConfig.DATE_FORMAT.time }"
              :format="appConfig.DATE_FORMAT.datetime"
              placeholder="请选择放假结束时间"
              style="width: 240px"
              :disabledDate="disabledEndDate"
            />
          </st-form-item>
          <st-form-item labelFix class="mg-b0">
            <st-button type="primary" :loading="loading.set">
              确认设置放假时间
            </st-button>
          </st-form-item>
        </a-col>
      </a-row>
    </st-form>
  </div>
</template>
<script>
import { MessageService } from '@/services/message.service'
import { HolidayService } from '../setting/shop/holiday.service'
import { AppConfig } from '@/constants/config'
import { ruleOptions } from './holiday.config'
import moment from 'moment'

export default {
  name: 'AddHoliday',
  serviceInject() {
    return {
      messageService: MessageService,
      holidayService: HolidayService,
      appConfig: AppConfig
    }
  },
  rxState() {
    return {
      loading: this.holidayService.loading$
    }
  },
  props: {
    shopId: {
      type: [Number, String],
      default: 0
    },
    shopName: {
      type: String,
      default: ''
    }
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      show: true
    }
  },
  mounted() {
    this.form.setFieldsValue({
      shop_id: this.shopId
    })
  },
  methods: {
    onSubmit(e) {
      this.form.validate().then(() => {
        const data = this.getData()
        this.holidayService.set(data).subscribe(this.onSubmitSuccess)
      })
    },
    getData() {
      const data = this.form.getFieldsValue()
      data.start_time = moment(data.start_time).format(
        this.appConfig.DATE_FORMAT.datetime
      )
      data.end_time = moment(data.end_time).format(
        this.appConfig.DATE_FORMAT.datetime
      )
      return data
    },
    onSubmitSuccess() {
      this.messageService.success({
        content: '添加成功'
      })
      this.$emit('success')
    },
    onCancel() {
      this.$emit('cancel')
    },
    disabledStartDate(current) {
      return current && current < moment()
    },
    disabledEndDate(current) {
      return current && current < this.form.getFieldValue('start_time')
    }
  }
}
</script>
