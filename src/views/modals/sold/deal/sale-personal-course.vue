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
            <st-info-item label="商品名称">{{info.product_name}}</st-info-item>
            <st-info-item label="商品类型">{{info.product_type}}</st-info-item>
            <st-info-item label="时长">{{info.duration}}</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="11">
           <st-info>
            <st-info-item label="上课门店">{{info.shop_range}}</st-info-item>
            <st-info-item label="售卖群体" v-if="info.sale_range">{{info.sale_range.name}}</st-info-item>
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
            <p v-if="!memberList.length && memberSearchText !== '' && +info.sale_range.type === 1 " class="add-text">查无此会员，<span @click="onAddMember">添加新会员？</span></p>
          </st-form-item>
          <st-form-item v-show="!searchMemberIsShow" label="会员姓名" required>
            <a-input v-decorator="['memberName',{rules:[{validator:member_name_validator}]}]" placeholder="请输入会员姓名"></a-input>
          </st-form-item>
          <st-form-item  v-show="!searchMemberIsShow" label="手机号" required>
            <a-input v-decorator="['memberMobile',{rules:[{validator:member_mobile_validator}]}]" placeholder="请输入手机号"></a-input>
            <p class="add-text"><span @click="onCancelMember">取消添加</span></p>
          </st-form-item>
          <st-form-item label="规格" required v-if="info.price_model === 2">
            <a-radio-group v-decorator="['coach_level',{rules:[{validator: coach_level}]}]">
              <a-radio v-for="(item, index) in info.coach_level" :value="item.id" :key="index">{{item.name}}</a-radio>
            </a-radio-group>
          </st-form-item>
          <st-form-item label="购买数量" required>
            <div :class="sale('contract')">
              <a-input-number class="input-number"
              v-decorator="['buyNum',{rules:[{validator:buy_num}]}]"
              placeholder="请输入购买数量" :disabled="isAmountDisabled"></a-input-number>
              <st-button class="create-button" @click="onClickCourseAmount" :loading="loading.getPersonalPriceInfo" v-if="!isAmountDisabled">确定</st-button>
              <st-button class="create-button" @click="isAmountDisabled=false" v-else>编辑</st-button>
            </div>
          </st-form-item>
          <st-form-item label="单节价格" required v-if="info.sale_model === 1">
            <st-input-number v-decorator="['coursePrice',{rules:[{validator:course_price}]}]" :float="true" placeholder="请输入课程的价格" @blur="fetchCouponList">
              <span slot="addonAfter">元</span>
            </st-input-number>
          </st-form-item>
          <st-form-item label="单节价格" required v-if="info.sale_model === 2">
            <div>19元/节 ~ 25元/节</div>
          </st-form-item>
          <st-form-item label="价格区间" v-if="info.sale_model === 1">
            <div>19元/节 ~ 25元/节</div>
          </st-form-item>
          <st-form-item label="到期时间">
            <div>{{moment().format('YYYY-MM-DD hh:mm')}}</div>
          </st-form-item>
          <st-form-item label="合同编号" required>
            <div :class="sale('contract')">
              <a-input
              v-decorator="['contractNumber',{rules:[{validator:contract_number}]}]"
              placeholder="请输入合同编号"></a-input>
              <st-button class="create-button" @click="onCodeNumber" :loading="loading.getCodeNumber">自动生成</st-button>
            </div>
          </st-form-item>
          <st-form-item label="上课教练" required>
            <a-select
            v-decorator="['coachId',{rules:[{validator:coach_id}]}]"
            placeholder="选择上课的教练">
              <a-select-option
              v-for="(item,index) in coachList"
              :key="index"
              :value="item.id">{{item.staff_name}}</a-select-option>
            </a-select>
          </st-form-item>
          <st-form-item label="购买赠送" required>
            <st-input-number v-decorator="['gift_course_num',{rules:[]}]" placeholder="请输入赠送的上课节数"></st-input-number>
          </st-form-item>
          <st-form-item class="mgb-12" label="商品价格">{{info.sell_price}}元</st-form-item>
          <st-form-item :class="sale('discounts')" label="优惠券">
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
                    <span>{{couponList.length}}张可用优惠券</span>
                    <a-icon type="right" />
                  </div>
                  <a-radio-group v-model="selectCoupon" @change="onSelectCouponChange" :class="sale('dropdown')" slot="overlay">
                    <a-menu>
                      <a-menu-item @click="onSelectCoupon" :key="index" v-for="(item,index) in couponList">
                        <a-radio :value="item">{{item.name}}{{item.price}}</a-radio>
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
                    <span>定金选择</span>
                    <a-icon type="right" />
                  </div>
                  <a-radio-group v-model="selectAdvance" @change="onSelectAdvanceChange" :class="sale('dropdown')" slot="overlay">
                    <a-menu>
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
          <st-button @click="onPay" :loading="loading.setTransaction" type="primary">立即支付</st-button>
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
export default {
  name: 'ModalSoldDealSaleMemberCard',
  bem: {
    sale: 'modal-sold-deal-sale'
  },
  serviceInject() {
    return {
      salePersonalCourseService: SalePersonalCourseService
    }
  },
  rxState() {
    return {
      loading: this.salePersonalCourseService.loading$,
      memberList: this.salePersonalCourseService.memberList$,
      info: this.salePersonalCourseService.info$,
      saleList: this.salePersonalCourseService.saleList$,
      couponList: this.salePersonalCourseService.couponList$,
      coachList: this.salePersonalCourseService.coachList$,
      personalPrice: this.salePersonalCourseService.personalPrice$
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
      // 购买数量可编辑
      isAmountDisabled: false,
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
  created() {
    this.salePersonalCourseService.serviceInit(this.id).subscribe()
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
    orderAmount() {
      return (this.info.sell_price - this.reduceAmount - this.advanceAmount - this.couponAmount).toFixed(1)
    },
    orderAmountText() {
      return this.orderAmount < 0 ? '这里不能为负哦，找刚刚要文案' : ''
    }
  },
  methods: {
    fetchCouponList() {
      const member_id = this.form.getFieldValue('memberId')
      const course_price = this.form.getFieldValue('coursePrice')
      const buy_num = this.form.getFieldValue('buyNum')
      if (member_id && price && buy_num) {
        const params = {
          member_id: member_id,
          course_id: this.id,
          price: course_price,
          buy_num: buy_num
        }
        this.salePersonalCourseService.getCouponList(params).subscribe()
      }
    },
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
    buy_num(rule, value, callback) {
      if (!value) {
        // eslint-disable-next-line
        callback('请输入购买数量')
      } else {
        // eslint-disable-next-line
        callback()
      }
    },
    course_price(rule, value, callback) {
      if (!value) {
        // eslint-disable-next-line
        callback('请输入课程的单价')
      } else {
        // eslint-disable-next-line
        callback()
      }
    },
    coach_id(rule, value, callback) {
      if (!value) {
        // eslint-disable-next-line
        callback('请选择上课教练')
      } else {
        // eslint-disable-next-line
        callback()
      }
    },
    coach_level(rule, value, callback) {
      if (!value) {
        // eslint-disable-next-line
        callback('请选择教练等级')
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
        this.salePersonalCourseService.memberList$.commit(() => [])
        this.form.resetFields(['memberId'])
      } else {
        this.salePersonalCourseService.getMember(data).subscribe(res => {
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
        this.salePersonalCourseService.getAdvanceList(data).subscribe(res => {
          this.advanceList = cloneDeep(res.list)
        })
        this.fetchCouponList()
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
      this.salePersonalCourseService.getCodeNumber(this.info.contract_type).subscribe(res => {
        this.form.setFieldsValue({
          contractNumber: res.info.code
        })
      })
    },
    onCancel() {
      this.salePersonalCourseService.memberList$.commit(() => [])
      this.resetAdvance()
    },
    onSelectAdvanceChange(data) {
      let price = this.advanceList.filter(o => o.id === data.target.value)[0].price
      this.advanceAmount = price
      this.advanceText = `${price}元`
    },
    onSelectCouponChange(event) {
      let price = this.couponList.filter(o => o.id === event.target.value.id)[0].price
      this.couponAmount = price
      this.couponText = `${price}元`
    },
    onClickCourseAmount() {
      const params = {
        // id: this.id,
        id: 48587472437748,
        buy_num: this.form.getFieldValue('buyNum'),
        coach_level_id: this.form.getFieldValue('coach_level') || 0 // 默认0 为没有等级，否则分级
      }
      this.salePersonalCourseService.getPersonalPriceInfo(params).subscribe(result => {
        this.isAmountDisabled = true
      })
    },
    onCreateOrder() {
      this.form.validateFields((error, values) => {
        if (!error) {
          this.salePersonalCourseService.setTransactionOrder({
            'member_id': values.memberId,
            'member_name': values.memberName,
            'mobile': values.memberMobile,
            'course_id': this.id,
            'contract_number': values.contractNumber,
            'buy_num': values.buyNum,
            'course_price': values.buyNum,
            'coupon_id': this.selectCoupon.id,
            'advance_id': this.selectAdvance,
            'reduce_amount': this.reduceAmount,
            'sale_id': values.saleName,
            'description': this.description,
            'gift_course_num': values.gift_course_num,
            'coach_id': this.coachId,
            'coach_level_id': values.coach_level,
            'sale_range': this.info.sale_range.type,
            'order_amount': this.orderAmount
          }).subscribe((result) => {
            this.$emit('success', {
              type: 'create',
              order_id: result.info.order_id
            })
            this.show = false
          })
        }
      })
    },
    onPay() {
      this.form.validateFields((error, values) => {
        if (!error) {
          this.salePersonalCourseService.setTransactionPay({
            'member_id': values.memberId,
            'member_name': values.memberName,
            'mobile': values.memberMobile,
            'course_id': this.id,
            'contract_number': values.contractNumber,
            'buy_num': values.buyNum,
            'course_price': values.buyNum,
            'coupon_id': this.selectCoupon.id,
            'advance_id': this.selectAdvance,
            'reduce_amount': this.reduceAmount,
            'sale_id': values.saleName,
            'description': this.description,
            'gift_course_num': values.gift_course_num,
            'coach_id': this.coachId,
            'coach_level_id': values.coach_level,
            'sale_range': this.info.sale_range.type,
            'order_amount': this.orderAmount
          }).subscribe(() => {
            this.$emit('success', {
              type: 'createPay',
              order_id: result.info.order_id
            })
            this.show = false
          })
        }
      })
    }
  }
}
</script>
