<template>
  <st-modal
    title="转让"
    size="small"
    v-model="show"
    wrapClassName="modal-sold-card-transfer"
    @ok="onOk"
  >
    <div :class="transfer('content')">
      <a-row :class="transfer('info')">
        <a-col :span="13">
          <st-info>
            <st-info-item label="商品名称">1000元储值卡</st-info-item>
            <st-info-item label="剩余金额">182天</st-info-item>
            <st-info-item label="储值金额">385天</st-info-item>
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
            <st-info-item label="订单号">1234567890123456</st-info-item>
            <st-info-item label="订单状态">已完成</st-info-item>
            <st-info-item label="转让手续费" class="mgb-24">5%</st-info-item>
          </st-info>
        </a-col>
      </a-row>
      <st-form labelWidth="72px">
        <div :class="transfer('transfer')">
          <st-form-item label="转让会员" required>
            <a-input value="18897880988"></a-input>
          </st-form-item>
          <st-form-item label="有效时间" required>
            <div :class="transfer('time')">
              <a-form-item class="page-a-form mg-b0">
                <a-date-picker
                  style="width: 100%;"
                  format="YYYY-MM-DD"
                  placeholder="开始时间"
                  :showToday="false"
                />
              </a-form-item>
              <span>~</span>
              <a-form-item class="page-a-form mg-b0">
                <a-date-picker format="YYYY-MM-DD" placeholder="结束时间" :showToday="false"/>
              </a-form-item>
            </div>
          </st-form-item>
          <st-form-item label="剩余价值" required>
            <a-input value="18897880988"></a-input>
          </st-form-item>
          <st-form-item label="合同编号" class="mgb-18" required>
            <div :class="transfer('contract')">
              <a-input placeholder="请输入合同编号"></a-input>
              <st-button class="create-button">自动生成</st-button>
            </div>
          </st-form-item>
          <st-form-item label="手续费" class="mgb-18">50元</st-form-item>
          <st-form-item label="支付方式" required>
            <a-select placeholder="选择支付方式">
              <a-select-option value="jack">Jack</a-select-option>
              <a-select-option value="lucy">Lucy</a-select-option>
            </a-select>
          </st-form-item>
          <st-form-item label="收款专员" class="mg-b0" required>
            <a-select placeholder="选择收款专员">
              <a-select-option value="jack">Jack</a-select-option>
              <a-select-option value="lucy">Lucy</a-select-option>
            </a-select>
          </st-form-item>
        </div>
      </st-form>
    </div>
    <template slot="footer">
      <st-button key="submit" type="primary">确认提交</st-button>
    </template>
    {{record}}
  </st-modal>
</template>

<script>
export default {
  name: 'ModalSoldCardTransfer',
  bem: {
    transfer: 'modal-sold-card-transfer'
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
