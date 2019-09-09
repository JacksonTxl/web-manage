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
            <st-info-item label="商品类型" v-if="info.product_type">
              {{ info.product_type.name }}
            </st-info-item>
            <st-info-item label="有效时间">
              {{ selectedNorm.valid_time }}天
            </st-info-item>
            <st-info-item label="赠送上限">
              {{ selectedNorm.gift_max_name }}
            </st-info-item>
            <st-info-item label="约课权益">
              {{ info.course_interests }}
            </st-info-item>
          </st-info>
        </a-col>
        <a-col :span="11">
          <st-info>
            <st-info-item label="允许转让">{{ info.is_transfer }}</st-info-item>
            <st-info-item label="转让手续费">
              {{ info.transfer_fee }}
            </st-info-item>
            <st-info-item label="线上购买">{{ info.is_online }}</st-info-item>
            <st-info-item label="售卖群体" v-if="info.sale_range">
              {{ info.sale_range.name }}
            </st-info-item>
            <st-info-item label="入场场馆">
              {{ info.admission_range }}
            </st-info-item>
          </st-info>
        </a-col>
      </a-row>
      <st-form :form="form" labelWidth="88px">
        <div :class="sale('sale')">
          <st-form-item v-if="searchMemberIsShow" label="购买会员" required>
            <a-select
              showSearch
              allowClear
              placeholder="输入手机号或会员名搜索"
              :defaultActiveFirstOption="false"
              :showArrow="false"
              :filterOption="false"
              v-decorator="decorators.memberId"
              @search="onMemberSearch"
              @change="onMemberChange"
              notFoundContent="无搜索结果"
            >
              <a-select-option
                v-for="(item, index) in memberList"
                :value="item.id"
                :key="index"
              >
                <span
                  v-html="
                    `${item.member_name} ${item.mobile}`.replace(
                      new RegExp(memberSearchText, 'g'),
                      `\<span class='global-highlight-color'\>${memberSearchText}\<\/span\>`
                    )
                  "
                >
                  {{ item.member_name }} {{ item.mobile }}
                </span>
              </a-select-option>
            </a-select>
            <p
              v-if="!memberList.length && memberSearchText !== ''"
              class="add-text"
            >
              查无此会员，
              <span @click="onAddMember">添加新会员？</span>
            </p>
          </st-form-item>
          <st-form-item v-if="!searchMemberIsShow" label="会员姓名" required>
            <a-input
              v-decorator="decorators.memberName"
              placeholder="请输入会员姓名"
            ></a-input>
          </st-form-item>
          <st-form-item v-if="!searchMemberIsShow" label="手机号" required>
            <a-input
              v-decorator="decorators.memberMobile"
              placeholder="请输入手机号"
            ></a-input>
            <p class="add-text">
              <span @click="onCancelMember">取消添加</span>
            </p>
          </st-form-item>
          <st-form-item label="规格" required>
            <a-radio-group
              @change="onChangeSpecs"
              v-decorator="decorators.specs"
            >
              <a-radio
                v-for="(item, index) in info.specs"
                :value="item"
                :key="index"
              >
                {{ item.specs_name }}/{{ item.price }}
              </a-radio>
            </a-radio-group>
          </st-form-item>
          <st-form-item label="开卡方式" required>
            <a-radio-group
              @change="onChangePayment"
              v-decorator="decorators.open_type"
            >
              <a-radio
                v-for="(item, index) in info.open_type"
                :value="item"
                :key="index"
              >
                {{ item.open_type }}
              </a-radio>
            </a-radio-group>
          </st-form-item>
          <st-form-item label="有效时间">
            <div v-if="selectedPayment.id == 1">
              {{
                moment(validStartTime).format('YYYY-MM-DD HH:mm')
              }}&nbsp;至&nbsp;{{ validEndTime }}
            </div>
            <div v-if="selectedPayment.id == 2">
              {{ selectedPayment.automatic_num }}天内未开卡，则{{
                selectedPayment.automatic_num + 1
              }}天0：00自动开卡
            </div>
            <div v-if="selectedPayment.id == 3">
              <a-date-picker
                showTime
                v-model="validStartTime"
                format="YYYY-MM-DD HH:mm"
                placeholder="请选择开始时间"
                @change="onChangeTime"
              />
              至 {{ validEndTime }}
            </div>
          </st-form-item>
          <st-form-item label="购买赠送">
            <st-input-number
              :min="0"
              :max="selectedNorm.gift_max"
              placeholder="请输入赠送的天数/次数"
              style="width: 100%"
              v-model="gift_amount"
            >
              <span slot="addonAfter">{{ giftUnit }}</span>
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
              <st-button
                class="create-button"
                @click="onCodeNumber"
                :loading="loading.getCodeNumber"
              >
                自动生成
              </st-button>
            </div>
          </st-form-item>
          <st-form-item class="mgb-12" label="商品价格">
            {{ selectedNorm.price }}元
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
            <span class="total">{{ currentPrice }}元</span>
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
            <a-textarea
              v-model="description"
              :autosize="{ minRows: 4, maxRows: 6 }"
              :maxlength="30"
            />
          </st-form-item>
        </div>
      </st-form>
    </div>
    <template slot="footer">
      <div :class="sale('footer')">
        <div class="price">
          <span>{{ currentPrice }}元</span>
          <span>订单总额：{{ selectedNorm.price }}元</span>
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
import { SaleMemberCardService } from './sale-member-card.service'
import moment from 'moment'
import { cloneDeep } from 'lodash-es'
import { timer } from 'rxjs'
import { PatternService } from '@/services/pattern.service'
import { ruleOptions } from './sale-member-card.config'
export default {
  name: 'ModalSoldDealSaleMemberCard',
  bem: {
    sale: 'modal-sold-deal-sale'
  },
  serviceProviders() {
    return [SaleMemberCardService]
  },
  serviceInject() {
    return {
      saleMemberCardService: SaleMemberCardService,
      pattern: PatternService
    }
  },
  rxState() {
    return {
      loading: this.saleMemberCardService.loading$,
      memberList: this.saleMemberCardService.memberList$,
      info: this.saleMemberCardService.info$,
      saleList: this.saleMemberCardService.saleList$,
      couponList: this.saleMemberCardService.couponList$,
      currentPrice: this.saleMemberCardService.currentPrice$
    }
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      show: false,
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
      description: '',
      // 优惠券
      selectCoupon: '',
      couponText: '未选择优惠券',
      couponAmount: '',
      couponDropdownVisible: false,
      // 规格选项
      selectedNorm: '',
      // 开卡方式选择
      selectedPayment: '',
      // 会员卡结束日期
      validStartTime: moment(),
      validEndTime: '',
      // 赠送天数
      gift_amount: 0
    }
  },
  mounted() {
    this.saleMemberCardService.serviceInit(this.id).subscribe(result => {
      this.selectedNorm = this.info.specs[0]
      this.selectedPayment = this.info.open_type[0]
      this.form.setFieldsValue({
        specs: this.selectedNorm,
        open_type: this.selectedPayment
      })
      this.validStartTime = moment()
      this.validEndTime = moment()
        .add(this.selectedNorm.valid_time, 'days')
        .format('YYYY-MM-DD HH:mm')
      this.fetchCouponList()
      this.getPrice()
    })
  },
  computed: {
    orderAmountText() {
      return this.currentPrice < 0 ? '小计不能为负' : ''
    },
    giftUnit() {
      let unit = '天'
      if (this.info.product_type && this.info.product_type.id === 1) {
        unit = '次'
      }
      return unit
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
  methods: {
    // 规格发生改变
    onChangeSpecs(event) {
      this.selectedNorm = event.target.value
      this.fetchCouponList()
      this.gift_amount = ''
      this.getPrice(this.selectCoupon, this.selectAdvance, +this.reduceAmount)
      this.validEndTime = moment(this.validStartTime)
        .add(event.target.value.valid_time, 'days')
        .format('YYYY-MM-DD HH:mm')
    },
    // 开卡方式发生改变
    onChangePayment(event) {
      this.selectedPayment = event.target.value
      if (this.selectedPayment.id !== 2) {
        this.validStartTime = moment().format('YYYY-MM-DD HH:mm')
        this.validEndTime = moment()
          .add(this.selectedNorm.valid_time, 'days')
          .format('YYYY-MM-DD HH:mm')
      }
      this.fetchCouponList()
    },
    fetchCouponList(memberId) {
      if (this.selectedNorm && this.selectedPayment) {
        const params = {
          member_id: memberId || this.form.getFieldValue('memberId'),
          card_id: this.info.id,
          specs_id: this.selectedNorm.id
        }
        this.saleMemberCardService.getCouponList(params).subscribe()
      }
    },
    // 选择指定日期开卡
    onChangeTime(event) {
      if (event) {
        this.validEndTime = moment(event._d)
          .add(this.selectedNorm.valid_time, 'days')
          .format('YYYY-MM-DD HH:mm')
      }
    },
    moment,
    // 搜索会员
    onMemberSearch(data) {
      this.memberSearchText = data
      if (data === '') {
        this.saleMemberCardService.memberList$.commit(() => [])
        this.form.resetFields(['memberId'])
      } else {
        this.saleMemberCardService
          .getMember(data, this.info.sale_range.type)
          .subscribe(res => {
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
        this.saleMemberCardService.getAdvanceList(data).subscribe(res => {
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
      this.saleMemberCardService
        .getCodeNumber(this.info.contract_type)
        .subscribe(res => {
          this.form.setFieldsValue({
            contractNumber: res.info.code
          })
        })
    },
    onCancel() {
      this.saleMemberCardService.memberList$.commit(() => [])
      this.resetAdvance()
    },
    onSelectAdvanceChange(data) {
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
      const memberId = this.form.getFieldValue('memberId')
      this.saleMemberCardService.currentPriceAction$.dispatch({
        product_id: this.id,
        product_type: this.info.contract_type,
        coupon_id: coupon ? coupon.id : undefined,
        member_id: memberId || undefined,
        advance_id: advance || undefined,
        reduce_amount: reduce || undefined,
        specs_id: this.selectedNorm.id
      })
    },
    onCreateOrder() {
      this.form.validate().then(values => {
        this.saleMemberCardService
          .setTransactionOrder({
            member_id: values.memberId,
            member_name: values.memberName,
            mobile: values.memberMobile,
            product_id: this.id,
            contract_number: values.contractNumber,
            specs_id: values.specs.id,
            open_card_type: values.open_type.id,
            valid_start_time: moment(this.validStartTime).format(
              'YYYY-MM-DD HH:mm'
            ),
            coupon_id: this.selectCoupon.id,
            advance_id: this.selectAdvance,
            gift_amount: this.gift_amount || 0,
            reduce_amount: this.reduceAmount || 0,
            sale_id: values.saleName,
            description: this.description,
            sale_range: this.info.sale_range.type,
            order_amount: this.currentPrice
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
        this.saleMemberCardService
          .setTransactionPay({
            member_id: values.memberId,
            member_name: values.memberName,
            mobile: values.memberMobile,
            product_id: this.id,
            contract_number: values.contractNumber,
            specs_id: values.specs.id,
            open_card_type: values.open_type.id,
            valid_start_time: moment(this.validStartTime).format(
              'YYYY-MM-DD HH:mm'
            ),
            coupon_id: this.selectCoupon.id,
            advance_id: this.selectAdvance,
            gift_amount: this.gift_amount || 0,
            reduce_amount: this.reduceAmount || 0,
            sale_id: values.saleName,
            description: this.description,
            sale_range: this.info.sale_range.type,
            order_amount: this.currentPrice
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
