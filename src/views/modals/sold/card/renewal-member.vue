<template>
  <st-modal
  title="续卡"
  size="small"
  v-model="show"
  @cancel="onCancel"
  wrapClassName="modal-sold-deal-sale">
    <div :class="sale('content')">
      <st-form :form="form" labelWidth="72px">
        <div :class="sale('sale')">
          <st-form-item label="续卡会员">黎明</st-form-item>
          <st-form-item label="卡名">万晋健身房年卡</st-form-item>
          <st-form-item label="规格" required>
            <a-radio-group>
              <a-radio v-for="(item, index) in 5" :value="item" :key="index">item</a-radio>
            </a-radio-group>
          </st-form-item>
          <st-form-item class="mg-b0" label="有效时间" required>
            <div :class="sale('time')">
              <a-form-item class="page-a-form">
                <a-date-picker
                  style="width: 188px;"
                  format="YYYY-MM-DD HH:mm"
                  :showTime="{format: 'HH:mm'}"
                  placeholder="开始时间"
                  :allowClear="false"
                  :showToday="false"
                />
              </a-form-item>
              <span style="width:158px;">&nbsp;&nbsp;至&nbsp;&nbsp;2020-03-07  14:20</span>
            </div>
          </st-form-item>
          <st-form-item label="购买赠送">
            <st-input-number  :float="true" placeholder="请输入赠送的天数/次数">
              <span slot="addonAfter">天数/次数</span>
            </st-input-number>
          </st-form-item>
          <st-form-item label="合同编号" required>
            <div :class="sale('contract')">
              <a-input
              placeholder="请输入合同编号"></a-input>
              <st-button class="create-button">自动生成</st-button>
            </div>
          </st-form-item>
          <st-form-item class="mgb-12" label="商品价格">111元</st-form-item>
          <st-form-item :class="sale('discounts')" label="优惠金额">
            <div>
              <div :class="sale('discounts-total')">
                <span>{{advanceText}}</span>
                <a-dropdown
                v-model="advanceDropdownVisible"
                :disabled="advanceList.length===0"
                :class="sale({disabled:advanceList.length===0})"
                placement="bottomRight"
                :getPopupContainer="trigger => trigger.parentNode"
                :trigger="['click']">
                  <div :class="sale('discounts-promotion')">
                    <span>{{advanceList.length===0?'无定金':'定金选择'}}</span>
                    <a-icon type="right" />
                  </div>
                  <a-radio-group v-model="selectAdvance" @change="onSelectAdvanceChange" :class="sale('dropdown')" slot="overlay">
                    <a-menu>
                      <a-menu-item @click="onSelectAdvance">
                        <a-radio :value="-1">不使用</a-radio>
                      </a-menu-item>
                      <a-menu-item @click="onSelectAdvance" :key="index" v-for="(item,index) in advanceList">
                        <a-radio :value="item.id">定金 {{item.price}}</a-radio>
                      </a-menu-item>
                    </a-menu>
                  </a-radio-group>
                </a-dropdown>
              </div>
            </div>
          </st-form-item>
          <st-form-item :class="sale('discounts')" label="定金抵扣">
            <div>
              <div :class="sale('discounts-total')">
                <span>{{advanceText}}</span>
                <a-dropdown
                v-model="advanceDropdownVisible"
                :disabled="advanceList.length===0"
                :class="sale({disabled:advanceList.length===0})"
                placement="bottomRight"
                :getPopupContainer="trigger => trigger.parentNode"
                :trigger="['click']">
                  <div :class="sale('discounts-promotion')">
                    <span>{{advanceList.length===0?'无定金':'定金选择'}}</span>
                    <a-icon type="right" />
                  </div>
                  <a-radio-group v-model="selectAdvance" @change="onSelectAdvanceChange" :class="sale('dropdown')" slot="overlay">
                    <a-menu>
                      <a-menu-item @click="onSelectAdvance">
                        <a-radio :value="-1">不使用</a-radio>
                      </a-menu-item>
                      <a-menu-item @click="onSelectAdvance" :key="index" v-for="(item,index) in advanceList">
                        <a-radio :value="item.id">定金 {{item.price}}</a-radio>
                      </a-menu-item>
                    </a-menu>
                  </a-radio-group>
                </a-dropdown>
              </div>
            </div>
          </st-form-item>
          <st-form-item label="减免金额">
            <st-input-number v-model="reduceAmount" :float="true" placeholder="请输入">
              <span slot="addonAfter">元</span>
            </st-input-number>
          </st-form-item>
          <st-form-item validateStatus="error" :help="orderAmountText" class="mg-b0" label="小计">
            <span class="total">{{priceInfo}}元</span>
          </st-form-item>
        </div>
        <div :class="sale('remarks')">
          <st-form-item label="销售人员" required>
            <a-select
            v-decorator="['saleName',{rules:[{validator:sale_name}]}]"
            placeholder="选择签单的工作人员">
              <a-select-option
              v-for="(item,index) in saleList"
              :key="index"
              :value="item.id">{{item.staff_name}}</a-select-option>
            </a-select>
          </st-form-item>
          <st-form-item label="备注" class="mg-b0">
            <a-textarea v-model="description" :autosize="{ minRows: 4, maxRows: 6 }" />
          </st-form-item>
        </div>
      </st-form>
    </div>
    <template slot="footer">
      <div :class="sale('footer')">
        <div class="price">
          <span>{{priceInfo}}元</span>
          <span>订单总额：{{info.sell_price}}元</span>
        </div>
        <div class="button">
          <st-button @click="onCreateOrder" :loading="loading.setTransaction">创建订单</st-button>
          <st-button @click="onPay" :loading="loading.setTransactionPay" type="primary">立即支付</st-button>
        </div>
      </div>
    </template>
  </st-modal>
