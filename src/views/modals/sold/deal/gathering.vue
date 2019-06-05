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
            <st-info-item label="订单号">1234567890123456</st-info-item>
            <st-info-item class="mg-b0" label="下单时间">2020/02/21 14:20</st-info-item>
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
            <st-info-item class="mg-b0" label="优惠金额">10元</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="11" class="mgb-24">
           <st-info>
            <st-info-item label="减免金额">99元</st-info-item>
            <st-info-item class="mg-b0" label="应付金额">99元</st-info-item>
          </st-info>
        </a-col>
      </a-row>
      <st-form labelWidth="72px">
        <div :class="gathering('gathering')">
          <st-form-item labelWidth="120px" label="已收金额/未收金额" class="mgb-18">
            <span class="total">0元/120元</span>
          </st-form-item>
          <st-form-item class="mgb-18" label="支付金额" required>
            <st-input-number :float="true">
              <template slot="addonAfter">元</template>
            </st-input-number>
          </st-form-item>
          <st-form-item label="支付方式" class="mgb-18" required>
            <a-radio-group @change="selectPay">
              <a-radio :value="1">线下支付宝</a-radio>
              <a-radio :value="2">线下微信</a-radio>
              <a-radio :value="3">现金</a-radio>
              <a-radio :value="4">银行转账</a-radio>
              <a-radio :value="5">储值卡</a-radio>
            </a-radio-group>
          </st-form-item>
          <st-form-item label="储值卡" class="mgb-18" v-if="selectPayValues===5" required>
            <a-select placeholder="请选择储值卡">
                  <a-select-option value="1">储值卡1 余额998元</a-select-option>
                  <a-select-option value="2">储值卡2 余额98元</a-select-option>
                  <a-select-option value="3">储值卡3 余额8元</a-select-option>
                </a-select>
          </st-form-item>
        </div>
      </st-form>
    </div>
    <template slot="footer">
      <st-button type="primary">确认收款</st-button>
    </template>
  </st-modal>
</template>

<script>
export default {
  name: 'ModalSoldDealGathering',
  bem: {
    gathering: 'modal-sold-deal-gathering'
  },

  data() {
    return {
      show: false,
      selectPayValues: 0
    }
  },
  methods: {
    onOk() {
      this.$emit('ok')
      this.show = false
    },
    selectPay(checkedValues) {
      console.log(checkedValues)
      this.selectPayValues = checkedValues.target.value
    }
  }
}
</script>
