<template>
  <st-modal v-model="show" wrapClassName="modal-sold-deal-sale">
    <template slot="title">
      换班
      <st-help-tooltip id="TSMC002" placement="right" />
    </template>
    <div :class="sale('content')">
      <a-row :class="sale('info')">
        <a-col :span="13">
          <st-info>
            <st-info-item :label="`${$c('small_course')}名称`">
              {{ info.course_name }}
            </st-info-item>
            <st-info-item label="结束日期">
              {{ moment(info.end_time).format('YYYY-MM-DD HH:MM:SS') }}
            </st-info-item>
            <st-info-item label="实付金额">{{ info.pay_price }}元</st-info-item>
            <st-info-item label="转让手续费">
              {{ info.transfer_num
              }}{{
                info.transfer_unit | enumFilter('package_course.transfer_unit')
              }}
            </st-info-item>
            <st-info-item label="开班条件">
              {{ info.num_min }}~{{ info.num_max }}人
            </st-info-item>

            <st-info-item label="总课时">
              {{ info.course_times }}节
            </st-info-item>
            <st-info-item label="排课状态">
              {{ info.is_schedule }}
            </st-info-item>
          </st-info>
        </a-col>
        <a-col :span="11">
          <st-info>
            <st-info-item label="会员名称">{{ info.member_name }}</st-info-item>
            <template v-if="info.is_minors === PERSON_TYPE.CHILD">
              <st-info-item label="家长手机号">
                {{ info.parent_mobile }}
              </st-info-item>
              <st-info-item label="家长姓名">
                {{ info.parent_name }}({{ info.parent_user_role }})
              </st-info-item>
            </template>
            <st-info-item label="手机号" v-else>
              {{ info.mobile }}
            </st-info-item>
            <st-info-item label="销售人员">{{ info.staff_name }}</st-info-item>
            <st-info-item label="订单号">{{ info.order_id }}</st-info-item>
            <st-info-item label="订单状态">
              {{ info.order_status }}
            </st-info-item>
            <st-info-item label="上课方式">
              {{ info.course_type_name }}
            </st-info-item>
          </st-info>
        </a-col>
      </a-row>
      <st-form :form="form" labelWidth="100px">
        <div :class="sale('sale')">
          <st-form-item :label="$c('small_course')" required labelGutter="12px">
            <a-select
              showSearch
              allowClear
              :placeholder="`输入${$c('small_course')}名搜索`"
              :defaultActiveFirstOption="false"
              :showArrow="false"
              :filterOption="false"
              @change="onSelectCourseChange"
              v-decorator="decorators.course_id"
              @search="onSearch"
              notFoundContent="无搜索结果"
            >
              <a-select-option
                v-for="(item, index) in smallCourseList"
                :value="+item.course_id"
                :key="index"
              >
                {{ item.course_name }}
              </a-select-option>
            </a-select>
          </st-form-item>
          <st-form-item labelGutter="12px" label="购买课时" required>
            <st-input-number
              class="input-number"
              :min="selectItem.num_min"
              :max="selectItem.num_max"
              v-decorator="decorators.course_num"
              placeholder="请输入购买课时"
              :disabled="isAmountDisabled"
            >
              <div slot="addonAfter">
                节
              </div>
            </st-input-number>
          </st-form-item>
          <st-form-item labelGutter="12px" label="有效时间">
            {{ validTime }}
          </st-form-item>
          <st-form-item labelGutter="12px" required>
            <template slot="label">
              合同编号
              <st-help-tooltip id="TSSD001" />
            </template>
            <div :class="sale('contract')">
              <a-input
                v-decorator="decorators.contract_number"
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
          <st-form-item labelGutter="12px" class="mg-b12" label="商品价格">
            {{ priceInfo }}元
          </st-form-item>
          <st-form-item labelGutter="12px" required>
            <template slot="label">
              原小班课抵扣
              <st-help-tooltip id="TSMC003" />
            </template>
            <st-input-number
              @change="onSurplusPriceChange"
              v-decorator="decorators.old_course_price"
              :float="true"
              :max="+info.pay_price"
              placeholder="请输入原小班课可以抵扣的剩余价值金额"
            >
              <span slot="addonAfter">元</span>
            </st-input-number>
          </st-form-item>
          <st-form-item
            labelGutter="12px"
            :class="sale('discounts')"
            label="优惠金额"
          >
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
                    <span>
                      {{ couponList.length === 0 ? '无优惠券' : '优惠券选择' }}
                    </span>
                    <a-icon type="right" />
                  </div>
                  <a-radio-group
                    v-model="selectCoupon"
                    @change="onSelectCouponChange"
                    :class="sale('dropdown')"
                    slot="overlay"
                  >
                    <a-menu>
                      <a-menu-item @click="onSelectCoupon">
                        <a-radio :value="-1">不使用</a-radio>
                      </a-menu-item>
                      <a-menu-item
                        @click="onSelectCoupon"
                        :key="index"
                        v-for="(item, index) in couponList"
                      >
                        <a-radio :value="item.id">
                          {{ item.name }} {{ item.price }}
                        </a-radio>
                      </a-menu-item>
                    </a-menu>
                  </a-radio-group>
                </a-dropdown>
              </div>
            </div>
          </st-form-item>
          <st-form-item
            labelGutter="12px"
            :class="sale('discounts')"
            label="定金抵扣"
          >
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
          <st-form-item labelGutter="12px" label="减免金额">
            <st-input-number
              v-model="reduceAmount"
              :float="true"
              placeholder="请输入"
            >
              <span slot="addonAfter">元</span>
            </st-input-number>
          </st-form-item>
          <st-form-item
            labelGutter="12px"
            validateStatus="error"
            :help="orderAmountText"
            class="mg-b0"
            label="小计"
          >
            <span class="total">{{ priceInfo }}元</span>
          </st-form-item>
        </div>
        <div :class="sale('remarks')">
          <st-form-item labelGutter="12px" label="销售人员" required>
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
          <st-form-item labelGutter="12px" label="备注" class="mg-b0">
            <a-textarea
              v-model="description"
              :autosize="{ minRows: 4, maxRows: 6 }"
            />
          </st-form-item>
        </div>
      </st-form>
    </div>
    <template slot="footer">
      <div :class="sale('footer')">
        <div class="price">
          <span>{{ priceInfo }}元</span>
          <span>订单总额：{{ selectItem.course_price || 0 }}元</span>
        </div>
        <div class="button">
          <st-button @click="onCreateOrder" :loading="loading.upgrade">
            创建订单
          </st-button>
          <st-button
            @click="onPay"
            :loading="loading.upgradePay"
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
import { ChangeService } from './change.service'
import { cloneDeep } from 'lodash-es'
import { timer } from 'rxjs'
import { ruleOptions } from './change.config'
import autoContractBtn from '@/views/biz-components/contract/auto-contract-btn.vue'
import { PERSON_TYPE, COURSE_TYPE } from '@/constants/course/small-course'
import moment from 'moment'
export default {
  name: 'ModalSoldUpgradeMemberCard',
  bem: {
    sale: 'modal-sold-deal-sale'
  },
  components: {
    autoContractBtn
  },
  serviceProviders() {
    return [ChangeService]
  },
  serviceInject() {
    return {
      changeService: ChangeService
    }
  },
  rxState() {
    return {
      info: this.changeService.info$,
      smallCourseList: this.changeService.smallCourseList$,
      couponList: this.changeService.couponList$,
      advanceList: this.changeService.advanceList$,
      priceInfo: this.changeService.priceInfo$,
      saleList: this.changeService.saleList$,
      loading: this.changeService.loading$
    }
  },
  props: ['id'],
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      PERSON_TYPE,
      COURSE_TYPE,
      form,
      decorators,
      show: false,
      // 小班课列表
      smallCourseList: [],
      // 选择的卡
      selectItem: {},
      // 商品金额
      smallCoursePrice: '0',
      // 原小班课折扣
      surplusPrice: '',
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
      reduceAmount: '',
      // 描述
      description: ''
    }
  },
  computed: {
    isAmountDisabled() {
      // 1 固定排课 2自主排课
      return this.selectItem.course_type === this.COURSE_TYPE.FIXED_COURSE
    },
    validTime() {
      if (this.selectItem.course_begin_time) {
        return (
          this.selectItem.course_begin_time +
          '至' +
          this.selectItem.course_end_time
        )
      }
      return '无'
    },
    // 小计判断
    orderAmountText() {
      return this.priceInfo < 0 ? '小计不能为负' : ''
    },
    // 计算小计用
    priceOB() {
      return `${this.selectItem.course_id}-
              ${this.selectAdvance}-
              ${this.reduceAmount}-
              ${this.selectCoupon}-
              ${this.surplusPrice}`
    }
  },
  watch: {
    // 计算小计
    priceOB() {
      this.getPrice({
        product_id: this.selectItem.course_id,
        product_type: this.info.contract_type,
        advance_id: this.selectAdvance === -1 ? '' : this.selectAdvance,
        reduce_amount: +this.reduceAmount,
        coupon_id: this.selectCoupon === -1 ? '' : this.selectCoupon,
        member_id: +this.info.member_id,
        surplus_amount: +this.surplusPrice
      })
    }
  },
  created() {
    this.changeService.serviceInit(this.id).subscribe()
  },
  methods: {
    moment,
    // 搜索小班课
    onSearch(data) {
      if (data === '') {
        this.smallCourseList.commit(() => [])
      } else {
        this.changeService.getSmallCourseList(data).subscribe()
      }
    },
    // 重置规格/开卡方式/有效时间/商品金额/购买赠送/表单重置
    resetData() {
      // 商品金额
      this.coursePrice = '0'
      this.form.resetFields()
    },
    onSelectCourseChange(data) {
      if (data) {
        this.selectItem = this.smallCourseList.filter(
          item => item.course_id === data
        )[0]
        this.form.setFieldsValue({
          course_num: this.selectItem.buy_num
        })
      } else {
        // 清空
        this.selectItem = {}
        this.resetData()
      }
    },
    // 合同
    onCodeNumber() {
      this.changeService
        .getCodeNumber(`${this.info.contract_type}`)
        .subscribe(res => {
          this.form.setFieldsValue({
            contract_number: res.info.code
          })
        })
    },
    // 原卡折扣
    onSurplusPriceChange(data) {
      this.surplusPrice = data
    },
    // 优惠
    onSelectCouponChange(data) {
      if (data.target.value === -1) {
        this.couponAmount = ''
        this.couponText = '未选择优惠券'
        return
      }
      let price = this.couponList.filter(o => o.id === data.target.value)[0]
        .price
      this.couponAmount = price
      this.couponText = `${price}元`
    },
    onSelectCoupon() {
      timer(200).subscribe(() => {
        this.couponDropdownVisible = false
      })
    },
    resetCoupon() {
      this.changeService.resetCouponList()
      this.couponText = '未选择优惠券'
      this.couponAmount = ''
      this.selectCoupon = ''
    },
    // 定金
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
    onSelectAdvance() {
      timer(200).subscribe(() => {
        this.advanceDropdownVisible = false
      })
    },
    resetAdvance() {
      this.changeService.resetAdvanceList()
      this.advanceText = '未选择定金'
      this.advanceAmount = ''
      this.selectAdvance = ''
    },
    // 计算实付金额
    getPrice(params) {
      this.changeService.priceAction$.dispatch(params)
    },
    onCreateOrder() {
      this.form.validate().then(values => {
        this.changeService
          .changeSmallCourse(
            {
              course_id: values.course_id,
              course_num: values.course_num,
              contract_number: values.contract_number,
              old_course_price: +values.old_course_price,
              coupon_id: this.selectCoupon || undefined,
              advance_id: this.selectAdvance || undefined,
              reduce_price: +this.reduceAmount,
              order_price: +this.priceInfo,
              sales_id: +values.saleName,
              remarks: this.description
            },
            this.id
          )
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
        this.changeService
          .changeSmallCoursePay(
            {
              course_id: values.course_id,
              course_num: values.course_num,
              contract_number: values.contract_number,
              old_course_price: +values.old_course_price,
              coupon_id: this.selectCoupon || undefined,
              advance_id: this.selectAdvance || undefined,
              reduce_price: +this.reduceAmount,
              order_price: +this.priceInfo,
              sales_id: +values.saleName,
              remarks: this.description
            },
            this.id
          )
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
