<template>
  <st-modal
    title="交易签单"
    size="small"
    v-model="show"
    @cancel="onCancel"
    wrapClassName="modal-sold-deal-sale"
  >
    <div :class="sale('content')">
      <a-row :class="sale('info')">
        <a-col :span="13">
          <st-info>
            <st-info-item label="商品名称">
              {{ info.product_name }}
            </st-info-item>
            <st-info-item label="商品类型">
              {{ info.product_type }}
            </st-info-item>
            <st-info-item label="时长">{{ info.duration }}</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="11">
          <st-info>
            <st-info-item label="上课门店">{{ info.shop_range }}</st-info-item>
            <st-info-item label="售卖群体" v-if="info.sale_range">
              {{ info.sale_range.name }}
            </st-info-item>
          </st-info>
        </a-col>
      </a-row>
      <st-form :form="form" labelWidth="88px">
        <div :class="sale('sale')">
          <member-search
            v-if="info.sale_range"
            :form="form"
            :memberInfo="memberInfo"
            :saleRangeType="info.sale_range.type"
            @change="onMemberChange"
          ></member-search>
          <st-form-item label="规格" required v-if="info.price_model === 2">
            <a-radio-group
              v-decorator="decorators.coach_level"
              @change="changeSpeics"
            >
              <a-radio
                v-for="(item, index) in info.coach_level"
                :value="item.id"
                :key="index"
              >
                {{ item.name }}
              </a-radio>
            </a-radio-group>
          </st-form-item>
          <st-form-item required>
            <template slot="label">
              购买数量
              <st-help-tooltip id="TSSD002" />
            </template>
            <div :class="sale('contract')">
              <a-input-number
                class="input-number"
                :min="1"
                :max="9999"
                v-decorator="decorators.buyNum"
                placeholder="请输入购买数量"
                :disabled="isAmountDisabled"
              ></a-input-number>
              <st-button
                class="create-button"
                @click="onClickCourseAmount"
                :loading="loading.getPersonalPriceInfo"
                v-if="!isAmountDisabled"
              >
                确定
              </st-button>
              <st-button
                class="create-button"
                @click="onClickCourseEdit"
                v-else
              >
                编辑
              </st-button>
            </div>
          </st-form-item>
          <st-form-item label="单节价格" required v-if="info.sale_model === 1">
            <st-input-number
              :min="+personalPrice.min_sell_price || 0"
              :max="+personalPrice.max_sell_price || 0"
              v-decorator="decorators.coursePrice"
              :float="true"
              placeholder="请输入课程的价格"
              @blur="
                fetchCouponList()
                getOrderPrice()
                getPrice(null, null, null)
              "
            >
              <span slot="addonAfter">元</span>
            </st-input-number>
          </st-form-item>
          <st-form-item label="单节价格" v-if="info.sale_model === 2">
            <div>{{ personalPrice.sell_price || 0 }}元/节</div>
          </st-form-item>
          <st-form-item label="价格区间" v-if="info.sale_model === 1">
            <div>
              {{ personalPrice.min_sell_price || 0 }}元/节 ~
              {{ personalPrice.max_sell_price || 0 }}元/节
            </div>
          </st-form-item>
          <st-form-item label="到期时间">
            <div>
              {{
                moment()
                  .add(validEndTime, 'days')
                  .format('YYYY-MM-DD HH:mm')
              }}
            </div>
          </st-form-item>
          <st-form-item required>
            <template slot="label">
              合同编号
              <st-help-tooltip id="TSSD001" />
            </template>
            <div :class="sale('contract')">
              <a-input
                v-decorator="decorators.contractNumber"
                placeholder="请输入合同编号"
              ></a-input>
              <auto-contract-btn
                class="create-button"
                @click="onCodeNumber"
                :loading="loading.getCodeNumber"
              >
                自动生成
              </auto-contract-btn>
            </div>
          </st-form-item>
          <st-form-item :label="`上课${$c('coach')}`" required>
            <a-select
              v-decorator="decorators.coachId"
              :placeholder="`选择上课的${$c('coach')}`"
            >
              <a-select-option
                v-for="(item, index) in coachList"
                :key="index"
                :value="item.id"
              >
                {{ item.staff_name }}
              </a-select-option>
            </a-select>
          </st-form-item>
          <st-form-item label="购买赠送">
            <st-input-number
              v-decorator="decorators.gift_course_num"
              placeholder="请输入赠送的上课节数"
            ></st-input-number>
          </st-form-item>
          <st-form-item class="mg-b12" label="商品价格">
            {{ orderAmountPrice }}元
          </st-form-item>
          <st-form-item :class="sale('discounts')" label="优惠券">
            <div>
              <div :class="sale('discounts-total')">
                <span>{{ couponText }}</span>
                <a-dropdown
                  v-model="couponDropdownVisible"
                  :disabled="couponList.length === 0"
                  :class="sale({ disabled: couponList.length === 0 })"
                  placement="bottomRight"
                  :getPopupContainer="trigger => trigger.parentNode"
                  :trigger="['click']"
                >
                  <div :class="sale('discounts-promotion')">
                    <span>{{ couponList.length }}张可用优惠券</span>
                    <a-icon type="right" />
                  </div>
                  <a-radio-group
                    v-model="selectCoupon"
                    @change="onSelectCouponChange"
                    :class="sale('dropdown')"
                    slot="overlay"
                  >
                    <a-menu>
                      <a-menu-item
                        @click="onSelectCoupon"
                        :key="index"
                        v-for="(item, index) in couponList"
                      >
                        <a-radio :value="item">
                          {{ item.name }}{{ item.price }}
                        </a-radio>
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
                <span>{{ advanceText }}</span>
                <a-dropdown
                  v-model="advanceDropdownVisible"
                  :disabled="advanceList.length === 0"
                  :class="sale({ disabled: advanceList.length === 0 })"
                  placement="bottomRight"
                  :getPopupContainer="trigger => trigger.parentNode"
                  :trigger="['click']"
                >
                  <div :class="sale('discounts-promotion')">
                    <span>定金选择</span>
                    <a-icon type="right" />
                  </div>
                  <a-radio-group
                    v-model="selectAdvance"
                    @change="onSelectAdvanceChange"
                    :class="sale('dropdown')"
                    slot="overlay"
                  >
                    <a-menu>
                      <a-menu-item @click="onSelectAdvance">
                        <a-radio :value="undefined">不使用</a-radio>
                      </a-menu-item>
                      <a-menu-item
                        @click="onSelectAdvance"
                        :key="index"
                        v-for="(item, index) in advanceList"
                      >
                        <a-radio :value="item.id">
                          定金 {{ item.price }}
                        </a-radio>
                      </a-menu-item>
                    </a-menu>
                  </a-radio-group>
                </a-dropdown>
              </div>
            </div>
          </st-form-item>
          <st-form-item label="减免金额">
            <st-input-number
              v-model="reduceAmount"
              :float="true"
              placeholder="请输入"
            >
              <span slot="addonAfter">元</span>
            </st-input-number>
          </st-form-item>
          <st-form-item
            validateStatus="error"
            :help="orderAmountText"
            class="mg-b0"
            label="小计"
          >
            <span class="total">{{ priceInfo }}元</span>
          </st-form-item>
        </div>
        <div :class="sale('remarks')">
          <st-form-item label="销售人员" required>
            <a-select
              v-decorator="decorators.saleName"
              placeholder="选择签单的工作人员"
            >
              <a-select-option
                v-for="(item, index) in saleList"
                :key="index"
                :value="item.id"
              >
                {{ item.staff_name }}
              </a-select-option>
            </a-select>
          </st-form-item>
          <st-form-item label="备注" class="mg-b0">
            <st-textarea
              v-model="description"
              :autosize="{ minRows: 4, maxRows: 6 }"
              :maxlength="200"
            />
          </st-form-item>
        </div>
      </st-form>
    </div>
    <template slot="footer">
      <div :class="sale('footer')">
        <div class="price">
          <span>{{ priceInfo }}元</span>
          <span>订单总额：{{ orderAmountPrice }}元</span>
        </div>
        <div class="button">
          <st-button
            @click="onCreateOrder"
            :loading="loading.setTransactionOrder"
          >
            创建订单
          </st-button>
          <st-button
            @click="onPay"
            :loading="loading.setTransactionPay"
            type="primary"
          >
            立即支付
          </st-button>
        </div>
      </div>
    </template>
  </st-modal>
