<template>
  <st-modal
  title="续租"
  size="small"
  v-model="show"
  wrapClassName="modal-sold-lease-relet"
  @ok="onOk">
    <div :class="relet('content')">
      <a-row :class="relet('info')">
        <a-col :span="13">
          <st-info>
            <st-info-item label="商品名称">长期储物柜</st-info-item>
            <st-info-item label="商品类型">租赁</st-info-item>
            <st-info-item class="mgb-24" label="租赁计费">12元/天</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="11">
           <st-info>
            <st-info-item label="售卖群体">会员</st-info-item>
            <st-info-item label="允许转让">允许</st-info-item>
            <st-info-item class="mgb-24" label="转让手续费">5%</st-info-item>
          </st-info>
        </a-col>
      </a-row>
      <st-form labelWidth="72px">
        <div :class="relet('relet')">
          <st-form-item label="租赁会员" class="mgb-18">王家林</st-form-item>
          <st-form-item label="租赁柜号" required>
            <a-cascader :options="options" placeholder="选择XXX" />
          </st-form-item>
          <st-form-item label="续租时间" required>
            <div :class="relet('time')">
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
                <a-date-picker
                  format="YYYY-MM-DD"
                  placeholder="结束时间"
                  :showToday="false"
                />
              </a-form-item>
            </div>
          </st-form-item>
          <st-form-item label="租赁天数" required>
            <st-input-number placeholder="请输入天数">
              <template slot="addonAfter">天</template>
            </st-input-number>
          </st-form-item>
          <st-form-item label="合同编号" class="mgb-18" required>
            <div :class="relet('contract')">
              <a-input placeholder="请输入合同编号"></a-input>
              <st-button class="create-button">自动生成</st-button>
            </div>
          </st-form-item>
          <st-form-item class="mgb-18" label="租赁费用">900元</st-form-item>
          <st-form-item label="减免金额" class="mgb-18" required>
            <st-input-number placeholder="请输入金额">
              <template slot="addonAfter">元</template>
            </st-input-number>
          </st-form-item>
          <st-form-item class="mg-b0" label="小计">
            <span class="total">120元</span>
          </st-form-item>
        </div>
        <div :class="relet('remarks')">
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
      <div :class="relet('footer')">
        <div class="price">
          <span>850元</span>
          <span>订单总额：900元</span>
        </div>
        <div class="button">
          <st-button>创建订单</st-button>
          <st-button type="primary">立即支付</st-button>
        </div>
      </div>
    </template>
  </st-modal>
</template>

<script>
export default {
  name: 'ModalSoldLeaseRelet',
  bem: {
    relet: 'modal-sold-lease-relet'
  },

  data() {
    return {
      show: false,
      options: [{
        value: '1',
        label: '女更区域',
        children: [{
          value: '11',
          label: 'A001'
        }, {
          value: '12',
          label: 'A002'
        }]
      }, {
        value: '2',
        label: '男更区域',
        children: [{
          value: '21',
          label: 'B001'
        }, {
          value: '22',
          label: 'B002'
        }, {
          value: '23',
          label: 'B003'
        }]
      }]
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
