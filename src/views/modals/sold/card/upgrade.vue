<template>
  <st-modal
  title="升级"
  size="small"
  v-model="show"
  wrapClassName="modal-sold-card-upgrade"
  @ok="onOk">
    <div :class="upgrade('content')">
      <a-row :class="upgrade('old-card')">
        <a-col :span="13">
          <st-info>
            <st-info-item label="卡名">年年卡</st-info-item>
            <st-info-item label="当前额度">182天</st-info-item>
            <st-info-item label="初始额度">385天</st-info-item>
            <st-info-item label="优惠赠送">30天</st-info-item>
            <st-info-item label="实付金额">3600元</st-info-item>
            <st-info-item label="到期日期">2020/02/21 14:20:59</st-info-item>
            <st-info-item label="销售人员" class="mgb-24">卡尔</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="11">
           <st-info>
            <st-info-item label="会员姓名">王守仁</st-info-item>
            <st-info-item label="手机号">18974023375</st-info-item>
            <st-info-item label="实体卡号">34345234243</st-info-item>
            <st-info-item label="物理ID">453454545453</st-info-item>
            <st-info-item label="订单号">1234567890123456</st-info-item>
            <st-info-item label="订单状态">已完成</st-info-item>
          </st-info>
        </a-col>
      </a-row>
      <st-form labelWidth="72px">
        <div :class="upgrade('upgrade-card')">
          <st-form-item label="会员卡" class="mgb-18" required>
            <a-select placeholder="选择升级的会员卡">
              <a-select-option value="jack">Jack</a-select-option>
              <a-select-option value="lucy">Lucy</a-select-option>
            </a-select>
          </st-form-item>
          <st-form-item label="规格" class="mgb-12" required>
            <a-radio-group>
              <a-radio :value="1">10天/120元</a-radio>
              <a-radio :value="2">20天/240元</a-radio>
              <a-radio :value="3">30天/350元</a-radio>
              <a-radio :value="4">40天/450元</a-radio>
            </a-radio-group>
          </st-form-item>
          <st-form-item label="开卡方式" class="mgb-12" required>
            <a-radio-group>
              <a-radio :value="1">即时开卡</a-radio>
              <a-radio :value="2">到店开卡</a-radio>
              <a-radio :value="3">指定日期开卡</a-radio>
            </a-radio-group>
          </st-form-item>
          <st-form-item class="mgb-18" label="有效日期">2019/03/08 14:20 至 2020/03/07 14:20</st-form-item>
          <st-form-item label="购买赠送">
            <st-input-number placeholder="请输入赠送的天数/次数"></st-input-number>
          </st-form-item>
          <st-form-item label="合同编号" class="mgb-18" required>
            <div :class="upgrade('contract')">
              <a-input placeholder="请输入合同编号"></a-input>
              <st-button class="create-button">自动生成</st-button>
            </div>
          </st-form-item>
          <st-form-item class="mgb-12" label="商品价格">120元</st-form-item>
          <st-form-item class="mgb-12" label="优惠金额">
            <div :class="upgrade('discounts')">
              <div :class="upgrade('discounts-total')">
                <span>40元</span>
                <div :class="upgrade('discounts-promotion')">
                  <span>2张可用优惠券</span>
                  <a-icon type="right" />
                </div>
              </div>
            </div>
          </st-form-item>
          <st-form-item class="mgb-18" label="定金抵扣">
            <div :class="upgrade('discounts')">
              <div :class="upgrade('discounts-total')">
                <span>40元</span>
                <div :class="upgrade('discounts-promotion')">
                  <span>定金选择</span>
                  <a-icon type="right" />
                </div>
              </div>
            </div>
          </st-form-item>
          <st-form-item class="mgb-18" label="减免金额">
            <st-input-number placeholder="请输入"></st-input-number>
          </st-form-item>
          <st-form-item class="mg-b0" label="小计">
            <span class="total">120元</span>
          </st-form-item>
        </div>
        <div :class="upgrade('remarks')">
          <st-form-item label="销售人员" required>
            <a-select placeholder="选择签单的工作人员">
              <a-select-option value="jack">Jack</a-select-option>
              <a-select-option value="lucy">Lucy</a-select-option>
            </a-select>
          </st-form-item>
          <st-form-item label="备注" class="mg-b0">
            <a-textarea :autosize="{ minRows: 4, maxRows: 6 }" />
          </st-form-item>
        </div>
      </st-form>
    </div>
    <template slot="footer">
      <st-button key="back">创建订单</st-button>
      <st-button key="submit" type="primary">立即支付</st-button>
    </template>
  </st-modal>
</template>

<script>
export default {
  name: 'ModalSoldCardUpgrade',
  bem: {
    upgrade: 'modal-sold-card-upgrade'
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
