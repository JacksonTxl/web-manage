<template>
  <st-modal title="订单收款" size="small" v-model="show" wrapClassName="modal-sold-course-transfer">
    <div :class="transfer('content')">
      <a-row :class="transfer('info')">
        <a-col :span="13">
          <st-info>
            <st-info-item label="订单号">11345677890567890</st-info-item>
            <st-info-item label="下单人">操作人员昵称 19087665544</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="11">
          <st-info>
            <st-info-item label="下单时间">2019-02-19 21:15:39</st-info-item>
            <st-info-item label="销售">销售人员昵称 19087665544</st-info-item>
          </st-info>
        </a-col>
      </a-row>
      <st-hr marginTop="0" marginBottom="20"/>
      <a-row :class="transfer('info')">
        <a-col :span="13">
          <st-info>
            <st-info-item label="场馆">ABC场馆</st-info-item>
            <st-info-item label="用户">ABC场馆</st-info-item>
            <st-info-item label="购买">ABC场馆</st-info-item>
            <st-info-item label="赠送">ABC场馆</st-info-item>
            <st-info-item label="订单总额">ABC场馆</st-info-item>
            <st-info-item label="优惠金额">ABC场馆</st-info-item>
            <st-info-item label="定金抵扣">ABC场馆</st-info-item>
            <st-info-item label="减免金额">ABC场馆</st-info-item>
            <st-info-item label="应付金额">ABC场馆</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="11">
          <div>备注：</div>Click the blue Preview button on the top toolbar to open this page up in your browser. Then click the button below to let us know of your experience using this library and how we can improve it.
        </a-col>
      </a-row>
      <st-hr marginTop="0" marginBottom="0"/>
      <st-form labelWidth="118px">
        <st-form-item label="已收金额/未收金额">0元 / 70元</st-form-item>
      </st-form>
      <st-form labelWidth="68px">
        <st-form-item label="支付金额" labelGutter="12px" required>
          <st-input-number :max="99999.9" :float="true" placeholder="请输入支付金额">
            <template slot="addonAfter">元</template>
          </st-input-number>
        </st-form-item>
        <st-form-item label="支付方式" required labelGutter="12px">
          <a-select placeholder="请选择支付方式">
            <a-select-option value="jack">Jack</a-select-option>
            <a-select-option value="lucy">Lucy</a-select-option>
          </a-select>
        </st-form-item>
      </st-form>
    </div>
    <template slot="footer">
      <div :class="relet('footer')">
        <div class="button" style="    width: 100%;    text-align: right;">
          <st-button @click="save" type="primary">确认收款</st-button>
        </div>
      </div>
    </template>
  </st-modal>
</template>

<script>
export default {
  name: 'orderCollection',
  bem: {
    transfer: 'modal-sold-course-transfer',
    relet: 'modal-sold-lease-relet'
  },

  data() {
    return {
      show: false,
      form: this.$form.createForm(this)
    }
  },
  created() {},
  methods: {
    save() {
      this.form.validateFields((error, values) => {
        console.log(error, values)
        if (!error) {
        }
      })
    }
  }
}
</script>
