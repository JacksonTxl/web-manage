<template>
  <st-modal
  title="退款"
  size="small"
  v-model="show"
  wrapClassName="modal-sold-card-refund">
    <div :class="refund('content')">
      <a-row :class="refund('info')" v-if="isDeposit">
        <a-col :span="13" class="mgb-36">
          <st-info>
            <st-info-item label="订单号">{{refundInfo.order_id}}</st-info-item>
            <st-info-item class="mg-b0" label="下单时间">{{refundInfo.created_time}}</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="11" class="mgb-36">
           <st-info>
            <st-info-item label="下单人">{{refundInfo.operator_name}}</st-info-item>
            <st-info-item class="mg-b0" label="销售">{{refundInfo.staff_name}}</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="13" class="mgb-36">
          <st-info>
            <st-info-item label="场馆">{{refundInfo.shop_name}}</st-info-item>
            <st-info-item class="mg-b0" label="用户">{{refundInfo.member_name}} {{refundInfo.mobile}}</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="11" class="mgb-36">
           <st-info>
            <st-info-item label="购买">{{refundInfo.card_name}}</st-info-item>
            <st-info-item class="mg-b0" label="赠送">{{isDeposit?'无':'refundInfo.aaaa'}}</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="24" class="mgb-36">
          <st-info>
            <st-info-item class="mg-b0" label="备注">{{refundInfo.description || '无'}}</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="13" class="mgb-24">
          <st-info>
            <st-info-item label="订单总额">{{refundInfo.total_price}}元</st-info-item>
            <st-info-item class="mg-b0" label="订单状态" v-if="refundInfo.order_status">{{refundInfo.order_status | enumFilter('sold.order_status')}}</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="11" class="mgb-24">
           <st-info>
            <st-info-item label="应收金额">{{refundInfo.should_price}}元</st-info-item>
            <st-info-item class="mg-b0" label="实收金额">{{refundInfo.pay_price}}元</st-info-item>
          </st-info>
        </a-col>
      </a-row>
      <a-row :class="refund('info')" v-if="isMember">
        <a-col :span="13" class="mgb-36">
          <st-info>
            <st-info-item label="订单号">{{refundInfo.order_id}}</st-info-item>
            <st-info-item class="mg-b0" label="下单时间">{{refundInfo.created_time}}</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="11" class="mgb-36">
           <st-info>
            <st-info-item label="下单人">{{refundInfo.operator_name}}</st-info-item>
            <st-info-item class="mg-b0" label="销售">{{refundInfo.staff_name}}</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="13" class="mgb-36">
          <st-info>
            <st-info-item label="场馆">{{refundInfo.shop_name}}</st-info-item>
            <st-info-item class="mg-b0" label="用户">{{refundInfo.member_name}} {{refundInfo.mobile}}</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="11" class="mgb-36">
           <st-info>
            <st-info-item label="购买">{{refundInfo.card_name}}</st-info-item>
            <st-info-item class="mg-b0" label="赠送">{{refundInfo.gift_amount}}</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="24" class="mgb-36">
          <st-info>
            <st-info-item class="mg-b0" label="备注">{{refundInfo.description || '无'}}</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="13" class="mgb-24">
          <st-info>
            <st-info-item label="订单总额">{{refundInfo.total_price}}元</st-info-item>
            <st-info-item class="mg-b0" label="订单类型">{{refundInfo.order_type}}</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="11" class="mgb-24">
           <st-info>
            <st-info-item label="应收金额">{{refundInfo.should_price}}元</st-info-item>
            <st-info-item class="mg-b0" label="实收金额">{{refundInfo.pay_price}}元</st-info-item>
          </st-info>
        </a-col>
      </a-row>
      <st-form :form="form" labelWidth="72px">
        <div :class="refund('refund')">
          <st-form-item label="退款原因" class="mgb-18" required>
            <a-radio-group v-model="refundReason">
              <a-radio
              v-for="(item,index) in Object.keys(sold.refund_reason.value)"
              :key="index"
              :value="+item">{{sold.refund_reason.value[item]}}</a-radio>
            </a-radio-group>
          </st-form-item>
          <st-form-item label="退款金额" required>
            <st-input-number
            :max="+refundInfo.pay_price"
            :float="true"
            placeholder="请输入本次退款的实际金额"
            v-decorator="['refundPrice',{rules:[{validator:refund_price_validator}]}]">
              <template slot="addonAfter">元</template>
            </st-input-number>
          </st-form-item>
          <st-form-item label="退款方式" class="mgb-18" required>
            <a-radio-group v-model="frozenPayType">
              <a-radio
              v-for="(item,index) in Object.keys(sold.refund_channel_saas.value)"
              :key="index"
              :value="+item">{{sold.refund_channel_saas.value[item]}}</a-radio>
            </a-radio-group>
          </st-form-item>
          <st-form-item label="备注" class="mg-b0">
            <a-textarea v-model="description" :autosize="{ minRows: 4, maxRows: 6 }" />
          </st-form-item>
        </div>
      </st-form>
    </div>
    <template slot="footer">
      <span class="info">提交后无法修改&nbsp;<st-icon type="help" /></span>
      <st-button @click="onSubmit" :loading="loading.refund" type="primary"> 确认提交</st-button>
    </template>
  </st-modal>
</template>

<script>
import moment from 'moment'
import { RefundService } from './refund.service'
import { UserService } from '@/services/user.service'
export default {
  name: 'ModalSoldCardRefund',
  bem: {
    refund: 'modal-sold-card-refund'
  },
  serviceInject() {
    return {
      userService: UserService,
      refundService: RefundService
    }
  },
  rxState() {
    return {
      refundInfo: this.refundService.refundInfo$,
      sold: this.userService.soldEnums$,
      loading: this.refundService.loading$
    }
  },
  props: ['id', 'type'],
  data() {
    return {
      show: false,
      refundReason: 1,
      frozenPayType: 2,
      description: '',
      form: this.$form.createForm(this)
    }
  },
  computed: {
    isDeposit() {
      return this.type === 'deposit'
    },
    isMember() {
      return this.type === 'member'
    }
  },
  created() {
    this.refundService.getRefundInfo(this.id, this.type).subscribe()
  },
  methods: {
    moment,
    onSubmit() {
      this.form.validateFields((error, values) => {
        if (!error) {
          this.refundService.refund({
            refund_price: +values.refundPrice,
            refund_reason: +this.refundReason,
            refund_channel: +this.frozenPayType,
            description: this.description
          }, this.id, this.type).subscribe(res => {
            this.$emit('success')
            this.show = false
          })
        }
      })
    },
    refund_price_validator(rule, value, callback) {
      if (!value || +value === 0) {
        // eslint-disable-next-line
        callback('请输入退款金额')
      } else {
        // eslint-disable-next-line
        callback()
      }
    }
  }
}
</script>
