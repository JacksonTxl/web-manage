<template>
  <st-form :form="form" labelWidth="100px" @submit.prevent="onSubmit">
    <a-row>
      <a-col :xs="22">
        <div>{{ shopName }}</div>
        <st-form-item v-show="false">
          <input type="hidden" v-decorator="decorators.shop_id" />
        </st-form-item>
        <div v-show="!isEdit">
          <st-form-item label="放假开始时间" required class="mg-t16 mg-b0">
            <span>{{ startTime }}</span>
          </st-form-item>
          <st-form-item label="放假结束时间" required>
            <span>{{ endTime }}</span>
          </st-form-item>
          <st-form-item labelFix class="mg-b0">
            <st-button type="primary" @click="onEdit">修改放假时间</st-button>
            <st-button class="mg-l8" :loading="loading.del" @click="onDel">
              取消放假设置
            </st-button>
          </st-form-item>
        </div>
        <div v-show="isEdit">
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
              :disabled="new Date() >= new Date(startTime)"
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
              确认修改放假时间
            </st-button>
          </st-form-item>
        </div>
      </a-col>
    </a-row>
  </st-form>
</template>
<script>
import moment from 'moment'
import { MessageService } from '@/services/message.service'
import { HolidayService } from '../setting-shop-holiday.service'
import { AppConfig } from '@/constants/config'
import { ruleOptions } from './holiday.config'

export default {
  serviceInject() {
    return {
      holidayService: HolidayService,
      messageService: MessageService,
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
    },
    holidayTime: {
      type: Object,
      default() {
        return {}
      }
    },
    isHoliday: {
      type: Number,
      default: 0
    }
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      show: true,
      isEdit: false,
      dateFormat: 'YYYY-MM-DD HH:mm'
    }
  },
  computed: {
    startTime() {
      return moment(this.holidayTime.start).format(this.dateFormat)
    },
    endTime() {
      return moment(this.holidayTime.end).format(this.dateFormat)
    }
  },
  mounted() {
    this.form.setFieldsValue({
      shop_id: this.shopId,
      start_time: moment(this.startTime),
      end_time: moment(this.endTime)
    })
  },
  methods: {
    onEdit() {
      this.isEdit = true
    },
    onDel() {
      this.holidayService.del(this.shopId).subscribe(this.onDelSuccess)
    },
    onSubmit() {
      this.form.validate().then(values => {
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
    onSuccess(msg = '') {
      this.messageService.success({
        content: msg
      })
      this.$emit('success')
      this.show = false
    },
    onSubmitSuccess() {
      this.onSuccess('修改成功')
    },
    onDelSuccess() {
      this.onSuccess('取消放假成功')
    },
    disabledStartDate(current) {
      return current && current < moment().endOf('day')
    },
    disabledEndDate(current) {
      return current && current < this.form.getFieldValue('start_time')
    }
  }
}
</script>
