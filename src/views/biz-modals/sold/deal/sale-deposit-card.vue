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
            <st-info-item label="消费门店">
              {{ info.support_shop }}
            </st-info-item>
            <st-info-item label="消费类目">
              {{ info.consume_product }}
            </st-info-item>
            <st-info-item class="mg-b24" label="有效时间">
              {{ info.valid_time }}天
            </st-info-item>
          </st-info>
        </a-col>
        <a-col :span="11">
          <st-info>
            <st-info-item label="允许转让">{{ info.is_transfer }}</st-info-item>
            <st-info-item label="转让手续费">
              {{ info.transfer_fee }}
            </st-info-item>
            <st-info-item label="储值金额">{{ info.card_price }}</st-info-item>
            <st-info-item label="线上购买">{{ info.online_sale }}</st-info-item>
            <st-info-item
              class="mg-b24"
              label="售卖群体"
              v-if="info.sale_range"
            >
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
          <st-form-item label="到期时间">
            {{
              moment()
                .add(info.valid_time, 'd')
                .format('YYYY-MM-DD HH:mm')
            }}
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
            {{ info.sell_price }}元
          </st-form-item>
          <!-- NOTE: 功能没有实现完全所以先去掉 -->
          <!-- <st-form-item :class="sale('discounts')" label="优惠券">
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
          </st-form-item> -->
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
                    <span>
                      {{ advanceList.length === 0 ? '无定金' : '定金选择' }}
                    </span>
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
          <span>订单总额：{{ info.sell_price }}元</span>
        </div>
        <div class="button">
          <st-button @click="onCreateOrder" :loading="loading.setTransaction">
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
import { SaleDepositCardService } from './sale-deposit-card.service'
import moment from 'moment'
import { cloneDeep } from 'lodash-es'
import { timer } from 'rxjs'
import { PatternService } from '@/services/pattern.service'
import { ruleOptions } from './sale-cabinet.config'
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
    return [SaleDepositCardService]
  },
  serviceInject() {
    return {
      saleDepositCardService: SaleDepositCardService,
      pattern: PatternService
    }
  },
  rxState() {
    return {
      loading: this.saleDepositCardService.loading$,
      priceInfo: this.saleDepositCardService.priceInfo$,
      info: this.saleDepositCardService.info$,
      couponList: this.saleDepositCardService.couponList$,
      saleList: this.saleDepositCardService.saleList$
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
  created() {
    this.saleDepositCardService.serviceInit(this.id).subscribe(res => {
      this.getPrice(this.selectAdvance, +this.reduceAmount)
      this.fetchCouponList()
    })
  },
  computed: {
    orderAmountText() {
      return this.priceInfo < 0 ? '小计不能为负' : ''
    }
  },
  methods: {
    moment,
    fetchCouponList(memberId) {
      const params = {
        member_id: memberId || this.form.getFieldValue('member_id'),
        card_id: this.info.product_id
      }
      this.saleDepositCardService.getCouponList(params).subscribe()
    },
    onMemberChange(data) {
      if (!data) {
        this.resetAdvance()
      } else {
        this.saleDepositCardService.getAdvanceList(data).subscribe(res => {
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
    onSelectCouponChange(event) {
      let price = this.couponList.filter(o => o.id === event.target.value.id)[0]
        .price
      this.couponAmount = price
      this.couponText = `${price}元`
    },
    // 重置定金选择
    resetAdvance() {
      this.advanceList = []
      this.advanceText = '未选择定金'
      this.advanceAmount = ''
      this.selectAdvance = ''
    },
    onCodeNumber() {
      this.saleDepositCardService
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
    // 计算实付金额
    getPrice(advance, reduce) {
      let advanceId = advance === -1 ? '' : advance
      const memberId = this.form.getFieldValue('member_id')
      this.saleDepositCardService.priceAction$.dispatch({
        product_id: this.id,
        product_type: this.info.contract_type,
        advance_id: advanceId,
        member_id: memberId || undefined,
        reduce_amount: reduce
      })
    },
    onCreateOrder() {
      this.form.validate().then(values => {
        let reduce_amount = this.reduceAmount ? +this.reduceAmount : 0
        this.saleDepositCardService
          .setTransaction({
            member_id: +values.member_id,
            member_name: values.member_name,
            mobile: values.mobile ? values.mobile.phone : undefined,
            deposit_card_id: +this.id,
            contract_number: values.contractNumber,
            advance_id:
              this.selectAdvance === -1 ? undefined : this.selectAdvance,
            reduce_amount,
            sale_id: +values.saleName,
            description: this.description,
            order_amount: this.priceInfo,
            sale_range: +this.info.sale_range.type,
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
          .subscribe(res => {
            this.show = false
            this.$emit('success', {
              type: 'create',
              orderId: res.info.order_id
            })
          })
      })
    },
    onPay() {
      this.form.validate().then(values => {
        let reduce_amount = this.reduceAmount ? +this.reduceAmount : 0
        this.saleDepositCardService
          .setTransactionPay({
            member_id: +values.member_id,
            member_name: values.member_name,
            mobile: values.mobile ? values.mobile.phone : undefined,
            deposit_card_id: +this.id,
            contract_number: values.contractNumber,
            advance_id:
              this.selectAdvance === -1 ? undefined : this.selectAdvance,
            reduce_amount,
            sale_id: +values.saleName,
            description: this.description,
            order_amount: this.priceInfo,
            sale_range: +this.info.sale_range.type,
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
          .subscribe(res => {
            this.show = false
            this.$emit('success', {
              type: 'createPay',
              orderId: res.info.order_id
            })
          })
      })
    }
  }
}
</script>
