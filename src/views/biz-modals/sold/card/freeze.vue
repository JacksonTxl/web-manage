<template>
  <st-modal
    title="冻结"
    size="small"
    v-model="show"
    wrapClassName="modal-sold-card-freeze"
  >
    <div :class="freeze('content')">
      <a-row :class="freeze('info')">
        <a-col :span="24">
          <st-info>
            <st-info-item label="卡名">{{ freezeInfo.card_name }}</st-info-item>
            <st-info-item label="额度">
              {{ freezeInfo.remain_amount }}
            </st-info-item>
            <st-info-item label="有效期">
              {{ freezeInfo.start_time }} 至 {{ freezeInfo.end_time }}
            </st-info-item>
            <st-info-item class="mgb-24" label="剩余冻结时长">
              {{ freezeInfo.frozen_time_remain }}
            </st-info-item>
          </st-info>
        </a-col>
      </a-row>
      <st-form :form="form" labelWidth="68px">
        <div :class="freeze('freeze')">
          <st-form-item
            class="mg-b0"
            label="冻结日期"
            required
            labelGutter="12px"
          >
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
                  v-decorator="decorators.end_time"
                  @change="onChangeEndTime"
                  style="width:170px"
                  :showTime="{ defaultValue: startTime, format: 'HH:mm' }"
                  format="YYYY-MM-DD HH:mm"
                  placeholder="结束时间"
                  :showToday="false"
                />
              </a-form-item>
            </div>
          </st-form-item>
          <st-form-item label="手续费" labelGutter="12px">
            <st-input-number
              :max="99999.9"
              v-model="frozen_fee"
              @change="onFrozenChange"
              :float="true"
            >
              <template slot="addonAfter">
                元
              </template>
            </st-input-number>
          </st-form-item>
          <st-form-item
            label="支付方式"
            :required="frozen_fee > 0"
            labelGutter="12px"
          >
            <a-select
              v-decorator="decorators.pay_method"
              placeholder="选择支付方式"
              :disabled="!(frozen_fee > 0)"
            >
              <a-select-option
                v-for="(item, index) in memberPaymentlist"
                :key="index"
                :value="+item.payment_type"
              >
                {{ item.payment_type_name }}
              </a-select-option>
            </a-select>
          </st-form-item>
        </div>
      </st-form>
    </div>
    <template slot="footer">
      <st-button @click="onSubmit" :loading="loading.freeze" type="primary">
        确认提交
      </st-button>
    </template>
  </st-modal>
</template>

<script>
import { cloneDeep } from 'lodash-es'
import { UserService } from '@/services/user.service'
import { FreezeService } from './freeze.service'
import { ruleOptions } from './freeze.config'
export default {
  name: 'ModalSoldCardFreeze',
  serviceProviders() {
    return [FreezeService]
  },
  serviceInject() {
    return {
      userService: UserService,
      freezeService: FreezeService
    }
  },
  rxState() {
    return {
      freezeInfo: this.freezeService.freezeInfo$,
      loading: this.freezeService.loading$,
      sold: this.userService.soldEnums$,
      memberPaymentlist: this.freezeService.memberPaymentlist$
    }
  },
  bem: {
    freeze: 'modal-sold-card-freeze'
  },
  props: ['id'],
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      show: false,
      startTime: moment(),
      endTime: null,
      frozen_fee: null
    }
  },
  created() {
    this.freezeService.getFreezeInfo(this.id).subscribe()
  },
  methods: {
    // 售卖时间-end
    onChangeEndTime(data) {
      this.endTime = cloneDeep(data)
    },
    disabledEndDate(endValue) {
      return (
        endValue.valueOf() < moment().valueOf() ||
        endValue.valueOf() > moment(this.freezeInfo.end_time).valueOf()
      )
    },
    onFrozenChange(data) {
      this.form.resetFields(['payType'])
    },
    onSubmit() {
      this.form.validateFields((error, values) => {
        if (!error) {
          this.freezeService
            .freeze(
              {
                end_time: values.end_time.format('YYYY-MM-DD HH:mm'),
                poundage: this.frozen_fee,
                pay_method: values.pay_method
              },
              this.id
            )
            .subscribe(res => {
              this.$emit('success')
              this.show = false
            })
        }
      })
    }
  }
}
</script>
