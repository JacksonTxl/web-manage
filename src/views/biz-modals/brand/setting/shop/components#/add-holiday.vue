<template>
  <div>
    <st-form :form="form" labelWidth="70px" @submit.prevent="onSubmit">
      <a-row>
        <a-col :xs="22">
          <div>
            <span class="mg-r8">放假门店</span>
            {{ shopName }}
          </div>
          <st-form-item v-show="false">
            <input type="hidden" v-decorator="decorators.shop_id" />
          </st-form-item>
          <st-form-item label="放假时间" required class="mg-t16">
            <a-range-picker
              v-decorator="decorators.date"
              :showTime="{ format: appConfig.DATE_FORMAT.time }"
              :format="appConfig.DATE_FORMAT.datetime"
              style="width:100%"
              @change="onSubmit"
              :disabledDate="disabledStartDate"
            />
          </st-form-item>
          <!-- <st-form-item label="放假结束时间" required class="mg-t16">
            <a-date-picker
              v-decorator="decorators.end_time"
              :showTime="{ format: appConfig.DATE_FORMAT.time }"
              :format="appConfig.DATE_FORMAT.datetime"
              placeholder="请选择放假结束时间"
              style="width: 240px"
              :disabledDate="disabledEndDate"
            />
          </st-form-item> -->
          <!-- <st-form-item labelFix class="mg-b0">
            <st-button type="primary" :loading="loading.set">
              确认设置放假时间
            </st-button>
          </st-form-item> -->
        </a-col>
      </a-row>
    </st-form>
  </div>
</template>
<script>
import { MessageService } from '@/services/message.service'
import { HolidayService } from '../holiday.service'
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
      this.form.validate().then(values => {
        let para = {
          start_time: values.date[0].format('YYYY-MM-DD HH:mm'),
          end_time: values.date[1].format('YYYY-MM-DD HH:mm'),
          shop_id: values.shop_id
        }
        this.holidayService.set(para).subscribe(this.onSubmitSuccess)
      })
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
    }
  }
}
</script>
