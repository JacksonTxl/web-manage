<template>
  <st-form :form="form" labelWidth="100px">
    <a-row>
      <a-col :xs="22">
        <div>{{shopName}}</div>
        <st-form-item v-show="false">
          <input type="hidden" v-decorator="formRules.shopId">
        </st-form-item>
        <div v-show="!isEdit">
          <st-form-item label="放假开始时间" required class="mg-t16">
            <span>2019-06-08 22:00</span>
          </st-form-item>
          <st-form-item label="放假结束时间" required class="mg-t16">
            <span>2019-06-08 22:00</span>
          </st-form-item>
          <st-form-item labelFix class="mg-b0">
            <st-button type="primary" @click="onEdit">修改放假时间</st-button>
            <st-button class="mg-l8">取消放假设置</st-button>
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
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="请选择放假开始时间"
              style="width: 240px"
            />
          </st-form-item>
          <st-form-item label="放假结束时间" required class="mg-t16">
              <a-date-picker
              v-decorator="formRules.endTime"
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="请选择放假结束时间"
              style="width: 240px"
            />
          </st-form-item>
          <st-form-item labelFix class="mg-b0">
            <st-button type="primary">确认修改放假时间</st-button>
          </st-form-item>
        </div>
      </a-col>
    </a-row>
  </st-form>
</template>
<script>
import { MessageService } from '@/services/message.service'
import { ShopStatusService as EditService } from '../setting-shop-status.service'
import moment from 'moment'
const formRules = {
  shopId: ['shop_id'],
  startTime: [
    'holiday_start_time', {
      rules: [{
        required: true,
        message: '请输入放假开始时间'
      }]
    }
  ],
  endTime: [
    'holiday_end_time', {
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
      editService: EditService,
      messageService: MessageService
    }
  },
  rxState() {
    return {
      loading: this.editService.loading$
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
    startTime: {
      type: Object,
      default: () => {
        return moment()
      }
    },
    endTime: {
      type: Object,
      default: () => {
        return moment()
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
      isEdit: false
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
    onEdit() {
      this.isEdit = true
    },
    onSubmit(e) {
      e.preventDefault()
      this.form.validateFields().then(() => {
        const data = this.form.getFieldsValue()
        this.editService.update(data).subscribe(this.onSubmitSuccess)
      })
    },
    onSubmitSuccess() {
      this.messageService.success({
        content: '更改成功'
      })
      this.$emit('change')
      this.show = false
    },
    onCancel() {
      this.show = false
    }
  }
}
</script>
