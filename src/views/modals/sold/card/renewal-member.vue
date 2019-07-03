<template>
  <st-modal
  size="small"
  v-model="show"
  wrapClassName="modal-sold-deal-sale">
  <template slot="title">
      续卡<st-help-tooltip id="TSMC001" />
  </template>
    <div :class="sale('content')">
      <st-form :form="form" labelWidth="85px">
        <div :class="sale('sale')" class="modal-sold-renewal-member-card">
          <st-form-item labelGutter="12px" label="续卡会员" class="mg-b16">{{info.member_name}}</st-form-item>
          <st-form-item labelGutter="12px" label="卡名" class="mg-b16">{{info.card_name}}</st-form-item>
          <st-form-item labelGutter="12px" label="规格" class="mg-b16" required v-if="info.specs">
            <a-radio-group v-model="selectSpecs" @change="onSpecsChange">
              <a-radio v-for="(item, index) in info.specs" :value="item.id" :key="index">{{item.specs_name}}/{{item.price}}元</a-radio>
            </a-radio-group>
          </st-form-item>
          <st-form-item labelGutter="12px" class="mg-b0" label="有效时间" required>
            <div :class="sale('time')">
              <a-form-item class="page-a-form">
                <a-date-picker
                  :disabledDate="disabledStartDate"
                  v-decorator="['startTime',{rules:[{required:true,message:'请选择开始时间'}]}]"
                  @change="onStartTimeChange"
                  style="width: 188px;"
                  format="YYYY-MM-DD HH:mm"
                  :showTime="{format: 'HH:mm'}"
                  placeholder="开始时间"
                  :allowClear="false"
                  :showToday="false"
                />
              </a-form-item>
              <span style="width:158px;">&nbsp;&nbsp;至&nbsp;&nbsp;{{endTime}}</span>
            </div>
          </st-form-item>
          <st-form-item labelGutter="12px" label="购买赠送">
            <st-input-number v-model="giftAmount" :placeholder="`请输入赠送的${info.card_type!==1?'天数':'次数'}`">
              <span slot="addonAfter">{{info.card_type!==1?'天':'次'}}</span>
            </st-input-number>
          </st-form-item>
          <st-form-item labelGutter="12px" required>
            <template slot="label">
                合同编号<st-help-tooltip id="TSSD001" />
            </template>
            <div :class="sale('contract')">
              <a-input
              v-decorator="['contractNumber',{rules:[{required:true,message:'请输入合同编号'}]}]"
              placeholder="请输入合同编号"></a-input>
              <st-button class="create-button" @click="onCodeNumber" :loading="loading.getCodeNumber">自动生成</st-button>
            </div>
          </st-form-item>
          <st-form-item labelGutter="12px" class="mgb-12" label="商品价格">{{cardPrice}}元</st-form-item>
          <st-form-item labelGutter="12px" :class="sale('discounts')" label="优惠金额">
            <div>
              <div :class="sale('discounts-total')">
                <span>{{couponText}}</span>
                <a-dropdown
                v-model="couponDropdownVisible"
                :disabled="couponList.length===0"
                :class="sale({disabled:couponList.length===0})"
                placement="bottomRight"
                :getPopupContainer="trigger => trigger.parentNode"
                :trigger="['click']">
                  <div :class="sale('discounts-promotion')">
                    <span>{{couponList.length===0?'无优惠券':'优惠券选择'}}</span>
                    <a-icon type="right" />
                  </div>
                  <a-radio-group v-model="selectCoupon" @change="onSelectCouponChange" :class="sale('dropdown')" slot="overlay">
                    <a-menu>
                      <a-menu-item @click="onSelectCoupon">
                        <a-radio :value="-1">不使用</a-radio>
                      </a-menu-item>
                      <a-menu-item @click="onSelectCoupon" :key="index" v-for="(item,index) in couponList">
                        <a-radio :value="item.id">{{item.name}} {{item.price}}</a-radio>
                      </a-menu-item>
                    </a-menu>
                  </a-radio-group>
                </a-dropdown>
              </div>
            </div>
          </st-form-item>
          <st-form-item labelGutter="12px" :class="sale('discounts')" label="定金抵扣">
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
          <st-form-item labelGutter="12px" label="减免金额">
            <st-input-number v-model="reduceAmount" :float="true" placeholder="请输入">
              <span slot="addonAfter">元</span>
            </st-input-number>
          </st-form-item>
          <st-form-item labelGutter="12px" validateStatus="error" :help="orderAmountText" class="mg-b0" label="小计">
            <span class="total">{{priceInfo}}元</span>
          </st-form-item>
        </div>
        <div :class="sale('remarks')">
          <st-form-item labelGutter="12px" label="销售人员" required>
            <a-select
            v-decorator="['saleName',{rules:[{required:true,message:'请选择销售人员'}]}]"
            placeholder="选择签单的工作人员">
              <a-select-option
              v-for="(item,index) in saleList"
              :key="index"
              :value="item.id">{{item.staff_name}}</a-select-option>
            </a-select>
          </st-form-item>
          <st-form-item labelGutter="12px" label="备注" class="mg-b0">
            <a-textarea v-model="description" :autosize="{ minRows: 4, maxRows: 6 }" />
          </st-form-item>
        </div>
      </st-form>
    </div>
    <template slot="footer">
      <div :class="sale('footer')">
        <div class="price">
          <span>{{priceInfo}}元</span>
          <span>订单总额：{{cardPrice}}元</span>
        </div>
        <div class="button">
          <st-button @click="onCreateOrder" :loading="loading.renewal">创建订单</st-button>
          <st-button @click="onPay" :loading="loading.renewalPay" type="primary">立即支付</st-button>
        </div>
      </div>
    </template>
  </st-modal>
