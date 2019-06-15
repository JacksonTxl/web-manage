<template>
  <div>
    <st-form :form="form" labelWidth="100px">
      <a-row>
        <a-col :xs="22">
          <div>{{shopName}}</div>
          <st-form-item v-show="false">
            <input type="hidden" v-decorator="formRules.shopId">
          </st-form-item>
          <st-form-item label="放假开始时间" required class="mg-t16">
            <a-date-picker
              v-decorator="formRules.startTime"
              showTime
              format="YYYY-MM-DD HH:mm"
              placeholder="请选择放假开始时间"
              style="width: 240px"
            />
          </st-form-item>
          <st-form-item label="放假结束时间" required class="mg-t16">
              <a-date-picker
              v-decorator="formRules.endTime"
              showTime
              format="YYYY-MM-DD HH:mm"
              placeholder="请选择放假结束时间"
              style="width: 240px"
            />
          </st-form-item>
          <st-form-item labelFix class="mg-b0">
            <st-button type="primary" :loading="loading.add" @click="onSubmit">确认设置放假时间</st-button>
          </st-form-item>
        </a-col>
      </a-row>
    </st-form>
  </div>
</template>
<script>
import { MessageService } from '@/services/message.service'
import { HolidayService } from '../setting-shop-holiday.service'
import moment from 'moment'
const formRules = {
  shopId: ['shop_id'],
  startTime: [
    'start_time', {
      rules: [{
        required: true,
        message: '请输入放假开始时间'
      }]
    }
  ],
  endTime: [
    'end_time', {
      rules: [{
        required: true,
        message: '请输入放假结束时间'
      }]
    }
  ]
}
export default {
  name: 'AddHoliday',
  serviceInject() {
    return {
      messageService: MessageService,
      holidayService: HolidayService
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
    return {
      show: true,
      formRules
    }
  },
  created() {
    this.form = this.$form.createForm(this)
  },
  mounted() {
    this.$nextTick(() => {
      this.form.setFieldsValue({
        shop_id: this.shopId,
        holiday_start_time: this.startTime,
        holiday_end_time: this.endTime
      })
    })
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()
      this.form.validateFields().then(() => {
        const data = this.form.getFieldsValue()
        this.holidayService.add(data).subscribe(this.onSubmitSuccess)
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
    }
  }
}
</script>
