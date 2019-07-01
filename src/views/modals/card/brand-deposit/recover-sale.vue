<template>
    <st-modal
    title="会员卡恢复售卖"
    v-model="show"
    wrapClassName="modal-card-brand-recover-sale"
    width="484px">
        <div :class="recoverSale()">
            <div :class="recoverSale('warn-text')" class="mg-b24">
                <st-icon color="#1890FF" style="line-height:22px;flex:none;margin-top:4px;" size="14px" type="help"/>
                <p>
                    注：仅恢复会员卡为可售卖状态，该会员卡需要重新上架至门店。
                </p>
            </div>
            <div :class="recoverSale('card-name')" class="mg-b24">
                <st-tag type="deposit-card" style="margin-right:8px;"/>
                <span>{{cardName}}</span>
            </div>
            <st-form :form='form' labelWidth="94px" :class="recoverSale('form')">
                <st-form-item label="支持售卖时间" class="mg-b0" required>
                    <div :class="recoverSale('saletime')">
                        <a-form-item class="page-a-form">
                            <a-date-picker
                            style="width: 100%;"
                            :disabledDate="disabledStartDate"
                            v-decorator="['startTime',{rules:[{validator:startTimeValidator}]}]"
                            format="YYYY-MM-DD"
                            placeholder="开始时间"
                            :showToday="false"
                            @openChange="handleStartOpenChange"
                            @change="startTimeChange"
                            />
                        </a-form-item>
                        <span>~</span>
                        <a-form-item class="page-a-form">
                            <a-date-picker
                            :disabledDate="disabledEndDate"
                            v-decorator="['endTime',{rules:[{validator:endTimeValidator}]}]"
                            format="YYYY-MM-DD"
                            placeholder="结束时间"
                            :showToday="false"
                            :open="endOpen"
                            @openChange="handleEndOpenChange"
                            @change="endTimeChange"
                            />
                        </a-form-item>
                    </div>
                </st-form-item>
            </st-form>
        </div>
        <footer slot="footer" :class="recoverSale('footer')">
            <st-button @click="show=false">取消</st-button>
            <st-button type="primary" :loading="loading.setRecoverSale" @click="onSubmit" ghost>恢复售卖</st-button>
        </footer>
    </st-modal>
</template>
<script>
import { cloneDeep } from 'lodash-es'
import moment from 'moment'
import { RecoverSaleService } from './recover-sale.service'
export default {
  name: 'ModalCardBrandDepositRecoverSale',
  bem: {
    recoverSale: 'modal-card-brand-recover-sale'
  },
  serviceInject() {
    return {
      recoverSaleService: RecoverSaleService
    }
  },
  rxState() {
    return {
      loading: this.recoverSaleService.loading$,
      serviceTime: this.recoverSaleService.time$
    }
  },
  props: ['id', 'cardName', 'time'],
  data() {
    return {
      form: this.$form.createForm(this),
      show: false,
      endOpen: false,
      startTime: null,
      endTime: null
    }
  },
  methods: {
    moment,
    // 开始时间
    disabledStartDate(startValue) {
      const endValue = this.endTime
      if (!endValue) {
        // 结束时间未选择
        return (startValue.valueOf() < moment().subtract(1, 'd').valueOf())
      }
      let start = endValue.valueOf() > moment().add(30, 'y').valueOf() ? moment(endValue).subtract(30, 'y').valueOf() : moment().subtract(1, 'd').add(1, 'ms').valueOf()
      return (startValue.valueOf() < start || startValue.valueOf() > moment(endValue).subtract(1, 'd').valueOf())
    },
    handleStartOpenChange(open) {
      if (!open) {
        this.endOpen = true
      }
    },
    startTimeChange(data) {
      this.startTime = cloneDeep(data)
    },
    startTimeValidator(rule, value, callback) {
      if (!value) {
        // eslint-disable-next-line
                callback('请选择开始售卖时间')
      } else {
        // eslint-disable-next-line
                callback()
      }
    },
    // 结束时间
    disabledEndDate(endValue) {
      const startValue = this.startTime
      if (!startValue) {
        // 开始时间未选择
        return (endValue.valueOf() >= moment().add(30, 'y').valueOf() || endValue.valueOf() <= moment().valueOf())
      }
      return (endValue.valueOf() >= moment(startValue).add(30, 'y').valueOf() || endValue.valueOf() < moment(startValue).valueOf() || endValue.valueOf() <= moment().valueOf())
    },
    handleEndOpenChange(open) {
      this.endOpen = open
    },
    endTimeChange(data) {
      this.endTime = cloneDeep(data)
    },
    endTimeValidator(rule, value, callback) {
      if (!value) {
        // eslint-disable-next-line
                callback('请选择结束售卖时间')
      } else {
        if (!(value.valueOf() > this.serviceTime * 1000)) {
          // eslint-disable-next-line
                    callback('支持售卖时间已过')
        } else {
          // eslint-disable-next-line
                    callback()
        }
      }
    },
    onSubmit() {
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.recoverSaleService.setRecoverSale({
            start_time: `${values.startTime.format('YYYY-MM-DD')}`,
            end_time: `${values.endTime.format('YYYY-MM-DD')}`
          }, this.id).subscribe(() => {
            this.show = false
            this.$emit('success')
          })
        }
      })
    }
  },
  mounted() {
    this.recoverSaleService.getServiceTime().subscribe(() => {
      this.startTime = cloneDeep(moment(this.time.startTime))
      // this.endTime = cloneDeep(moment(this.time.endTime))
      this.form.setFieldsValue({
        'startTime': cloneDeep(moment(this.time.startTime))
        // 'endTime': cloneDeep(moment(this.time.endTime))
      })
    })
  }
}
</script>