</template>

<script>
import { RenewalMember } from './renewal-member.service'
import moment from 'moment'
import { cloneDeep } from 'lodash-es'
import { timer } from 'rxjs'
export default {
  name: 'ModalSoldRenewalMemberCard',
  bem: {
    sale: 'modal-sold-deal-sale'
  },
  serviceInject() {
    return {
      renewalMember: RenewalMember
    }
  },
  rxState() {
    return {
      loading: this.renewalMember.loading$,
      info: this.renewalMember.info$
    }
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      show: false,
      form: this.$form.createForm(this),

      // 搜索会员
      memberSearchText: '',
      searchMemberIsShow: true,
      // 定金
      advanceDropdownVisible: false,
      advanceList: [],
      advanceText: '未选择定金',
      advanceAmount: '',
      selectAdvance: '',
      reduceAmount: null,
      description: ''
    }
  },
  created() {
    this.renewalMember.serviceInit(this.id).subscribe()
  },
  watch: {
    selectAdvance: {
      deep: true,
      handler(newVal, oldVal) {
        this.getPrice(newVal, +this.reduceAmount)
      }
    },
    reduceAmount(newVal, oldVal) {
      this.getPrice(this.selectAdvance, +newVal)
    }
  },
  computed: {
    orderAmountText() {
      return this.priceInfo < 0 ? '小计不能为负' : ''
    }
  },
  methods: {
    moment,
    member_id_validator(rule, value, callback) {
      if (!value && this.searchMemberIsShow) {
        // eslint-disable-next-line
        callback('请选择转让会员')
      } else {
        // eslint-disable-next-line
        callback()
      }
    },
    member_name_validator(rule, value, callback) {
      if (!value && !this.searchMemberIsShow) {
        // eslint-disable-next-line
        callback('请输入会员姓名')
      } else {
        // eslint-disable-next-line
        callback()
      }
    },
    member_mobile_validator(rule, value, callback) {
      if (!value && !this.searchMemberIsShow) {
        // eslint-disable-next-line
        callback('请输入手机号')
      } else if (value && !this.rules.mobile.test(value)) {
        // eslint-disable-next-line
        callback('输入的手机号格式错误，请重新输入')
      } else {
        // eslint-disable-next-line
        callback()
      }
    },
    contract_number(rule, value, callback) {
      if (!value) {
        // eslint-disable-next-line
        callback('请输入合同编号')
      } else {
        // eslint-disable-next-line
        callback()
      }
    },
    sale_name(rule, value, callback) {
      if (!value) {
        // eslint-disable-next-line
        callback('请选择销售人员')
      } else {
        // eslint-disable-next-line
        callback()
      }
    },
    // 搜索会员
    onMemberSearch(data) {
      this.memberSearchText = data
      if (data === '') {
        this.renewalMember.memberList$.commit(() => [])
        this.form.resetFields(['memberId'])
      } else {
        this.renewalMember.getMember(data).subscribe(res => {
          if (!res.list.length) {
            this.resetAdvance()
            this.form.resetFields(['memberId'])
          }
        })
      }
    },
    onMemberChange(data) {
      if (!data) {
        this.resetAdvance()
      } else {
        this.renewalMember.getAdvanceList(data).subscribe(res => {
          this.advanceList = cloneDeep(res.list)
        })
      }
    },
    onSelectAdvance() {
      timer(200).subscribe(() => {
        this.advanceDropdownVisible = false
      })
    },
    // 重置定金选择
    resetAdvance() {
      this.advanceList = []
      this.advanceText = '未选择定金'
      this.advanceAmount = ''
      this.selectAdvance = ''
    },
    // 切换添加会员
    onAddMember() {
      this.searchMemberIsShow = false
      this.form.resetFields(['memberId', 'memberName', 'memberMobile'])
      this.resetAdvance()
    },
    onCancelMember() {
      this.searchMemberIsShow = true
      this.form.resetFields(['memberId', 'memberName', 'memberMobile'])
    },
    onCodeNumber() {
      this.renewalMember.getCodeNumber(this.info.contract_type).subscribe(res => {
        this.form.setFieldsValue({
          contractNumber: res.info.code
        })
      })
    },
    onCancel() {
      this.renewalMember.resetMember()
      this.resetAdvance()
    },
    onSelectAdvanceChange(data) {
      if (data.target.value === -1) {
        this.advanceAmount = ''
        this.advanceText = '未选择定金'
        return
      }
      let price = this.advanceList.filter(o => o.id === data.target.value)[0].price
      this.advanceAmount = price
      this.advanceText = `${price}元`
    },
    // 计算实付金额
    getPrice(advance, reduce) {
      this.renewalMember.priceAction$.dispatch({
        product_id: this.id,
        product_type: this.info.contract_type,
        advance_id: advance,
        reduce_amount: reduce
      })
    },
    onCreateOrder() {
      this.form.validateFields((error, values) => {
        if (!error) {
          let reduce_amount = this.reduceAmount ? +this.reduceAmount : undefined
          this.renewalMember.setTransaction({
            'member_id': +values.memberId,
            'member_name': values.memberName,
            'mobile': values.memberMobile,
            'deposit_card_id': +this.id,
            'contract_number': values.contractNumber,
            'advance_id': this.selectAdvance === -1 ? undefined : this.selectAdvance,
            reduce_amount,
            'sale_id': +values.saleName,
            'description': this.description,
            'order_amount': this.priceInfo,
            'sale_range': +this.info.sale_range.type
          }).subscribe(res => {
            this.show = false
            this.$emit('success', {
              type: 'create',
              orderId: res.info.order_id
            })
          })
        }
      })
    },
    onPay() {
      this.form.validateFields((error, values) => {
        if (!error) {
          let reduce_amount = this.reduceAmount ? +this.reduceAmount : undefined
          this.renewalMember.setTransactionPay({
            'member_id': +values.memberId,
            'member_name': values.memberName,
            'mobile': values.memberMobile,
            'deposit_card_id': +this.id,
            'contract_number': values.contractNumber,
            'advance_id': this.selectAdvance === -1 ? undefined : this.selectAdvance,
            reduce_amount,
            'sale_id': +values.saleName,
            'description': this.description,
            'order_amount': this.priceInfo,
            'sale_range': +this.info.sale_range.type
          }).subscribe(res => {
            this.show = false
            this.$emit('success', {
              type: 'createPay',
              orderId: res.info.order_id
            })
          })
        }
      })
    }
  }
}
</script>