</template>

<script>
import { RenewalMemberService } from './renewal-member.service'
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
      renewalMemberService: RenewalMemberService
    }
  },
  rxState() {
    return {
      loading: this.renewalMemberService.loading$,
      couponList: this.renewalMemberService.couponList$,
      advanceList: this.renewalMemberService.advanceList$,
      priceInfo: this.renewalMemberService.priceInfo$,
      saleList: this.renewalMemberService.saleList$,
      info: this.renewalMemberService.info$
    }
  },
  props: ['id'],
  data() {
    return {
      show: false,
      form: this.$form.createForm(this),
      // 规格
      selectSpecs: 1,
      // 时间
      startTime: null,
      endTime: '',
      // 赠送
      giftAmount: null,
      // 优惠
      couponDropdownVisible: false,
      couponText: '未选择优惠券',
      couponAmount: '',
      selectCoupon: '',
      // 定金
      advanceDropdownVisible: false,
      advanceText: '未选择定金',
      advanceAmount: '',
      selectAdvance: '',
      // 减免金额
      reduceAmount: null,
      // 描述
      description: ''
    }
  },
  created() {
    this.renewalMemberService.serviceInit(this.id).subscribe(res => {
      // 获取优惠券
      this.renewalMemberService.getCouponList({
        member_id: res[0].info.member_id,
        card_id: res[0].info.card_id,
        specs_id: res[0].info.specs[0].id
      }).subscribe()
      // 获取定金
      this.renewalMemberService.getAdvanceList(res[0].info.member_id).subscribe()
      // 规格
      this.selectSpecs = res[0].info.specs[0].id
      this.form.setFieldsValue({
        startTime: moment(res[0].info.default_start_time * 1000)
      })
      // 实付金额
      this.getPrice('', 0, '', res[0].info.specs[0].id)
      this.startTime = cloneDeep(moment(res[0].info.default_start_time * 1000))
      this.endTime = moment(res[0].info.default_start_time * 1000).add(res[0].info.specs[0].valid_time, 'd').format('YYYY-MM-DD HH:mm')
    })
  },
  watch: {
    selectSpecs(newVal, oldVal) {
      this.getPrice(this.selectAdvance, +this.reduceAmount, this.selectCoupon, newVal)
    },
    selectAdvance: {
      deep: true,
      handler(newVal, oldVal) {
        this.getPrice(newVal, +this.reduceAmount, this.selectCoupon, this.selectSpecs)
      }
    },
    selectCoupon: {
      deep: true,
      handler(newVal, oldVal) {
        this.getPrice(this.selectAdvance, +this.reduceAmount, newVal, this.selectSpecs)
      }
    },
    reduceAmount(newVal, oldVal) {
      this.getPrice(this.selectAdvance, +newVal, this.selectCoupon, this.selectSpecs)
    }
  },
  computed: {
    // 商品价格
    cardPrice() {
      return this.info.specs ? (this.info.specs.filter(i => i.id === this.selectSpecs)[0].price) : '0'
    },
    orderAmountText() {
      return this.priceInfo < 0 ? '小计不能为负' : ''
    }
  },
  methods: {
    moment,
    // 规格
    onSpecsChange(data) {
      let item = this.info.specs.filter(i => i.id === data.target.value)[0]
      let s = cloneDeep(this.startTime)
      let dayScope = item.valid_time
      this.endTime = s.add(dayScope, 'd').format('YYYY-MM-DD HH:mm')
      // 获取优惠券
      this.renewalMemberService.getCouponList({
        member_id: this.info.member_id,
        card_id: this.info.card_id,
        specs_id: item.id
      }).subscribe(res => {
        this.resetCoupon()
      })
    },
    // 时间
    disabledStartDate(startTime) {
      return startTime.valueOf() < this.info.default_start_time * 1000
    },
    onStartTimeChange(data) {
      this.startTime = cloneDeep(data)
      let s = cloneDeep(data)
      let dayScope = this.info.specs.filter(i => i.id === this.selectSpecs)[0].valid_time
      this.endTime = s.add(dayScope, 'd').format('YYYY-MM-DD HH:mm')
    },
    // 合同
    onCodeNumber() {
      this.renewalMemberService.getCodeNumber(this.info.contract_type).subscribe(res => {
        this.form.setFieldsValue({
          contractNumber: res.info.code
        })
      })
    },
    // 优惠
    onSelectCouponChange(data) {
      if (data.target.value === -1) {
        this.couponAmount = ''
        this.couponText = '未选择优惠券'
        return
      }
      let price = this.couponList.filter(o => o.id === data.target.value)[0].price
      this.couponAmount = price
      this.couponText = `${price}元`
    },
    onSelectCoupon() {
      timer(200).subscribe(() => {
        this.couponDropdownVisible = false
      })
    },
    resetCoupon() {
      this.renewalMemberService.resetCouponList()
      this.couponText = '未选择优惠券'
      this.couponAmount = ''
      this.selectcoupon = ''
    },
    // 定金
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
    onSelectAdvance() {
      timer(200).subscribe(() => {
        this.advanceDropdownVisible = false
      })
    },
    resetAdvance() {
      this.renewalMemberService.resetAdvanceList()
      this.advanceText = '未选择定金'
      this.advanceAmount = ''
      this.selectAdvance = ''
    },
    // 计算实付金额
    getPrice(advance, reduce, coupon, specs_id) {
      let advanceId = advance === -1 ? '' : advance
      let couponId = coupon === -1 ? '' : coupon
      this.renewalMemberService.priceAction$.dispatch({
        id: this.id,
        product_id: this.info.card_id,
        product_type: this.info.contract_type,
        specs_id,
        advance_id: advanceId,
        reduce_amount: reduce,
        coupon_id: couponId,
        member_id: this.info.member_id
      })
    },
    onCreateOrder() {
      this.form.validateFields((error, values) => {
        if (!error) {
          let reduce_amount = this.reduceAmount ? +this.reduceAmount : undefined
          this.renewalMemberService.renewal({
            contract_number: values.contractNumber,
            rule_id: this.selectSpecs,
            gift_amount: +this.giftAmount,
            user_coupon_id: this.selectCoupon === -1 ? undefined : +this.selectCoupon,
            advance_id: this.selectAdvance === -1 ? undefined : this.selectAdvance,
            reduce_price: reduce_amount,
            description: this.description,
            staff_sale_id: +values.saleName,
            contract_type: this.info.contract_type,
            discounts_price: +this.info.specs.filter(i => i.id === this.selectSpecs)[0].price
          }, this.id).subscribe(res => {
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
          this.renewalMemberService.renewal({
            contract_number: values.contractNumber,
            rule_id: this.selectSpecs,
            gift_amount: +this.giftAmount,
            user_coupon_id: this.selectCoupon === -1 ? undefined : +this.selectCoupon,
            advance_id: this.selectAdvance === -1 ? undefined : this.selectAdvance,
            reduce_price: reduce_amount,
            description: this.description,
            staff_sale_id: +values.saleName,
            contract_type: this.info.contract_type,
            discounts_price: +this.info.specs.filter(i => i.id === this.selectSpecs)[0].price
          }, this.id).subscribe(res => {
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
