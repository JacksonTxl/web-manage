<template>
  <st-modal
  title="交易签单"
  size="small"
  v-model="show"
  @cancel="onCancel"
  wrapClassName="modal-sold-deal-sale">
    <div :class="sale('content')">
      <a-row :class="sale('info')">
        <a-col :span="13">
          <st-info>
            <st-info-item label="商品名称">{{info.card_name}}</st-info-item>
            <st-info-item label="商品类型">{{info.product_type}}</st-info-item>
            <st-info-item label="消费门店">{{info.support_shop}}</st-info-item>
            <st-info-item label="消费类目">{{info.consume_product}}</st-info-item>
            <st-info-item class="mg-b24" label="有效时间">{{info.valid_time}}天</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="11">
           <st-info>
            <st-info-item label="允许转让">{{info.is_transfer}}</st-info-item>
            <st-info-item label="转让手续费">{{info.transfer_fee}}</st-info-item>
            <st-info-item label="储值金额">{{info.card_price}}</st-info-item>
            <st-info-item label="线上购买">{{info.online_sale}}</st-info-item>
            <st-info-item class="mg-b24" label="售卖群体" v-if="info.sale_range">{{info.sale_range.name}}</st-info-item>
          </st-info>
        </a-col>
      </a-row>
      <st-form :form="form" labelWidth="72px">
        <div :class="sale('sale')">
          <st-form-item v-show="searchMemberIsShow" label="购买会员" required>
            <a-select
              showSearch
              allowClear
              placeholder="输入手机号或会员名搜索"
              :defaultActiveFirstOption="false"
              :showArrow="false"
              :filterOption="false"
              v-decorator="['memberId',{rules:[{validator:member_id_validator}]}]"
              @search="onMemberSearch"
              @change="onMemberChange"
              notFoundContent="无搜索结果"
            >
              <a-select-option
              v-for="(item,index) in memberList"
              :value="item.member_id"
              :key="index">
                <span v-html="`${item.member_name}&nbsp;&nbsp;&nbsp;${item.mobile}`.replace(new RegExp(memberSearchText,'g'),`\<span class='global-highlight-color'\>${memberSearchText}\<\/span\>`)">
                  {{item.member_name}}&nbsp;&nbsp;&nbsp;{{item.mobile}}
                </span>
              </a-select-option>
            </a-select>
            <p v-if="!memberList.length&&memberSearchText!==''" class="add-text">查无此会员，<span @click="onAddMember">添加新会员？</span></p>
          </st-form-item>
          <st-form-item v-show="!searchMemberIsShow" label="会员姓名" required>
            <a-input v-decorator="['memberName',{rules:[{validator:member_name_validator}]}]" placeholder="请输入会员姓名"></a-input>
          </st-form-item>
          <st-form-item  v-show="!searchMemberIsShow" label="手机号" required>
            <a-input v-decorator="['memberMobile',{rules:[{validator:member_mobile_validator}]}]" placeholder="请输入手机号"></a-input>
            <p class="add-text"><span @click="onCancelMember">取消添加</span></p>
          </st-form-item>
          <st-form-item label="到期时间">{{moment().add(100,'d').format('YYYY-MM-DD hh:mm')}}</st-form-item>
          <st-form-item label="合同编号" required>
            <div :class="sale('contract')">
              <a-input
              v-decorator="['contractNumber',{rules:[{validator:contract_number}]}]"
              placeholder="请输入合同编号"></a-input>
              <st-button class="create-button" @click="onCodeNumber" :loading="loading.getCodeNumber">自动生成</st-button>
            </div>
          </st-form-item>
          <st-form-item class="mgb-12" label="商品价格">{{info.sell_price}}元</st-form-item>
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
            <span class="total">{{orderAmount}}元</span>
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
          <span>{{orderAmount}}元</span>
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
import { SaleDepositeCardService } from './sale-deposite-card.service'
import moment from 'moment'
import { cloneDeep } from 'lodash-es'
import { timer } from 'rxjs'
export default {
  name: 'ModalSoldDealSaleMemberCard',
  bem: {
    sale: 'modal-sold-deal-sale'
  },
  serviceInject() {
    return {
      saleDepositeCardService: SaleDepositeCardService
    }
  },
  rxState() {
    return {
      loading: this.saleDepositeCardService.loading$,
      memberList: this.saleDepositeCardService.memberList$,
      info: this.saleDepositeCardService.info$,
      saleList: this.saleDepositeCardService.saleList$
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
    this.saleDepositeCardService.serviceInit(this.id).subscribe()
  },
  computed: {
    orderAmount() {
      return this.info.sell_price - +this.reduceAmount - +this.advanceAmount
    },
    orderAmountText() {
      return this.orderAmount < 0 ? '小计不能为负' : ''
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
        this.saleDepositeCardService.memberList$.commit(() => [])
        this.form.resetFields(['memberId'])
      } else {
        this.saleDepositeCardService.getMember(data).subscribe(res => {
          if (!res.list.length) {
            this.form.resetFields(['memberId'])
          }
        })
      }
    },
    onMemberChange(data) {
      if (!data) {
        this.resetAdvance()
      } else {
        this.saleDepositeCardService.getAdvanceList(data).subscribe(res => {
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
    },
    onCancelMember() {
      this.searchMemberIsShow = true
      this.form.resetFields(['memberId', 'memberName', 'memberMobile'])
    },
    onCodeNumber() {
      this.saleDepositeCardService.getCodeNumber().subscribe(res => {
        this.form.setFieldsValue({
          contractNumber: res.info.code
        })
      })
    },
    onCancel() {
      this.saleDepositeCardService.memberList$.commit(() => [])
      this.resetAdvance()
    },
    onSelectAdvanceChange(data) {
      if (data.target.value === -1) {
        this.advanceAmount = ''
        this.advanceText = '未选择定金'
      }
      let price = this.advanceList.filter(o => o.id === data.target.value)[0].price
      this.advanceAmount = price
      this.advanceText = `${price}元`
    },
    onCreateOrder() {
      this.form.validateFields((error, values) => {
        if (!error) {
          this.saleDepositeCardService.setTransaction({
            'member_id': +values.memberId,
            'member_name': values.memberName,
            'mobile': values.memberMobile,
            'deposit_card_id': +this.id,
            'contract_number': values.contractNumber,
            'advance_id': this.selectAdvance === -1 ? undefined : this.selectAdvance,
            'reduce_amount': this.reduceAmount,
            'sale_id': +values.saleName,
            'description': this.description,
            'order_amount': this.orderAmount,
            'sale_range': +this.info.sale_range.type
          }).subscribe(() => {
            console.log('成功')
          })
        }
      })
    },
    onPay() {
      this.form.validateFields((error, values) => {
        if (!error) {
          this.saleDepositeCardService.setTransactionPay({
            'member_id': +values.memberId,
            'member_name': values.memberName,
            'mobile': values.memberMobile,
            'deposit_card_id': +this.id,
            'contract_number': values.contractNumber,
            'advance_id': this.selectAdvance === -1 ? undefined : this.selectAdvance,
            'reduce_amount': this.reduceAmount,
            'sale_id': +values.saleName,
            'description': this.description,
            'order_amount': this.orderAmount,
            'sale_range': +this.info.sale_range.type
          }).subscribe(() => {
            console.log('成功')
          })
        }
      })
    }
  }
}
</script>
