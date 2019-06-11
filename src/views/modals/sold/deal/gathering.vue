<template>
  <st-modal
  title="订单收款"
  size="small"
  v-model="show"
  wrapClassName="modal-sold-deal-gathering"
  @ok="onOk">
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
        <!-- <a-col :span="13" class="mgb-36">
          <st-info>
            <st-info-item label="场馆">{{info.shop_name}}</st-info-item>
            <st-info-item class="mg-b0" label="购买">{{info.shop_name}}/{{info.rule_name}}</st-info-item>
          </st-info>
        </a-col> -->
        <!-- <a-col :span="11" class="mgb-36">
           <st-info>
            <st-info-item label="用户">{{info.member_name}}&nbsp;{{info.member_mobile}}</st-info-item>
            <st-info-item class="mg-b0" label="赠送">{{info.gift_amount}}</st-info-item>
          </st-info>
        </a-col> -->
        <!-- <a-col :span="24" class="mgb-36">
          <st-info>
            <st-info-item class="mg-b0" label="备注">{{info.description}}</st-info-item>
          </st-info>
        </a-col> -->
        <a-col :span="13" class="mgb-24">
          <st-info>
            <st-info-item label="订单总额">{{info.order_amount}}</st-info-item>
            <st-info-item class="mg-b0" label="优惠金额">{{info.discount_amount}}</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="11" class="mgb-24">
           <st-info>
            <st-info-item label="减免金额">{{info.discount_amount}}</st-info-item>
            <st-info-item class="mg-b0" label="应付金额">{{info.actual_amount}}</st-info-item>
          </st-info>
        </a-col>
      </a-row>
      <st-form :form="form" labelWidth="72px">
        <div :class="gathering('gathering')">
          <st-form-item labelWidth="120px" label="已收金额/未收金额" class="mgb-18">
            <span class="total">{{info.payed_amount}}/{{info.remain_amount}}</span>
          </st-form-item>
          <st-form-item class="mgb-18" label="支付金额" required>
            <st-input-number :float="true" v-decorator="[
              'price',
              {rules: [{ required: true, message: '请输入支付金额!' }]}
            ]">
              <template slot="addonAfter">元</template>
            </st-input-number>
          </st-form-item>
          <st-form-item label="支付方式" class="mgb-18" required>
            <a-radio-group @change="selectPay"
             v-decorator="[
              'payment_type',
              {rules: [{ required: true, message: '请选择支付方式!' }]}
            ]">
              <a-radio :value="1">线下支付宝</a-radio>
              <a-radio :value="2">线下微信</a-radio>
              <a-radio :value="3">现金</a-radio>
              <a-radio :value="4">银行转账</a-radio>
              <a-radio :value="5">储值卡</a-radio>
            </a-radio-group>
          </st-form-item>
          <st-form-item label="储值卡" class="mgb-18" v-if="selectPayValues===5" required>
            <a-select placeholder="请选择储值卡"  v-decorator="[
              'deposit_id',
              {rules: [{ required: true, message: '请选择储值卡!' }]}
            ]">
              <a-select-option value="1">储值卡1 余额998元</a-select-option>
              <a-select-option value="2">储值卡2 余额98元</a-select-option>
              <a-select-option value="3">储值卡3 余额8元</a-select-option>
            </a-select>
          </st-form-item>
        </div>
      </st-form>
    </div>
    <template slot="footer">
      <st-button type="primary" @click="onSubmit" :loading="loading.payOrderTransaction">确认收款</st-button>
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
      loading: this.gatheringService.loading$
    }
  },
  data() {
    return {
      show: false,
      selectPayValues: 0,
      form: this.$form.createForm(this)

    }
  },
  props: ['order_id', 'type'],
  created() {
    this.gatheringService.getPaymentInfo(this.order_id, this.type).subscribe()
  },
  methods: {
    onOk() {
      this.$emit('ok')
      this.show = false
    },
    selectPay(checkedValues) {
      this.selectPayValues = checkedValues.target.value
    },
    onSubmit(e) {
      e.preventDefault()
      this.form.validateFields().then((values) => {
        values.order_id = this.order_id
        values.deposit_card_id = 1
        this.gatheringService.payTransaction(values).subscribe(result => {
          this.$emit('ok')
          this.show = false
          // this.$modalRouter.push({
          //   name: 'sold-deal-gathering-tip'
          // })
        })
      })
    }
  }
}
</script>
