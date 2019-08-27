<template>
  <st-modal
    title="流水冲销"
    size="small"
    v-model="show"
    wrapClassName="modal-shop-finance-flow"
  >
    <div :class="basic('content')">
      <a-row :class="basic('info')">
        <a-col :span="13" class="mgb-36">
          <st-info>
            <st-info-item label="被冲流水号">{{ info.flow_id }}</st-info-item>
            <st-info-item label="操作人">{{ info.operator_name }}</st-info-item>
            <st-info-item label="是否定金">
              {{ info.is_advance_fee }}
            </st-info-item>
            <st-info-item label="收款时间">{{ info.flow_time }}</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="11" class="mgb-36">
          <st-info>
            <st-info-item label="金额">{{ info.amount }}</st-info-item>
            <st-info-item label="支付方式">{{ info.pay_type }}</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="24" class="mgb-36">
          <st-info>
            <st-info-item label="备注">{{ info.remark || '' }}</st-info-item>
          </st-info>
        </a-col>
      </a-row>
      <st-form :form="form" labelWidth="72px">
        <div :class="basic('flow')">
          <st-form-item label="退款原因" class="mgb-18" required>
            <a-input
              placeholder="请输入冲销流水原因"
              v-decorator="decorators.reason"
            />
          </st-form-item>
          <st-form-item label="流水金额" required>
            <st-input-number
              :max="+info.pay_price"
              :float="true"
              placeholder="请输入新流水金额"
              v-decorator="decorators.price"
            >
              <template slot="addonAfter">
                元
              </template>
            </st-input-number>
          </st-form-item>
          <st-form-item label="支付方式" class="mgb-18" required>
            <a-radio-group v-model="payChannel">
              <a-radio
                v-for="(item, index) in paymentMethodList"
                :key="index"
                :value="+item.payment_type"
              >
                {{ item.payment_type_name }}
              </a-radio>
            </a-radio-group>
          </st-form-item>
          <st-form-item label="收款时间" class="mg-b0" required>
            <a-date-picker
              v-decorator="decorators.flow_time"
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
      <st-button @click="onSubmit" :loading="loading.orderFlow" type="primary">
        确认提交
      </st-button>
    </template>
  </st-modal>
</template>

<script>
import moment from 'moment'
import { FlowService } from './flow.service'
import { ruleOptions } from './flow.config'
export default {
  name: 'ModalShopFinanceFlow',
  bem: {
    basic: 'modal-shop-finance-flow'
  },
  serviceInject() {
    return {
      flowService: FlowService
    }
  },
  rxState() {
    return {
      info: this.flowService.info$,
      paymentMethodList: this.flowService.paymentMethodList$,
      loading: this.flowService.loading$
    }
  },
  props: ['id', 'order_id'],
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      show: false,
      description: '',
      payChannel: 2
    }
  },
  computed: {},
  created() {
    this.flowService.init(this.id, this.order_id).subscribe()
  },
  methods: {
    moment,
    onSubmit() {
      this.form.validate().then(values => {
        this.flowService
          .orderFlow({
            flow_id: this.info.flow_id,
            reason: values.reason,
            price: +values.price,
            pay_channel: +this.payChannel,
            flow_time: moment(values.flow_time).format('YYYY-MM-DD HH:mm')
          })
          .subscribe(res => {
            this.$emit('success')
            this.show = false
          })
      })
    }
  }
}
</script>
