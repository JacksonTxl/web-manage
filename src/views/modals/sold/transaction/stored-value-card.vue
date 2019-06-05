<template>
  <st-modal title="签单(储值卡)" size="small" v-model="show" wrapClassName="modal-sold-course-transfer">
    <div :class="transfer('content')">
      <a-row :class="transfer('info')">
        <a-col :span="13">
          <st-info>
            <st-info-item label="商品名称"></st-info-item>
            <st-info-item label="商品类型"></st-info-item>
            <st-info-item label="储值金额"></st-info-item>
            <st-info-item label="支持门店"></st-info-item>
            <st-info-item label="消费类目"></st-info-item>
            <st-info-item label="有效时间"></st-info-item>
          </st-info>
        </a-col>
        <a-col :span="11">
          <st-info>
            <st-info-item label="允许转让"></st-info-item>
            <st-info-item label="转让手续费"></st-info-item>
            <st-info-item label="线上购买"></st-info-item>
            <st-info-item label="售卖群体"></st-info-item>
          </st-info>
        </a-col>
      </a-row>
      <st-hr marginTop="0" marginBottom="0"/>
      <st-form :form="form" @ok="save" labelWidth="68px">
        <div :class="transfer('transfer')">
          <!--购买会员  -->
          <!-- <membershipName v-model="basicInfoRuleList"></membershipName> -->
          <!--规格  -->
          <!-- <specifications v-model="basicInfoRuleList"></specifications> -->
          <!--开卡方式  -->
          <!-- <cardOpeningMethod v-model="basicInfoRuleList"></cardOpeningMethod> -->
          <!--有效时间  -->
          <!-- <effectiveTime></effectiveTime> -->
          <!--购买赠送  -->
          <!-- <purchaseGift></purchaseGift> -->
          <!--合同编号  -->
          <!-- <contractNumber v-model="basicInfoRuleList" :form="form"></contractNumber> -->
          <!--商品价格  -->
          <!-- <commodityPrice></commodityPrice> -->
          <!--优惠券  -->
          <!-- <coupon></coupon> -->
          <!--定金抵扣  -->
          <!-- <depositDeduction></depositDeduction> -->
          <!--减免金额  -->
          <!-- <waiverAmount v-model="basicInfoRuleList"></waiverAmount> -->
          <!--小计  -->
          <!-- <subtotal></subtotal> -->
          <!-- 购买数量 -->
          <!-- <purchaseQuantity v-model="basicInfoRuleList"></purchaseQuantity> -->
          <!-- 单节价格 -->
          <!-- <singlePrice v-model="basicInfoRuleList"></singlePrice> -->
          <!-- 到期时间 -->
          <!-- <dueTime></dueTime> -->
          <!-- 上课教练 -->
          <!-- <coachInClass v-model="basicInfoRuleList"></coachInClass> -->
          <!-- 租赁柜号 -->
          <!-- <rentalCabinetNumber v-model="basicInfoRuleList"></rentalCabinetNumber> -->
          <!-- 租赁天数 -->
          <!-- <rentalDays></rentalDays> -->
          <!-- 租赁时间 -->
          <!-- <renewalTime v-model="basicInfoRuleList"></renewalTime> -->
          <component
            v-for="(item,index) in arrComponents"
            v-bind:is="item"
            :key="index"
            v-model="basicInfoRuleList"
            :form="form"
          ></component>
          <!-- 分割线 -->
          <st-hr marginTop="0" marginBottom="20"/>
          <!-- 销售人员 -->
          <salesman v-model="basicInfoRuleList"></salesman>
          <!-- 备注 -->
          <remarks v-model="basicInfoRuleList"></remarks>
        </div>
      </st-form>
    </div>
    <template slot="footer">
      <div :class="relet('footer')">
        <div class="price">
          <span>850元</span>
          <span>订单总额：900元</span>
        </div>
        <div class="button">
          <st-button @click="save" type="primary">创建订单</st-button>
          <st-button @click="save" type="primary">立即支付</st-button>
        </div>
      </div>
    </template>
  </st-modal>
</template>

<script>
/*
组件
*/
/* 购买会员 */
import membershipName from './components#/membership-name'
/* 规格 */
import specifications from './components#/specifications'
/* 开卡方式 */
import cardOpeningMethod from './components#/card-opening-method'
/* 有效时间 */
import effectiveTime from './components#/effective-time'
/* 购买赠送 */
import purchaseGift from './components#/purchase-gift'
/* 合同编号 */
import contractNumber from './components#/contract-number'
/* 商品价格 */
import commodityPrice from './components#/commodity-price'
/* 优惠券 */
import coupon from './components#/coupon'
/* 定金抵扣 */
import depositDeduction from './components#/deposit-deduction'
/* 减免金额 */
import waiverAmount from './components#/waiver-amount'
/* 小计 */
import subtotal from './components#/subtotal'
/* 销售人员 */
import salesman from './components#/salesman'
/* 备注 */
import remarks from './components#/remarks'
/* 购买数量 */
import purchaseQuantity from './components#/purchase-quantity'
/* 单节价格 */
import singlePrice from './components#/single-price'
/* 到期时间 */
import dueTime from './components#/due-time'
/* 上课教练 */
import coachInClass from './components#/coach-in-class'
/* 租赁柜号 */
import rentalCabinetNumber from './components#/rental-cabinet-number'
/* 租赁天数 */
import rentalDays from './components#/rental-days'
/* 租赁时间 */
import renewalTime from './components#/renewal-time'
/*
组件
*/
import { StoredValueCardService } from './stored-value-card.service'
export default {
  components: {
    specifications,
    membershipName,
    cardOpeningMethod,
    effectiveTime,
    purchaseGift,
    contractNumber,
    commodityPrice,
    coupon,
    depositDeduction,
    waiverAmount,
    subtotal,
    salesman,
    remarks,
    purchaseQuantity,
    singlePrice,
    dueTime,
    coachInClass,
    rentalCabinetNumber,
    rentalDays,
    renewalTime
  },
  serviceInject() {
    return {
      storedValueCardService: StoredValueCardService
    }
  },
  rxState() {
    return {
      storedCardInfo: this.storedValueCardService.storedCardInfo$,
      loading: this.storedValueCardService.loading$
    }
  },
  name: 'ModalStoredValueCard',
  bem: {
    transfer: 'modal-sold-course-transfer',
    relet: 'modal-sold-lease-relet'
  },

  props: ['id', 'type'],
  data() {
    return {
      basicInfoRuleList: {
        name: [
          'name',
          { rules: [{ required: true, message: '请填写会员名称' }] }
        ],
        test_time: ['test_time'],
        open_type: ['open_type'],
        contract_number: [
          'contract_number',
          {
            rules: [{ required: true, message: '请输入合同编号' }]
          }
        ],
        reduce_amount: ['reduce_amount'],
        sell_name: [
          'sell_name',
          { rules: [{ required: true, message: '请填写销售' }] }
        ],
        description: ['description'],
        num: ['num']
      },
      show: false,
      form: this.$form.createForm(this),
      arrComponents: [
        'membershipName',
        'dueTime',
        'contractNumber',
        'commodityPrice',
        'depositDeduction',
        'waiverAmount',
        'subtotal'
      ]
    }
  },
  created() {
    this.storedValueCardService.getStoredValueCardInfo('1558506832897').subscribe(() => {
      console.log(this.storedCardInfo)
    })
  },
  methods: {
    save() {
      this.form.validateFields((error, values) => {
        console.log(error, values)
        if (!error) {
        }
      })
    }
  }
}
</script>
