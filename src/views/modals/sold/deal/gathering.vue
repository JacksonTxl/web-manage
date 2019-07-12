<template>
  <st-modal
  title="订单收款"
  size="small"
  v-model="show"
  wrapClassName="modal-sold-deal-gathering"
  @cancel="onCancel"
  >
    <div :class="gathering('content')">
      <a-row :class="gathering('info')">
        <a-col :span="13" class="mgb-36">
          <st-info>
            <st-info-item label="订单号">{{info.order_id}}</st-info-item>
            <st-info-item class="mg-b0" label="下单时间">{{info.order_time}}</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="11" class="mgb-36">
           <st-info>
            <st-info-item label="下单人">{{info.operate_name}}</st-info-item>
            <st-info-item class="mg-b0" label="销售">{{info.sale_name}}</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="13" class="mgb-36">
          <st-info>
            <st-info-item label="场馆">{{info.shop_name}}</st-info-item>
            <st-info-item label="购买">{{info.shop_name}}/{{info.rule_name}}</st-info-item>
            <st-info-item class="mg-b0" label="定金抵扣">{{info.advance_amount}}</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="11" class="mgb-36">
           <st-info>
            <st-info-item label="用户">{{info.member_name}}&nbsp;{{info.member_mobile}}</st-info-item>
            <st-info-item class="mg-b0" label="赠送">{{info.gift_amount}}</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="13" class="mgb-24">
          <st-info>
            <st-info-item label="订单总额">{{info.order_amount}}</st-info-item>
            <st-info-item class="mg-b0" label="优惠金额">{{info.discount_amount}}</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="11" class="mgb-24">
           <st-info>
            <st-info-item label="减免金额">{{info.reduce_amount}}</st-info-item>
            <st-info-item class="mg-b0" label="应付金额">{{info.actual_amount}}</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="24" class="mgb-36">
          <st-info>
            <st-info-item class="mg-b0" label="备注">{{info.description}}</st-info-item>
          </st-info>
        </a-col>
      </a-row>
      <st-form :form="form" labelWidth="72px">
        <div :class="gathering('gathering')">
          <st-form-item labelWidth="120px" label="已收金额/未收金额" class="mgb-18">
            <span class="total">{{info.payed_amount}}/{{info.remain_amount}}</span>
          </st-form-item>
          <st-form-item class="mgb-18" label="支付金额" required>
            <st-input-number :float="true" :max="info.remain_amount | dealMaxNumber" v-decorator="[
              'price',
              {rules: [{ required: true, message: '请输入支付金额!' }]}
            ]">
              <template slot="addonAfter">元</template>
            </st-input-number>
          </st-form-item>
          <st-form-item label="支付方式" class="mgb-18" required>
            <a-radio-group @change="selectPay"
             v-decorator="[
              'payment_method',
              {rules: [{ required: true, message: '请选择支付方式!' }]}
            ]">
              <a-radio :value="item" :key="index" v-for="(item, index) in paymentMethodList">{{item.payment_type_name}}</a-radio>
            </a-radio-group>
          </st-form-item>
          <st-form-item label="储值卡" class="mgb-18" v-if="selectPayValues.payment_type === 0" required>
            <a-select placeholder="请选择储值卡"  v-decorator="[
              'deposit_card_id',
              {rules: [{ required: true, message: '请选择储值卡!' }]}
            ]">
              <a-select-option :value="item.id" :key="index" v-for="(item, index) in selectPayValues.deposit">{{item.card_name}}--{{item.now_amount}}元</a-select-option>
            </a-select>
          </st-form-item>
        </div>
      </st-form>
    </div>
    <template slot="footer">
      <st-button type="primary" @click="onSubmit" :loading="loading.payTransaction">确认收款</st-button>
    </template>
  </st-modal>
</template>

<script>
import { GatheringService } from './gathering.service'
export default {
  name: 'ModalSoldDealGathering',
  bem: {
    gathering: 'modal-sold-deal-gathering'
  },
  serviceInject() {
    return {
      gatheringService: GatheringService
    }
  },
  rxState() {
    return {
      info: this.gatheringService.info$,
      loading: this.gatheringService.loading$,
      paymentMethodList: this.gatheringService.paymentMethodList$
    }
  },
  data() {
    return {
      show: false,
      selectPayValues: 0,
      form: this.$form.createForm(this)

    }
  },
  // 订单id，签单类型
  props: ['order_id', 'type'],
  created() {
    this.gatheringService.getPaymentInfo(this.order_id, this.type).subscribe(result => {
      this.gatheringService.getPaymentMethodList(this.order_id).subscribe()
    })
  },
  filters: {
    dealMaxNumber: (value) => {
      if (!value) return
      return Number(value.substr(0, value.length - 1))
    }
  },
  methods: {
    // 关闭modal
    onCancel() {
      this.show = false
      this.$emit('cancel')
    },
    selectPay(checkedValues) {
      this.selectPayValues = checkedValues.target.value
    },
    onSubmit(e) {
      e.preventDefault()
      this.form.validateFields().then((values) => {
        values.order_id = this.order_id
        values.payment_type = values.payment_method.payment_type
        delete values.payment_method
        this.gatheringService.payTransaction(values).subscribe(result => {
          this.$emit('success', {
            type: 'pay'
          })
          this.show = false
        })
      })
    }
  }
}
</script>
