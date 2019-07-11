<template>
  <st-modal
  title="流水冲销"
  size="small"
  v-model="show"
  wrapClassName="modal-shop-finance-flow">
    <div :class="basic('content')">
      <a-row :class="basic('info')">
        <a-col :span="13" class="mgb-36">
          <st-info>
            <st-info-item label="被冲流水号">{{info.flow_id}}</st-info-item>
            <st-info-item label="操作人">{{info.operator_name}}</st-info-item>
            <st-info-item label="是否定金">{{info.is_advance_fee}}</st-info-item>
            <st-info-item label="收款时间">{{info.flow_time}}</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="11" class="mgb-36">
           <st-info>
            <st-info-item label="金额">{{info.amount}}</st-info-item>
            <st-info-item label="支付方式">{{info.pay_type}}</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="24" class="mgb-36">
          <st-info>
            <st-info-item  label="备注">{{info.remark || ''}}</st-info-item>
          </st-info>
        </a-col>
      </a-row>
      <st-form :form="form" labelWidth="72px">
        <div :class="basic('flow')">
          <st-form-item label="退款原因" class="mgb-18" required>
            <a-input
              placeholder="请输入冲销流水原因"
              v-decorator="['reason',{rules:[{validator:reason_validator}]}]"
            />
          </st-form-item>
          <st-form-item label="流水金额" required>
            <st-input-number
            :max="+info.pay_price"
            :float="true"
            placeholder="请输入新流水金额"
            v-decorator="['price',{rules:[{validator:price_validator}]}]">
              <template slot="addonAfter">元</template>
            </st-input-number>
          </st-form-item>
          <st-form-item label="支付方式" class="mgb-18" required>
            <a-radio-group v-model="payChannel">
              <a-radio
              v-for="(item,index) in Object.keys(finance.pay_channel.value)"
              :key="index"
              :value="+item">{{finance.pay_channel.value[item]}}</a-radio>
            </a-radio-group>
          </st-form-item>
          <st-form-item label="收款时间" class="mg-b0" required>
            <a-date-picker
              v-decorator="['flow_time',{rules:[{validator:flow_time_validator}]}]"
              format="YYYY-MM-DD HH:mm"
              placeholder="请选择收款时间"
              :showToday="false"
              showTime
            />
          </st-form-item>
        </div>
      </st-form>
    </div>
    <template slot="footer">
      <st-button @click="onSubmit" :loading="loading.orderFlow" type="primary"> 确认提交</st-button>
    </template>
  </st-modal>
</template>

<script>
import moment from 'moment'
import { FlowService } from './flow.service'
import { UserService } from '@/services/user.service'
export default {
  name: 'ModalShopFinanceFlow',
  bem: {
    basic: 'modal-shop-finance-flow'
  },
  serviceInject() {
    return {
      userService: UserService,
      flowService: FlowService
    }
  },
  rxState() {
    return {
      info: this.flowService.info$,
      finance: this.userService.finance$,
      loading: this.flowService.loading$
    }
  },
  props: ['id'],
  data() {
    return {
      show: false,
      description: '',
      payChannel: 2,
      form: this.$form.createForm(this)
    }
  },
  computed: {

  },
  created() {
    this.flowService.getDetail(this.id).subscribe()
  },
  methods: {
    moment,
    onSubmit() {
      this.form.validateFields((error, values) => {
        if (!error) {
          this.flowService.orderFlow({
            flow_id: this.info.flow_id,
            reason: values.reason,
            price: +values.price,
            pay_channel: +this.payChannel,
            flow_time: moment(values.flow_time).format('YYYY-MM-DD HH:mm')
          }).subscribe(res => {
            this.$emit('success')
            this.show = false
          })
        }
      })
    },
    reason_validator(rule, value, callback) {
      if (!value) {
        // eslint-disable-next-line
        callback('请输入冲销原因')
      } else {
        // eslint-disable-next-line
        callback()
      }
    },
    price_validator(rule, value, callback) {
      if (!value) {
        // eslint-disable-next-line
        callback('请输入新流水金额')
      } else {
        // eslint-disable-next-line
        callback()
      }
    },
    // start_time validatorFn
    flow_time_validator(rule, value, callback) {
      if (!value) {
        // eslint-disable-next-line
        callback('请选择开始售卖时间')
      } else {
        // eslint-disable-next-line
        callback()
      }
    }

  }
}
</script>
