<template>
  <st-modal
    title="退款"
    size="small"
    v-model="show"
    wrapClassName="modal-shop-finance-refund"
  >
    <div :class="refund('content')">
      <a-row :class="refund('info')">
        <a-col :span="13" class="mgb-36">
          <st-info>
            <st-info-item label="订单号">{{ info.order_id }}</st-info-item>
            <st-info-item class="mg-b0" label="下单时间">
              {{ info.created_time }}
            </st-info-item>
          </st-info>
        </a-col>
        <a-col :span="11" class="mgb-36">
          <st-info>
            <st-info-item label="下单人">{{ info.operator_name }}</st-info-item>
            <st-info-item class="mg-b0" label="销售">
              {{ info.staff_name }}
            </st-info-item>
          </st-info>
        </a-col>
        <a-col :span="13" class="mgb-36">
          <st-info>
            <st-info-item label="订单类型" v-if="info.order_type">
              {{ info.order_type | enumFilter('sold.order_type') }}
            </st-info-item>
            <st-info-item class="mg-b0" label="订单来源">
              {{ info.order_source | enumFilter('finance.order_source') }}
              {{ info.mobile }}
            </st-info-item>
          </st-info>
        </a-col>
        <a-col :span="11" class="mgb-36">
          <st-info>
            <st-info-item label="场馆">{{ info.shop_name }}</st-info-item>
            <st-info-item class="mg-b0" label="用户">
              {{ info.member_name }}
            </st-info-item>
          </st-info>
        </a-col>
        <a-col :span="13" class="mgb-36">
          <st-info>
            <st-info-item label="购买">{{ info.product_name }}</st-info-item>
            <st-info-item label="订单总额">
              {{ info.total_price }}元
            </st-info-item>
            <st-info-item label="实收金额">
              {{ info.actual_price }}元
            </st-info-item>
          </st-info>
        </a-col>

        <a-col :span="11" class="mgb-36">
          <st-info>
            <st-info-item label="赠送">{{ info.gift_amount }}</st-info-item>
            <st-info-item label="应收金额">{{ info.pay_price }}元</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="24" class="mgb-36">
          <st-info>
            <st-info-item label="备注">
              {{ info.description || '' }}
            </st-info-item>
          </st-info>
        </a-col>
      </a-row>
      <st-form :form="form">
        <div :class="refund('refund')">
          <st-form-item class="mgb-18" required>
            <template slot="label">
              退款原因
              <st-help-tooltip id="TSMC005" />
            </template>
            <a-radio-group v-model="refundReason">
              <a-radio
                v-for="(item, index) in Object.keys(
                  finance.refund_reason.value
                )"
                :key="index"
                :value="+item"
              >
                {{ finance.refund_reason.value[item] }}
              </a-radio>
            </a-radio-group>
          </st-form-item>
          <st-form-item label="退款金额" required>
            <st-input-number
              :max="+info.actual_price"
              :float="true"
              placeholder="请输入本次退款的实际金额"
              v-decorator="[
                'refundPrice',
                { rules: [{ validator: refund_price_validator }] }
              ]"
            >
              <template slot="addonAfter">
                元
              </template>
            </st-input-number>
          </st-form-item>
          <st-form-item label="退款方式" class="mgb-18" required>
            <a-radio-group v-model="frozenPayType">
              <a-radio
                v-for="(item, index) in Object.keys(
                  finance.refund_channel.value
                )"
                :key="index"
                :value="+item"
              >
                {{ finance.refund_channel.value[item] }}
              </a-radio>
            </a-radio-group>
          </st-form-item>
          <st-form-item label="备注" class="mg-b0">
            <a-textarea
              v-model="description"
              :autosize="{ minRows: 4, maxRows: 6 }"
            />
          </st-form-item>
        </div>
      </st-form>
    </div>
    <template slot="footer">
      <span class="info">
        提交后无法修改&nbsp;
        <st-icon type="help" />
      </span>
      <st-button
        @click="onSubmit"
        :loading="loading.orderRefund"
        type="primary"
      >
        确认提交
      </st-button>
    </template>
  </st-modal>
</template>

<script>
import moment from 'moment'
import { RefundService } from './refund.service'
import { UserService } from '@/services/user.service'
export default {
  name: 'ModalShopFinanceOrderRefund',
  bem: {
    refund: 'modal-shop-finance-order-refund'
  },
  serviceInject() {
    return {
      userService: UserService,
      refundService: RefundService
    }
  },
  rxState() {
    return {
      info: this.refundService.info$,
      finance: this.userService.finance$,
      loading: this.refundService.loading$
    }
  },
  props: ['id'],
  data() {
    return {
      show: false,
      description: '',
      frozenPayType: 2,
      refundReason: 1,
      form: this.$form.createForm(this)
    }
  },
  computed: {},
  created() {
    this.refundService.getDetail(this.id).subscribe()
  },
  methods: {
    moment,
    onSubmit() {
      this.form.validateFields((error, values) => {
        if (!error) {
          this.refundService
            .orderRefund(
              {
                order_sub_id: this.info.order_sub_id,
                refund_money: +values.refundPrice,
                reason: +this.refundReason,
                pay_channel: +this.frozenPayType,
                description: this.description
              },
              this.id,
              this.type
            )
            .subscribe(res => {
              this.$emit('success')
              this.show = false
            })
        }
      })
    },
    refund_price_validator(rule, value, callback) {
      if (!value) {
        // eslint-disable-next-line
        callback('请输入退款金额')
      } else if (
        value &&
        parseInt(value, 10) > parseInt(this.info.actual_price, 10)
      ) {
        // eslint-disable-next-line
        callback('退款金额不能大于实收金额')
      } else {
        // eslint-disable-next-line
        callback()
      }
    }
  }
}
</script>
