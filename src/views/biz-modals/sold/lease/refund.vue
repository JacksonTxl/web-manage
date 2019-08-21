<template>
  <st-modal
    title="退款"
    size="small"
    v-model="show"
    wrapClassName="modal-sold-lease-refund"
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
              {{ info.order_source }} {{ info.mobile }}
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
            <st-info-item label="实收金额">{{ info.pay_price }}元</st-info-item>
          </st-info>
        </a-col>

        <a-col :span="11" class="mgb-36">
          <st-info>
            <st-info-item label="赠送">{{ info.gift_amount }}</st-info-item>
            <st-info-item label="应收金额">
              {{ info.should_price }}元
            </st-info-item>
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
      <st-form :form="form" labelWidth="88px">
        <div :class="refund('refund')">
          <st-form-item class="mgb-18" required>
            <template slot="label">
              退款原因
              <st-help-tooltip id="TSMC005" />
            </template>
            <a-radio-group v-model="refundReason">
              <a-radio
                v-for="(item, index) in Object.keys(sold.refund_reason.value)"
                :key="index"
                :value="+item"
              >
                {{ sold.refund_reason.value[item] }}
              </a-radio>
            </a-radio-group>
          </st-form-item>
          <st-form-item label="退款金额" required>
            <st-input-number
              :max="+info.pay_price"
              :float="true"
              placeholder="请输入本次退款的实际金额"
              v-decorator="decorators.refundPrice"
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
                  sold.refund_channel_saas.value
                )"
                :key="index"
                :value="+item"
              >
                {{ sold.refund_channel_saas.value[item] }}
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
      <st-button @click="onSubmit" :loading="loading.refund" type="primary">
        确认提交
      </st-button>
    </template>
  </st-modal>
</template>

<script>
import { RefundService } from './refund.service'
import { UserService } from '@/services/user.service'
import { ruleOptions } from './refund.config'
export default {
  name: 'ModalSoldLeaseRefund',
  bem: {
    refund: 'modal-sold-lease-refund'
  },
  serviceProviders() {
    return [RefundService]
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
      sold: this.userService.soldEnums$,
      loading: this.refundService.loading$
    }
  },
  props: ['id'],
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      show: false,
      description: '',
      frozenPayType: 2,
      refundReason: 1
    }
  },
  computed: {},
  created() {
    this.refundService.getDetail(this.id).subscribe()
  },
  methods: {
    onSubmit() {
      this.form.validate((error, values) => {
        if (!error) {
          this.refundService
            .refund(
              {
                sold_id: this.id,
                sub_order_id: this.info.sub_order_id,
                product_type: 10,
                refund_price: +values.refundPrice || 0,
                refund_reason: +this.refundReason,
                refund_channel: +this.frozenPayType,
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
    }
  }
}
</script>
