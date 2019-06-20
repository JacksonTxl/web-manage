<template>
  <st-modal
  title="取消"
  size="small"
  v-model="show"
  wrapClassName="modal-shop-finance-cancel">
    <div :class="basic('content')">
      <a-row :class="basic('info')">
        <a-col :span="13" class="mgb-36">
          <st-info>
            <st-info-item label="订单号">{{info.order_id}}</st-info-item>
            <st-info-item class="mg-b0" label="下单时间">{{info.created_time}}</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="11" class="mgb-36">
           <st-info>
            <st-info-item label="下单人">{{info.operator_name}}</st-info-item>
            <st-info-item class="mg-b0" label="销售">{{info.staff_name}}</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="13" class="mgb-36">
          <st-info>
            <st-info-item label="订单类型" v-if="info.order_type">{{info.order_type | enumFilter('finance.order_type')}}</st-info-item>
            <st-info-item class="mg-b0" label="订单来源">{{info.order_source | enumFilter('finance.order_source')}} {{info.mobile}}</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="11" class="mgb-36">
           <st-info>
            <st-info-item label="场馆">{{info.shop_name}}</st-info-item>
            <st-info-item class="mg-b0" label="用户">{{info.member_name}}</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="13" class="mgb-36">
           <st-info>
            <st-info-item label="购买">{{info.product_name}}</st-info-item>
            <st-info-item label="订单总额">{{info.total_price}}元</st-info-item>
            <st-info-item  label="实收金额">{{info.pay_price}}元</st-info-item>
          </st-info>
        </a-col>

        <a-col :span="11" class="mgb-36">
          <st-info>
            <st-info-item  label="赠送">{{info.gift_amount}}</st-info-item>
            <st-info-item label="应收金额">{{info.should_price}}元</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="24" class="mgb-36">
          <st-info>
            <st-info-item  label="备注">{{info.description || ''}}</st-info-item>
          </st-info>
        </a-col>
      </a-row>
    </div>
    <template slot="footer">
      <st-button @click="onSubmit" :loading="loading.orderCancel" type="primary"> 确认取消</st-button>
    </template>
  </st-modal>
</template>

<script>
import moment from 'moment'
import { CancelService } from './cancel.service'
import { UserService } from '@/services/user.service'
export default {
  name: 'ModalShopFinanceOrderCancel',
  bem: {
    basic: 'modal-shop-finance-order-cancel'
  },
  serviceInject() {
    return {
      userService: UserService,
      cancelService: CancelService
    }
  },
  rxState() {
    return {
      info: this.cancelService.info$,
      loading: this.cancelService.loading$
    }
  },
  props: ['id'],
  data() {
    return {
      show: false,
      form: this.$form.createForm(this)
    }
  },
  computed: {

  },
  created() {
    this.cancelService.getDetail(this.id).subscribe()
  },
  methods: {
    moment,
    onSubmit() {
      this.form.validateFields((error, values) => {
        if (!error) {
          this.cancelService.orderCancel(this.info.order_id).subscribe(res => {
            this.$emit('success')
            this.show = false
          })
        }
      })
    }
  }
}
</script>
