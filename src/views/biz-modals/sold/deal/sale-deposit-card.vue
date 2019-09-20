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
              v-if="
                !memberList.length &&
                  memberSearchText !== '' &&
                  +info.sale_range.type === 1
              "
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
              <st-button
                class="create-button"
                @click="onCodeNumber"
                :loading="loading.getCodeNumber"
              >
                自动生成
              </st-button>
            </div>
          </st-form-item>
          <st-form-item class="mg-b12" label="商品价格">
            {{ info.sell_price }}元
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
                        <a-radio :value="-1">不使用</a-radio>
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
export default {
  name: 'ModalSoldDealSaleMemberCard',
  bem: {
    sale: 'modal-sold-deal-sale'
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
      memberList: this.saleDepositCardService.memberList$,
      priceInfo: this.saleDepositCardService.priceInfo$,
      info: this.saleDepositCardService.info$,
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
      if (this.memberInfo) {
        this.onMemberSearch(this.memberInfo.member_name)
      }
      this.getPrice(this.selectAdvance, +this.reduceAmount)
    })
  },
  computed: {
    orderAmountText() {
      return this.priceInfo < 0 ? '小计不能为负' : ''
    }
  },
  methods: {
    moment,
    // 搜索会员
    onMemberSearch(data) {
      this.memberSearchText = data
      if (data === '') {
        this.saleDepositCardService.memberList$.commit(() => [])
        this.form.resetFields(['memberId'])
      } else {
        this.saleDepositCardService
          .getMember(data, this.info.sale_range.type)
          .subscribe(res => {
            if (!res.list.length) {
              this.resetAdvance()
              this.form.resetFields(['memberId'])
            } else {
              if (this.memberInfo) {
                this.form.setFieldsValue({
                  memberId: this.memberInfo.member_id
                })
              }
            }
          })
      }
    },
    onMemberChange(data) {
      if (!data) {
        this.resetAdvance()
      } else {
        this.saleDepositCardService.getAdvanceList(data).subscribe(res => {
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
      this.saleDepositCardService
        .getCodeNumber(this.info.contract_type)
        .subscribe(res => {
          this.form.setFieldsValue({
            contractNumber: res.info.code
          })
        })
    },
    onCancel() {
      this.saleDepositCardService.resetMember()
      this.resetAdvance()
    },
    onSelectAdvanceChange(data) {
      if (data.target.value === -1) {
        this.advanceAmount = ''
        this.advanceText = '未选择定金'
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
      const memberId = this.form.getFieldValue('memberId')
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
            member_id: +values.memberId,
            member_name: values.memberName,
            mobile: values.memberMobile,
            deposit_card_id: +this.id,
            contract_number: values.contractNumber,
            advance_id:
              this.selectAdvance === -1 ? undefined : this.selectAdvance,
            reduce_amount,
            sale_id: +values.saleName,
            description: this.description,
            order_amount: this.priceInfo,
            sale_range: +this.info.sale_range.type
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
            member_id: +values.memberId,
            member_name: values.memberName,
            mobile: values.memberMobile,
            deposit_card_id: +this.id,
            contract_number: values.contractNumber,
            advance_id:
              this.selectAdvance === -1 ? undefined : this.selectAdvance,
            reduce_amount,
            sale_id: +values.saleName,
            description: this.description,
            order_amount: this.priceInfo,
            sale_range: +this.info.sale_range.type
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
