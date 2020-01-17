<template>
  <st-modal title="门店放假设置" v-model="show" @ok="onSubmit" size="small">
    <st-form :form="form" labelWidth="70px" @submit.prevent="onSubmit">
      <st-form-item label="放假门店" type="text">
        {{ shopName }}
        <a
          v-if="isHoliday"
          style="color:#FF5E41"
          class="mg-l8 fl-r cursor-pointer"
          :loading="loading.del"
          @click="onDel"
        >
          取消放假
        </a>
      </st-form-item>
      <st-form-item v-show="false">
        <input type="hidden" v-decorator="decorators.shop_id" />
      </st-form-item>
      <st-form-item label="放假时间" required class="mg-b0">
        <a-range-picker
          v-decorator="decorators.date"
          :showTime="{ format: appConfig.DATE_FORMAT.time }"
          :format="appConfig.DATE_FORMAT.datetime"
          style="width:100%"
          :disabledDate="disabledStartDate"
        />
      </st-form-item>
    </st-form>
  </st-modal>
</template>
<script>
import { MessageService } from '@/services/message.service'
import { HolidayService } from './holiday.service'
import { AppConfig } from '@/constants/config'
import { ruleOptions } from './components#/holiday.config'
import moment from 'moment'
export default {
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
      show: true
    }
  },
  mounted() {
    if (this.isHoliday) {
      this.form.setFieldsValue({
        shop_id: this.shopId,
        date: this.holidayTime.start
          ? [moment(this.holidayTime.start), moment(this.holidayTime.end)]
          : []
      })
    }
  },
  components: {},
  methods: {
    onSubmit(e) {
      this.form.validate().then(values => {
        let para = {
          start_time: values.date[0].format('YYYY-MM-DD HH:mm'),
          end_time: values.date[1].format('YYYY-MM-DD HH:mm'),
          shop_id: this.shopId
        }
        this.holidayService.set(para).subscribe(this.onSubmitSuccess)
      })
    },
    onSubmitSuccess() {
      this.messageService.success({
        content: '设置成功'
      })
      this.$emit('change')
      this.show = false
    },
    onCancel() {
      this.$emit('cancel')
    },
    onDel() {
      this.holidayService.del(this.shopId).subscribe(this.onDelSuccess)
    },
    onDelSuccess() {
      this.messageService.success({
        content: '取消放假成功'
      })
      this.show = false
      this.$emit('change')
    },
    disabledStartDate(current) {
      return current && current < moment()
    }
  }
}
</script>
