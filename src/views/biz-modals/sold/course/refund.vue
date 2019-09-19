<template>
  <st-modal
    title="退款"
    v-model="show"
    wrapClassName="modal-sold-course-refund"
  >
    <div :class="refund('content')">
      <a-row :class="refund('info')">
        <a-col :span="13" class="mg-b36">
          <st-info>
            <st-info-item label="订单号">
              {{ packageInfo.order_id }}
            </st-info-item>
            <st-info-item class="mg-b0" label="下单时间">
              {{
                moment(packageInfo.created_time * 1000).format(
                  'YYYY-MM-DD HH:mm'
                )
              }}
            </st-info-item>
          </st-info>
        </a-col>
        <a-col :span="11" class="mg-b36">
          <st-info>
            <st-info-item label="下单人">
              {{ packageInfo.operator_name }}
            </st-info-item>
            <st-info-item class="mg-b0" label="销售">
              {{ packageInfo.sale_name }}
            </st-info-item>
          </st-info>
        </a-col>
        <a-col :span="13" class="mg-b36">
          <st-info>
            <st-info-item label="场馆">
              {{ packageInfo.shop_name }}
            </st-info-item>
            <st-info-item class="mg-b0" label="购买">
              {{ packageInfo.course_name }}
            </st-info-item>
          </st-info>
        </a-col>
        <a-col :span="11" class="mg-b36">
          <st-info>
            <st-info-item label="用户">
              {{ packageInfo.member_name }} {{ packageInfo.member_mobile }}
            </st-info-item>
            <st-info-item class="mg-b0" label="赠送">无</st-info-item>
          </st-info>
        </a-col>

        <a-col :span="13" class="mg-b24">
          <st-info>
            <st-info-item label="订单总额">
              {{ packageInfo.total_price }}元
            </st-info-item>
            <st-info-item class="mg-b0" label="结转金额">无</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="11" class="mg-b24">
          <st-info>
            <st-info-item label="应收金额">
              {{ packageInfo.receivable_price }}元
            </st-info-item>
            <st-info-item class="mg-b0" label="实收金额">
              {{ packageInfo.pay_price }}元
            </st-info-item>
          </st-info>
        </a-col>
        <a-col :span="24" class="mg-b36">
          <st-info>
            <st-info-item class="mg-b0" label="备注">
              {{ packageInfo.description || '无' }}
            </st-info-item>
          </st-info>
        </a-col>
      </a-row>
      <st-form :form="form" labelWidth="88px">
        <div :class="refund('refund')">
          <st-form-item class="mg-b16" required>
            <template slot="label">
              退款原因
              <st-help-tooltip id="TSMC005" />
            </template>
            <a-radio-group v-model="refundReason">
              <a-radio
                v-for="(item, index) in refundReasons"
                :key="index"
                :value="+item.value"
              >
                {{ item.label }}
              </a-radio>
            </a-radio-group>
          </st-form-item>
          <st-form-item label="退款金额" required>
            <st-input-number
              :max="99999.9"
              :float="true"
              placeholder="请输入本次退款的实际金额"
              v-decorator="decorators.refundPrice"
            >
              <template slot="addonAfter">
                元
              </template>
            </st-input-number>
          </st-form-item>
          <st-form-item label="退款方式" class="mg-b16" required>
            <a-radio-group v-model="frozenPayType">
              <a-radio
                v-for="(item, index) in refundChannelSaas"
                :key="index"
                :value="+item.value"
              >
                {{ item.label }}
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
import moment from 'moment'
import { RefundService } from './refund.service'
import { ruleOptions } from './refund.config'
export default {
  name: 'ModalSoldCourseRefund',
  bem: {
    refund: 'modal-sold-course-refund'
  },
  serviceInject() {
    return {
      refundService: RefundService
    }
  },
  rxState() {
    return {
      packageInfo: this.refundService.packageInfo$,
      refundChannelSaas: this.refundService.refundChannelSaas$,
      refundReasons: this.refundService.refundReasons$,
      loading: this.refundService.loading$
    }
  },
  props: ['id', 'type'],
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      show: false,
      refundReason: this.refundReasons[0].value,
      frozenPayType: this.refundChannelSaas[0].value,
      description: ''
    }
  },
  created() {
    this.refundService.getPackageInfo(this.id, this.type).subscribe()
  },
  methods: {
    moment,
    onSubmit() {
      this.form.validate().then(values => {
        this.refundService
          .refund(
            {
              refund_reason: +this.refundReason,
              refund_price: +values.refundPrice,
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
