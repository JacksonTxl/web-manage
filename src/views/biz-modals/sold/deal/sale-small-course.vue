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
              {{ info.course_name }}
            </st-info-item>
            <st-info-item label="商品类型">
              {{ info.type_name }}
            </st-info-item>
            <st-info-item label="开班时间">
              {{ courseBeginTime }}
            </st-info-item>
            <st-info-item label="开班条件">
              {{ info.num_min }}~{{ info.num_max }}人
            </st-info-item>
            <st-info-item label="上课方式">
              {{ info.course_type_name }}
            </st-info-item>
            <st-info-item label="报名人数">
              {{ info.buy_member_counts }}人
            </st-info-item>
          </st-info>
        </a-col>
        <a-col :span="11">
          <st-info>
            <st-info-item label="允许转让">{{ info.is_transfer }}</st-info-item>
            <st-info-item label="转让手续费">
              {{ info.transfer_fee }}
            </st-info-item>
            <st-info-item label="线上购买">{{ info.online_sale }}</st-info-item>
            <st-info-item label="售卖群体" v-if="info.sale_range">
              {{ info.sale_range.name }}
            </st-info-item>
            <st-info-item label="总课时">
              {{ info.course_times }}节
            </st-info-item>
            <st-info-item label="排课状态" v-if="info.has_schedule">
              {{ info.has_schedule.name }}
              <a
                v-if="info.has_schedule.status"
                :href="onViewCourseHref"
                target="_blank"
              >
                查看排期
              </a>
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
          <st-form-item required label="购买课时">
            <st-input-number
              placeholder="请输入购买课时"
              v-decorator="decorators.course_num"
              :disabled="isDisabledBuyNum"
              :max="amountMax"
              :min="amountMin"
            >
              <span slot="addonAfter">节</span>
            </st-input-number>
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
              placeholder="请输入减免金额"
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
import { SaleSmallCourseService } from './sale-small-course.service'
import moment from 'moment'
import { cloneDeep } from 'lodash-es'
import { timer } from 'rxjs'
import { PatternService } from '@/services/pattern.service'
import { ruleOptions } from './sale-small-course.config'
import { UserService } from '@/services/user.service'
import autoContractBtn from '@/views/biz-components/contract/auto-contract-btn.vue'
import MemberSearch from '@/views/biz-components/member-search/member-search'
import { COURSE_TYPE } from '@/constants/course/small-course'
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
    return [SaleSmallCourseService]
  },
  serviceInject() {
    return {
      saleSmallCourseService: SaleSmallCourseService,
      userService: UserService,
      pattern: PatternService
    }
  },
  rxState() {
    return {
      loading: this.saleSmallCourseService.loading$,
      info: this.saleSmallCourseService.info$,
      saleList: this.saleSmallCourseService.saleList$,
      couponList: this.saleSmallCourseService.couponList$,
      personalPrice: this.saleSmallCourseService.personalPrice$,
      priceInfo: this.saleSmallCourseService.priceInfo$,
      orderAmountPrice: this.saleSmallCourseService.orderAmountPrice$
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
      COURSE_TYPE,
      form,
      decorators,
      show: false,
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
      couponDropdownVisible: false
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
    this.saleSmallCourseService.serviceInit(this.id).subscribe(result => {
      this.getPrice()
      this.getOrderPrice()
      if (this.isDisabledBuyNum) {
        this.form.setFieldsValue({
          course_num: this.info.buy_num
        })
      }
    })
  },
  computed: {
    onViewCourseHref() {
      return `/shop/product/course/schedule/small-course?app_brand_id=${
        this.$searchQuery.app_brand_id
      }&app_shop_id=${this.$searchQuery.app_shop_id}&course_id=${this.id}`
    },
    courseBeginTime() {
      return (
        moment(this.info.course_begin_time * 1000).format('YYYY-MM-DD HH:MM') +
        '~' +
        moment(this.info.course_end_time * 1000).format('YYYY-MM-DD HH:MM')
      )
    },
    orderAmountText() {
      return this.priceInfo < 0 ? '小计不能为负' : ''
    },
    amountMax() {
      if (this.info.course_type === this.COURSE_TYPE.FIXED_COURSE) {
        return this.info.buy_num || 0
      }
      return this.info.num_max || 0
    },
    amountMin() {
      if (this.info.course_type === this.COURSE_TYPE.FIXED_COURSE) {
        return this.info.buy_num || 0
      }
      return this.info.num_min || 0
    },
    isDisabledBuyNum() {
      return this.info.course_type === this.COURSE_TYPE.FIXED_COURSE
    }
  },
  methods: {
    fetchCouponList(memberId) {
      const member_id = this.form.getFieldValue('member_id')
      const course_price = this.personalPrice.sell_price
      const buy_num = this.form.getFieldValue('buyNum')
      const params = {
        member_id: memberId || member_id,
        course_id: this.id,
        price: course_price,
        buy_num: buy_num
      }
      this.saleSmallCourseService.getCouponList(params).subscribe()
    },
    moment,
    onMemberChange(data) {
      if (!data) {
        this.resetAdvance()
      } else {
        this.saleSmallCourseService.getAdvanceList(data).subscribe(res => {
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
      this.saleSmallCourseService
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
    // 计算实付金额
    getPrice(coupon, advance, reduce) {
      let advanceId = advance === -1 ? '' : advance
      this.saleSmallCourseService.priceAction$.dispatch({
        product_id: this.id,
        product_type: this.info.contract_type,
        product_num: this.form.getFieldValue('course_num'),
        coupon_id: coupon ? coupon.id : undefined,
        advance_id: advanceId,
        reduce_amount: reduce,
        member_id: this.form.getFieldValue('member_id')
      })
    },
    // 获取订单总额
    getOrderPrice() {
      this.saleSmallCourseService.orderAmountPriceAction$.dispatch({
        product_id: this.id,
        product_type: this.info.contract_type,
        product_num: 0
      })
    },
    onCreateOrder() {
      this.form.validate().then(values => {
        this.saleSmallCourseService
          .setTransactionOrder({
            member_id: values.member_id,
            member_name: values.member_name,
            mobile: values.mobile ? values.mobile.phone : undefined,
            country_prefix: values.mobile ? values.mobile.code_id : undefined,
            small_course_id: this.id,
            course_num: values.buyNum,
            contract_number: values.contractNumber,
            coupon_id: this.selectCoupon.id,
            advance_id: this.selectAdvance,
            reduce_amount: this.reduceAmount || 0,
            sale_id: values.saleName,
            description: this.description,
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
        this.saleSmallCourseService
          .setTransactionPay({
            member_id: values.member_id,
            member_name: values.member_name,
            mobile: values.mobile ? values.mobile.phone : undefined,
            country_prefix: values.mobile ? values.mobile.code_id : undefined,
            small_course_id: this.id,
            course_num: values.buyNum,
            contract_number: values.contractNumber,
            coupon_id: this.selectCoupon.id,
            advance_id: this.selectAdvance,
            reduce_amount: this.reduceAmount || 0,
            sale_id: values.saleName,
            description: this.description,
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
