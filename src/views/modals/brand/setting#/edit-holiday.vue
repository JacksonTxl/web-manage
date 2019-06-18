<template>
  <st-form :form="form" labelWidth="100px">
    <a-row>
      <a-col :xs="22">
        <div>{{shopName}}</div>
        <st-form-item v-show="false">
          <input type="hidden" v-decorator="formRules.shopId">
        </st-form-item>
        <div v-show="!isEdit">
          <st-form-item label="放假开始时间" required class="mg-t16 mg-b0">
            <span>{{startTime}}</span>
          </st-form-item>
          <st-form-item label="放假结束时间" required>
            <span>{{endTime}}</span>
          </st-form-item>
          <st-form-item labelFix class="mg-b0">
            <st-button type="primary" @click="onEdit">修改放假时间</st-button>
            <st-button class="mg-l8" @click="onDel">取消放假设置</st-button>
          </st-form-item>
        </div>
        <div v-show="isEdit">
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
            <st-button type="primary" :loading="loading.add" @click="onSubmit">确认修改放假时间</st-button>
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
  serviceInject() {
    return {
      holidayService: HolidayService,
      messageService: MessageService
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
    return {
      show: true,
      formRules,
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
  created() {
    this.form = this.$form.createForm(this)
  },
  mounted() {
    this.$nextTick(() => {
      this.form.setFieldsValue({
        shop_id: this.shopId,
        start_time: moment(this.startTime),
        end_time: moment(this.endTime)
      })
    })
  },
  methods: {
    onEdit() {
      this.isEdit = true
    },
    onDel() {
      this.holidayService.del(this.shopId).subscribe(this.onDelSuccess)
    },
    onSubmit(e) {
      e.preventDefault()
      this.form.validateFields().then(() => {
        const data = this.form.getFieldsValue()
        this.holidayService.update(data).subscribe(this.onSubmitSuccess)
      })
    },
    onSuccess(msg = '') {
      this.messageService.success({
        content: msg
      })
      this.$emit('change')
      this.show = false
    },
    onSubmitSuccess() {
      this.onSuccess('修改成功')
    },
    onDelSuccess() {
      this.onSuccess('删除成功')
    }
  }
}
</script>
