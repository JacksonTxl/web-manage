<template>
  <st-modal
  title="冻结"
  size="small"
  v-model="show"
  wrapClassName="modal-sold-course-freeze">
    <div :class="freeze('content')">
      <a-row :class="freeze('info')">
        <a-col :span="24">
          <st-info>
            <st-info-item label="课程名称">{{courseName}}</st-info-item>
            <st-info-item label="剩余课时">{{courseNum}}</st-info-item>
            <st-info-item class="mgb-24" label="有效期">{{time}}</st-info-item>
          </st-info>
        </a-col>
      </a-row>
      <st-form :form="form" labelWidth="68px">
        <div :class="freeze('freeze')">
          <st-form-item class="mg-b0" label="冻结日期" required labelGutter="12px">
            <div :class="freeze('time')">
              <a-form-item class="page-a-form">
                <a-date-picker
                  style="width: 100%;"
                  :defaultValue="startTime"
                  disabled
                  format="YYYY-MM-DD HH:mm"
                  placeholder="开始时间"
                  :showToday="false"
                />
              </a-form-item>
              <span>~</span>
              <a-form-item class="page-a-form">
                <a-date-picker
                  :disabledDate="disabledEndDate"
                  v-decorator="['endTime',{rules:[{validator:end_time_validator}]}]"
                  @change="end_time_change"
                  style="width:170px"
                  :showTime="{defaultValue:startTime,format: 'HH:mm'}"
                  format="YYYY-MM-DD HH:mm"
                  placeholder="结束时间"
                  :showToday="false"
                />
              </a-form-item>
            </div>
          </st-form-item>
          <st-form-item label="手续费" labelGutter="12px">
            <st-input-number :min="0.1" :max="99999.9" v-model="frozen_fee" @change="onFrozenChange" :float="true">
              <template slot="addonAfter">元</template>
            </st-input-number>
          </st-form-item>
          <st-form-item label="支付方式" :required="frozen_fee>0" labelGutter="12px">
            <a-select
            v-decorator="['payType',{rules:[{validator:pay_type_validator}]}]"
            placeholder="选择支付方式"
            :disabled="!(frozen_fee>0)">
              <a-select-option
              v-for="(item,index) in Object.keys(sold.frozen_pay_type.value)"
              :key="index"
              :value="+item">{{sold.frozen_pay_type.value[item]}}</a-select-option>
            </a-select>
          </st-form-item>
        </div>
      </st-form>
    </div>
    <template slot="footer">
      <st-button @click="onSubmit" :loading="loading.freeze" type="primary">确认提交</st-button>
    </template>
  </st-modal>
</template>

<script>
import moment from 'moment'
import { cloneDeep } from 'lodash-es'
import { UserService } from '@/services/user.service'
import { FreezeService } from './freeze.service'
export default {
  name: 'ModalSoldCourseFreeze',
  serviceInject() {
    return {
      userService: UserService,
      freezeService: FreezeService
    }
  },
  rxState() {
    return {
      loading: this.freezeService.loading$,
      sold: this.userService.soldEnums$
    }
  },
  bem: {
    freeze: 'modal-sold-course-freeze'
  },
  props: ['type', 'id', 'courseName', 'courseNum', 'time', 'courseEndTime'],
  data() {
    return {
      show: false,
      form: this.$form.createForm(this),
      startTime: moment(),
      endTime: null,
      frozen_fee: null,
      frozen_pay_type: 1
    }
  },
  created() {
  },
  methods: {
    moment,
    // end_time validatorFn
    end_time_validator(rule, value, callback) {
      if (!value) {
        // eslint-disable-next-line
        callback('请选择冻结结束日期')
      } else {
        // eslint-disable-next-line
        callback()
      }
    },
    // pay_type validatorFn
    pay_type_validator(rule, value, callback) {
      if (!value && this.frozen_fee > 0) {
        // eslint-disable-next-line
        callback('请选择支付方式')
      } else {
        // eslint-disable-next-line
        callback()
      }
    },
    // 售卖时间-end
    end_time_change(data) {
      this.endTime = cloneDeep(data)
    },
    disabledEndDate(endValue) {
      return endValue.valueOf() < moment().valueOf() || endValue.valueOf() > moment(this.courseEndTime).valueOf()
    },
    onFrozenChange(data) {
      this.form.resetFields(['payType'])
    },
    onSubmit() {
      this.form.validateFields((error, values) => {
        if (!error) {
          this.freezeService.freeze({
            start_time: this.startTime.format('YYYY-MM-DD HH:mm'),
            end_time: values.endTime.format('YYYY-MM-DD HH:mm'),
            frozen_fee: this.frozen_fee,
            frozen_pay_type: values.payType
          }, this.id, this.type).subscribe(res => {
            console.log(2)
            this.show = false
            this.$emit('success')
          })
        }
      })
    }
  }
}
</script>
