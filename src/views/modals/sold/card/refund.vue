<template>
  <st-modal title="退款" size="small" v-model="show" wrapClassName="modal-sold-card-refund">
    <div :class="refund('content')">
      <a-row :class="refund('info')">
        <a-col :span="13" class="mgb-36">
          <st-info>
            <st-info-item label="订单号">1234567890123456</st-info-item>
            <st-info-item class="mg-b0" label="下单时间">2020/02/21 14:20:59</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="11" class="mgb-36">
          <st-info>
            <st-info-item label="下单人">王守仁</st-info-item>
            <st-info-item class="mg-b0" label="销售">郑和</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="13" class="mgb-36">
          <st-info>
            <st-info-item label="场馆">ABC场馆</st-info-item>
            <st-info-item class="mg-b0" label="购买">会员卡名称/规格名称</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="11" class="mgb-36">
          <st-info>
            <st-info-item label="用户">Elaine 18516028817</st-info-item>
            <st-info-item class="mg-b0" label="赠送">182天</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="24" class="mgb-36">
          <st-info>
            <st-info-item class="mg-b0" label="备注">备注备注备注备注备注备注备注备注备注备注</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="13" class="mgb-24">
          <st-info>
            <st-info-item label="订单总额">120元</st-info-item>
            <st-info-item class="mg-b0" label="结转金额">10元</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="11" class="mgb-24">
          <st-info>
            <st-info-item label="应收金额">99元</st-info-item>
            <st-info-item class="mg-b0" label="实收金额">99元</st-info-item>
          </st-info>
        </a-col>
      </a-row>
      <st-form labelWidth="72px">
        <div :class="refund('refund')">
          <st-form-item label="退款原因" class="mgb-18" required>
            <a-radio-group>
              <a-radio :value="1">仅退款（此商品仍然有效）</a-radio>
              <a-radio :value="2">客户要求退款退货（此商品变为无效）</a-radio>
              <a-radio :value="3">订单信息录入错误，退款重办</a-radio>
            </a-radio-group>
          </st-form-item>
          <st-form-item label="退款金额" class="mgb-18" required>
            <st-input-number placeholder="请输入本次收款的实际金额"></st-input-number>
          </st-form-item>
          <st-form-item label="退款方式" class="mgb-18" required>
            <a-radio-group>
              <a-radio :value="1">线下支付宝</a-radio>
              <a-radio :value="2">线下微信</a-radio>
              <a-radio :value="3">现金</a-radio>
              <a-radio :value="4">银行转账</a-radio>
              <a-radio :value="5">其它</a-radio>
            </a-radio-group>
          </st-form-item>
          <st-form-item label="备注" class="mg-b0">
            <a-textarea :autosize="{ minRows: 4, maxRows: 6 }"/>
          </st-form-item>
        </div>
      </st-form>
    </div>
    <template slot="footer">
      <span class="info">
        提交后无法修改&nbsp;
        <st-icon type="help"/>
      </span>
      <st-button key="submit" type="primary">确认提交</st-button>
    </template>
  </st-modal>
</template>

<script>
export default {
  name: 'ModalSoldCardRefund',
  bem: {
    refund: 'modal-sold-card-refund'
  },
  props: {
    record: {
      type: Object
    }
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    onOk() {
      this.$emit('ok')
      this.show = false
    }
  }
}
</script>
