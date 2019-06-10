<template>
  <div>
    <st-form :form="form" labelWidth="100px">
      <a-row>
        <a-col :xs="22">
          <div>{{shopName}}</div>
          <st-form-item v-show="false">
            <input type="hidden" v-decorator="formRules.id">
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
            <st-button type="primary">确认设置放假时间</st-button>
          </st-form-item>
        </a-col>
      </a-row>
    </st-form>
  </div>
</template>
<script>
import { UserService } from '@/services/user.service'
import { MessageService } from '@/services/message.service'
import { ShopStatusService as EditService } from '../setting-shop-status.service'
import moment from 'moment'
const formRules = {
  id: ['id'],
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
  name: 'AddHoliday',
  serviceInject() {
    return {
      userService: UserService,
      editService: EditService,
      messageService: MessageService
    }
  },
  rxState() {
    return {
      shopEnums: this.userService.shopEnums$,
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
    }
  },
  computed: {
    shopStatusList() {
      return this.shopEnums.shop_status.value || {}
    },
    isValidList() {
      return this.shopEnums.is_valid.value || {}
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
        id: this.shopId,
        holiday_start_time: this.startTime,
        holiday_end_time: this.endTime
      })
    })
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()
      const that = this
      this.form.validateFields().then(() => {
        const data = this.form.getFieldsValue()
        this.editService.update(data).subscribe(this.onSubmitSuccess)
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
      this.show = false
    }
  }
}
</script>
