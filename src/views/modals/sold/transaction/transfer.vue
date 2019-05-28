<template>
  <st-modal title="签单" size="small" v-model="show" wrapClassName="modal-sold-course-transfer">
    <div :class="transfer('content')">
      <a-row :class="transfer('info')">
        <a-col :span="13">
          <st-info>
            <st-info-item label="课程名称"></st-info-item>
            <st-info-item label="到期日期"></st-info-item>
            <st-info-item label="实付金额"></st-info-item>
            <st-info-item label="转让手续费"></st-info-item>
            <st-info-item label="订单状态"></st-info-item>
          </st-info>
        </a-col>
        <a-col :span="11">
          <st-info>
            <st-info-item label="会员姓名"></st-info-item>
            <st-info-item label="手机号"></st-info-item>
            <st-info-item label="销售人员"></st-info-item>
            <st-info-item label="订单号"></st-info-item>
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
            v-for="(item,index) in type.length > 1 ? arrComponents[type[0]][type[1]] : arrComponents[type[0]]"
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
          <st-button @click="save" :loading="loading.editCoursePackageTransfer" type="primary">创建订单</st-button>
          <st-button @click="save" :loading="loading.editCoursePackageTransfer" type="primary">立即支付</st-button>
        </div>
      </div>
    </template>
  </st-modal>
</template>

<script>
import moment from 'moment'
import { TransferService } from './transfer.service'
import { UserService } from '@/services/user.service'
import { RuleConfig } from '@/constants/rule'
import { cloneDeep } from 'lodash-es'

/*
组件
*/
/* 购买会员 */
import membershipName from './membership-name'
/* 规格 */
import specifications from './specifications'
/* 开卡方式 */
import cardOpeningMethod from './card-opening-method'
/* 有效时间 */
import effectiveTime from './effective-time'
/* 购买赠送 */
import purchaseGift from './purchase-gift'
/* 合同编号 */
import contractNumber from './contract-number'
/* 商品价格 */
import commodityPrice from './commodity-price'
/* 优惠券 */
import coupon from './coupon'
/* 定金抵扣 */
import depositDeduction from './deposit-deduction'
/* 减免金额 */
import waiverAmount from './waiver-amount'
/* 小计 */
import subtotal from './subtotal'
/* 销售人员 */
import salesman from './salesman'
/* 备注 */
import remarks from './remarks'
/* 购买数量 */
import purchaseQuantity from './purchase-quantity'
/* 单节价格 */
import singlePrice from './single-price'
/* 到期时间 */
import dueTime from './due-time'
/* 上课教练 */
import coachInClass from './coach-in-class'
/* 租赁柜号 */
import rentalCabinetNumber from './rental-cabinet-number'
/* 租赁天数 */
import rentalDays from './rental-days'
/* 租赁时间 */
import renewalTime from './renewal-time'
/*
组件
*/
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
  name: 'ModalSoldCourseTransfer',
  bem: {
    transfer: 'modal-sold-course-transfer',
    relet: 'modal-sold-lease-relet'
  },
  serviceInject() {
    return {
      rules: RuleConfig,
      userService: UserService,
      transferService: TransferService
    }
  },
  rxState() {
    return {
      loading: this.transferService.loading$,
      memberList: this.transferService.memberList$,
      transferInfo: this.transferService.transferInfo$,
      timeScope: this.transferService.timeScope$,
      sold: this.userService.soldEnums$
    }
  },
  props: ['id', 'type'],
  data() {
    return {
      basicInfoRuleList: {
        name: [
          'name',
          { rules: [{ required: true, message: '请填写会员名称' }] }
        ],
        test_time: [
          'test_time',
          { rules: [{ required: true, message: '请选择规格' }] }
        ],
        open_type: [
          'open_type',
          { rules: [{ required: true, message: '请选择开卡方式' }] }
        ],
        contract_number: [
          'contract_number',
          {
            rules: [{ required: true, message: '请输入合同编号' }]
          }
        ],
        reduce_amount: [
          'reduce_amount'
          //  {
          //   rules: [{ required: true, message: '请输入减免金额' }]
          // }
        ],
        sell_name: [
          'sell_name',
          { rules: [{ required: true, message: '请填写销售' }] }
        ],
        description: ['description'],
        num: ['num', { rules: [{ required: true, message: '请填写购买数量' }] }]
      },
      show: false,
      form: this.$form.createForm(this),
      arrComponents: [
        [
          'membershipName',
          'specifications',
          'cardOpeningMethod',
          'effectiveTime',
          'purchaseGift',
          'contractNumber',
          'coupon',
          'depositDeduction',
          'waiverAmount',
          'subtotal'
        ],
        [
          'membershipName',
          'dueTime',
          'contractNumber',
          'commodityPrice',
          'depositDeduction',
          'waiverAmount',
          'subtotal'
        ],
        [
          [
            'membershipName',
            'purchaseQuantity',
            'singlePrice',
            'dueTime',
            'contractNumber',
            'coachInClass',
            'purchaseGift',
            'contractNumber',
            'coupon',
            'depositDeduction',
            'waiverAmount',
            'subtotal'
          ],
          [
            'membershipName',
            'purchaseQuantity',
            'singlePrice',
            'dueTime',
            'contractNumber',
            'coachInClass',
            'purchaseGift',
            'contractNumber',
            'coupon',
            'depositDeduction',
            'waiverAmount',
            'subtotal'
          ],
          [
            'membershipName',
            'specifications',
            'purchaseQuantity',
            'singlePrice',
            'dueTime',
            'contractNumber',
            'coachInClass',
            'purchaseGift',
            'contractNumber',
            'coupon',
            'depositDeduction',
            'waiverAmount',
            'subtotal'
          ],
          [
            'membershipName',
            'specifications',
            'purchaseQuantity',
            'singlePrice',
            'dueTime',
            'contractNumber',
            'coachInClass',
            'purchaseGift',
            'contractNumber',
            'coupon',
            'depositDeduction',
            'waiverAmount',
            'subtotal'
          ]
        ],
        [
          'membershipName',
          'dueTime',
          'contractNumber',
          'commodityPrice',
          'coupon',
          'depositDeduction',
          'waiverAmount',
          'subtotal'
        ],
        [
          'membershipName',
          'rentalCabinetNumber',
          'renewalTime',
          'rentalDays',
          'contractNumber',
          'commodityPrice',
          'depositDeduction',
          'waiverAmount',
          'subtotal'
        ]
      ]
    }
  },
  created() {},
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