</template>

<script>
import { SalePersonalCourseService } from './sale-personal-course.service'
import moment from 'moment'
import { cloneDeep } from 'lodash-es'
import { timer } from 'rxjs'
import { PatternService } from '@/services/pattern.service'
import { ruleOptions } from './sale-personal-course.config'
import autoContractBtn from '@/views/biz-components/contract/auto-contract-btn.vue'
import MemberSearch from '@/views/biz-components/member-search/member-search'
export default {
  name: 'ModalSoldDealSaleMemberCard',
  bem: {
    sale: 'modal-sold-deal-sale'
  },
  components: {
    autoContractBtn,
    MemberSearch
  },
  serviceProviders() {
    return [SalePersonalCourseService]
  },
  serviceInject() {
    return {
      salePersonalCourseService: SalePersonalCourseService,
      pattern: PatternService
    }
  },
  rxState() {
    return {
      loading: this.salePersonalCourseService.loading$,
      info: this.salePersonalCourseService.info$,
      saleList: this.salePersonalCourseService.saleList$,
      couponList: this.salePersonalCourseService.couponList$,
      coachList: this.salePersonalCourseService.coachList$,
      personalPrice: this.salePersonalCourseService.personalPrice$,
      priceInfo: this.salePersonalCourseService.priceInfo$,
      orderAmountPrice: this.salePersonalCourseService.orderAmountPrice$
    }
  },
  props: {
    id: {
      type: String,
      required: true
    },
    memberInfo: {
      type: Object
    }
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      show: false,
      // 购买数量可编辑
      isAmountDisabled: false,
      // 最小输入购买数量
      minPrice: 0,
      // 到期有效时间
      validEndTime: 0,
      // 定金
      advanceDropdownVisible: false,
      advanceList: [],
      advanceText: '未选择定金',
      advanceAmount: '',
      selectAdvance: '',
      reduceAmount: null,
      description: '',
      // 优惠券
      selectCoupon: '',
      couponText: '未选择优惠券',
      couponAmount: '',
      couponDropdownVisible: false,
      // 购买数量处于编辑状态 提示语
      isAmountStateTip: ''
    }
  },
  watch: {
    selectCoupon: {
      deep: true,
      handler(newVal, oldVal) {
        this.getPrice(newVal, this.selectAdvance, +this.reduceAmount)
      }
    },
    selectAdvance: {
      deep: true,
      handler(newVal, oldVal) {
        this.getPrice(this.selectCoupon, newVal, +this.reduceAmount)
      }
    },
    reduceAmount(newVal, oldVal) {
      this.getPrice(this.selectCoupon, this.selectAdvance, +newVal)
    }
  },
  mounted() {
    this.salePersonalCourseService.serviceInit(this.id).subscribe(result => {
      setTimeout(() => {
        if (this.info.coach_level && this.info.coach_level.length > 0) {
          this.form.setFieldsValue({ coach_level: this.info.coach_level[0].id })
          this.minPrice = this.info.coach_level[0].min_sell
        }
        let level = 0
        if (this.info.price_model === 2) {
          level = this.info.coach_level[0].id
        }
        this.salePersonalCourseService.getCoachList(level, this.id).subscribe()
      })
    })
  },
  computed: {
    orderPersonalType() {
      // 1 教练平级 + 谈单模式 2 教练平级 + 统一标价 3 教练分级 + 谈单模式 4 教练分级 + 统一标价
      let personalCourseType = 1
      if (this.info.price_model === 1 && this.info.sale_model === 1) {
        personalCourseType = 1
      } else if (this.info.price_model === 1 && this.info.sale_model === 2) {
        personalCourseType = 2
      } else if (this.info.price_model === 2 && this.info.sale_model === 1) {
        personalCourseType = 3
      } else if (this.info.price_model === 2 && this.info.sale_model === 2) {
        personalCourseType = 4
      }
      return personalCourseType
    },
    orderAmountText() {
      return this.priceInfo < 0 ? '小计不能为负' : ''
    }
  },
  methods: {
    changeSpeics(event) {
      this.isAmountDisabled = false
      this.resetOrderInfo()
      const selectCoach = this.info.coach_level.filter(item => {
        return item.id === event.target.value
      })
      this.minPrice = selectCoach[0].min_sell
      this.salePersonalCourseService
        .getCoachList(selectCoach[0].id, this.id)
        .subscribe()
    },
    resetOrderInfo() {
      this.form.resetFields([
        'buyNum',
        'coachId',
        'coursePrice',
        'gift_course_num'
      ])
      this.personalPrice.sell_price = 0
      this.personalPrice.min_sell_price = 0
      this.personalPrice.max_sell_price = 0
      this.validEndTime = 0
      this.priceInfo = 0
      this.orderAmountPrice = 0
      this.reduceAmount = 0
      this.selectAdvance = ''
      this.selectCoupon = ''
      this.couponList = []
    },
    fetchCouponList(memberId) {
      const member_id = this.form.getFieldValue('member_id')
      const course_price = this.personalPrice.sell_price
      const buy_num = this.form.getFieldValue('buyNum')
      // if (member_id && course_price && buy_num) {
      const params = {
        member_id: memberId || member_id,
        course_id: this.id,
        price: course_price,
        buy_num: buy_num
      }
      this.salePersonalCourseService.getCouponList(params).subscribe()
      // }
    },
    moment,
    onMemberChange(data) {
      if (!data) {
        this.resetAdvance()
      } else {
        this.salePersonalCourseService.getAdvanceList(data).subscribe(res => {
          this.advanceList = cloneDeep(res.list)
        })
        this.fetchCouponList(data)
      }
    },
    onSelectAdvance() {
      timer(200).subscribe(() => {
        this.advanceDropdownVisible = false
      })
    },
    onSelectCoupon() {
      timer(200).subscribe(() => {
        this.couponDropdownVisible = false
      })
    },
    // 重置定金选择
    resetAdvance() {
      this.advanceList = []
      this.advanceText = '未选择定金'
    },
    onCodeNumber() {
      this.salePersonalCourseService
        .getCodeNumber(this.info.contract_type)
        .subscribe(res => {
          this.form.setFieldsValue({
            contractNumber: res.info.code
          })
        })
    },
    onCancel() {
      this.resetAdvance()
    },
    onSelectAdvanceChange(data) {
      if (!data.target.value) {
        this.advanceAmount = 0
        this.advanceText = `未选择定金`
        return
      }
      let price = this.advanceList.filter(o => o.id === data.target.value)[0]
        .price
      this.advanceAmount = price
      this.advanceText = `${price}元`
    },
    onSelectCouponChange(event) {
      let price = this.couponList.filter(o => o.id === event.target.value.id)[0]
        .price
      this.couponAmount = price
      this.couponText = `${price}元`
    },
    onClickCourseAmount() {
      const params = {
        id: this.id,
        buy_num: this.form.getFieldValue('buyNum'),
        coach_level_id: this.form.getFieldValue('coach_level') || 0 // 默认0 为没有等级，否则分级
      }
      this.salePersonalCourseService
        .getPersonalPriceInfo(params)
        .subscribe(result => {
          this.isAmountDisabled = true
          this.form.setFieldsValue({
            buyNum: params.buy_num
          })
          this.validEndTime = this.info.effective_unit * params.buy_num || 0
          // 调用优惠券列表
          this.fetchCouponList()
          // 调用获取商品原价
          if (
            this.info.sale_model === 1 &&
            !this.form.getFieldValue('coursePrice') &&
            this.form.getFieldValue('coursePrice') !== 0
          ) {
            return
          }
          this.getOrderPrice()
          this.getPrice(
            this.selectCoupon,
            this.selectAdvance,
            +this.reduceAmount
          )
        })
    },
    onClickCourseEdit() {
      const val = this.form.getFieldValue('buyNum')
      this.isAmountDisabled = false
      this.form.setFieldsValue({
        buyNum: val
      })
      this.form.validate(['buyNum'])
    },
    // 计算实付金额
    getPrice(coupon, advance, reduce) {
      let advanceId = advance === -1 ? '' : advance
      let special_amount = this.personalPrice.sell_price
      if (this.info.sale_model === 1) {
        special_amount = this.form.getFieldValue('coursePrice')
      }
      if (!special_amount) {
        return
      }
      const memberId = this.form.getFieldValue('member_id')
      this.salePersonalCourseService.priceAction$.dispatch({
        product_id: this.id,
        product_type: this.info.contract_type,
        product_num: this.form.getFieldValue('buyNum'),
        specs_id: this.form.getFieldValue('coach_level'),
        coupon_id: coupon ? coupon.id : undefined,
        member_id: memberId || undefined,
        advance_id: advanceId,
        reduce_amount: reduce,
        special_amount: +special_amount || 0
      })
    },
    // 获取订单总额
    getOrderPrice() {
      let special_amount = this.personalPrice.sell_price
      if (this.info.sale_model === 1) {
        special_amount = this.form.getFieldValue('coursePrice')
        if (!special_amount) {
          return
        }
      }
      this.salePersonalCourseService.orderAmountPriceAction$.dispatch({
        product_id: this.id,
        product_type: this.info.contract_type,
        product_num: this.form.getFieldValue('buyNum'),
        specs_id: this.form.getFieldValue('coach_level'),
        special_amount: +special_amount || 0
      })
    },
    onCreateOrder() {
      this.form.validate().then(values => {
        this.salePersonalCourseService
          .setTransactionOrder({
            member_id: values.member_id,
            member_name: values.member_name,
            mobile: values.mobile ? values.mobile.phone : undefined,
            course_id: this.id,
            contract_number: values.contractNumber,
            buy_num: values.buyNum,
            course_price:
              this.info.sale_model === 2
                ? this.personalPrice.sell_price
                : values.coursePrice,
            coupon_id: this.selectCoupon.id,
            advance_id: this.selectAdvance,
            reduce_amount: this.reduceAmount || 0,
            sale_id: values.saleName,
            description: this.description,
            gift_course_num: values.gift_course_num || 0,
            coach_id: values.coachId,
            coach_level_id: values.coach_level,
            sale_range: this.info.sale_range.type,
            order_amount: this.priceInfo,
            is_minors: values.is_minors,
            parent_name: values.parent_name,
            parent_mobile: values.parent_mobile
              ? values.parent_mobile.phone
              : undefined,
            parent_country_prefix: values.parent_mobile
              ? values.parent_mobile.code_id
              : undefined,
            parent_user_role: values.parent_user_role
          })
          .subscribe(result => {
            this.$emit('success', {
              type: 'create',
              orderId: result.info.order_id
            })
            this.show = false
          })
      })
    },
    onPay() {
      this.form.validate().then(values => {
        this.salePersonalCourseService
          .setTransactionPay({
            member_id: values.member_id,
            member_name: values.member_name,
            mobile: values.mobile ? values.mobile.phone : undefined,
            course_id: this.id,
            contract_number: values.contractNumber,
            buy_num: values.buyNum,
            course_price:
              this.info.sale_model === 2
                ? this.personalPrice.sell_price
                : values.coursePrice,
            coupon_id: this.selectCoupon.id,
            advance_id: this.selectAdvance,
            reduce_amount: this.reduceAmount || 0,
            sale_id: values.saleName,
            description: this.description,
            gift_course_num: values.gift_course_num || 0,
            coach_id: values.coachId,
            coach_level_id: values.coach_level,
            sale_range: this.info.sale_range.type,
            order_amount: this.priceInfo,
            is_minors: values.is_minors,
            parent_name: values.parent_name,
            parent_mobile: values.parent_mobile
              ? values.parent_mobile.phone
              : undefined,
            parent_country_prefix: values.parent_mobile
              ? values.parent_mobile.code_id
              : undefined,
            parent_user_role: values.parent_user_role
          })
          .subscribe(result => {
            this.$emit('success', {
              type: 'createPay',
              orderId: result.info.order_id
            })
            this.show = false
          })
      })
    }
  }
}
</script>
