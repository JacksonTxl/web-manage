<template>
  <st-modal
  title="交易签单"
  size="small"
  v-model="show"
  wrapClassName="modal-sold-deal-sale"
  @ok="onOk">
    <div :class="sale('content')">
      <a-row :class="sale('info')">
        <a-col :span="13">
          <st-info>
            <st-info-item label="商品名称">课程名称</st-info-item>
            <st-info-item label="商品类型">私教课</st-info-item>
            <st-info-item label="时长">60分钟</st-info-item>
            <st-info-item label="有效时间">60分钟</st-info-item>
            <st-info-item class="mgb-24" label="支持门店">60分钟</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="11">
           <st-info>
            <st-info-item label="允许转让">允许</st-info-item>
            <st-info-item label="转让手续费">5%</st-info-item>
            <st-info-item label="线上购买">60分钟</st-info-item>
            <st-info-item label="售卖群体">会员</st-info-item>
          </st-info>
        </a-col>
      </a-row>
      <st-form labelWidth="72px">
        <div :class="sale('sale')">
          <st-form-item label="购买会员" class="mgb-18">
            <a-input placeholder="请输入会员姓名、手机号进行检索"></a-input>
          </st-form-item>
          <st-form-item label="规格" class="mgb-18" required>
            <a-radio-group>
              <a-radio :value="1">A等级</a-radio>
              <a-radio :value="2">B等级</a-radio>
              <a-radio :value="3">C等级</a-radio>
            </a-radio-group>
          </st-form-item>
          <st-form-item label="价格梯度" required>
            <a-select placeholder="选择升级的会员卡">
              <a-select-option value="jack">Jack</a-select-option>
              <a-select-option value="lucy">Lucy</a-select-option>
            </a-select>
          </st-form-item>
          <st-form-item label="商品数量" class="mgb-18" required>
            <div :class="sale('contract')">
              <a-input placeholder="请输入商品数量"></a-input>
              <st-button class="create-button">确定</st-button>
            </div>
          </st-form-item>
          <st-form-item label="到期时间" class="mgb-18">2020/06/23 14:46</st-form-item>
          <st-form-item label="合同编号" required>
            <div :class="sale('contract')">
              <a-input placeholder="请输入合同编号"></a-input>
              <st-button class="create-button">自动生成</st-button>
            </div>
          </st-form-item>
          <st-form-item label="上课教练" required>
            <a-select placeholder="选择升级的会员卡">
              <a-select-option value="jack">Jack</a-select-option>
              <a-select-option value="lucy">Lucy</a-select-option>
            </a-select>
          </st-form-item>
          <st-form-item label="购买赠送" class="mgb-18">
            <st-input-number placeholder="请输入赠送的上课节数XX">
              <template slot="addonAfter">节</template>
            </st-input-number>
          </st-form-item>
          <st-form-item class="mgb-12" label="商品价格">120元</st-form-item>
          <st-form-item class="mgb-12" label="优惠金额">
            <div :class="sale('discounts')">
              <div :class="sale('discounts-total')">
                <span>40元</span>
                <div :class="sale('discounts-promotion')">
                  <span>2张可用优惠券</span>
                  <a-icon type="right" />
                </div>
              </div>
            </div>
          </st-form-item>
          <st-form-item class="mgb-18" label="定金抵扣">
            <div :class="sale('discounts')">
              <div :class="sale('discounts-total')">
                <span>40元</span>
                <div :class="sale('discounts-promotion')">
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
        <div :class="sale('remarks')">
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
      <div :class="sale('footer')">
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
  name: 'ModalSoldDealSale',
  bem: {
    sale: 'modal-sold-deal-sale'
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
