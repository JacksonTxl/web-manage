<template>
  <st-modal title="会员卡签单" size="small" v-model="show" wrapClassName="modal-sold-course-transfer">
    <div :class="transfer('content')">
      <a-row :class="transfer('info')">
        <a-col :span="13">
          <st-info>
            <st-info-item label="商品名称">{{cardInfo.card_name}}</st-info-item>
            <st-info-item label="商品类型">{{cardInfo.card_type ===1 ? '次卡':'期限卡'}}</st-info-item>
            <st-info-item
              :label="cardInfo.card_type === 1 ? '有效次数':'有效时间'"
            >{{emitData.price.num}}{{cardInfo.card_type === 1 ? '次':'天'}}</st-info-item>
            <st-info-item
              label="优惠赠送"
            >{{emitData.price.gift_unit}}{{cardInfo.card_type ===1 ? '次':'天'}}</st-info-item>
            <st-info-item label="开卡方式">{{cardInfo.open_type | openType}}</st-info-item>
            <st-info-item label="约课权益">{{cardInfo.course_interests |courseInterests}}</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="11">
          <st-info>
            <st-info-item label="允许转让">{{cardInfo.is_transfer ? '支持':'不支持'}}</st-info-item>
            <st-info-item label="转让手续费">{{cardInfo.num}}{{cardInfo.unit === 1 ? '%' :'元'}}</st-info-item>
            <st-info-item label="线上购买">{{cardInfo.is_online ? '支持':'不支持' }}</st-info-item>
            <st-info-item label="售卖群体">{{cardInfo.sale_range}}</st-info-item>
            <st-info-item label="入场场馆">{{cardInfo.admission_range}}</st-info-item>
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
            @filterChange="filterChange"
            :cardInfo="cardInfo"
            :emitData="emitData"
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
    <pre>{{emitData}}</pre>
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
import { MembershipCardService } from './membership-card.service'
export default {
  serviceInject() {
    return {
      membershipCardService: MembershipCardService
    }
  },

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
          {
            initialValue: 1,
            rules: [{ required: true, message: '请选择开卡方式' }]
          }
        ],
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
        num: ['num', { rules: [{ required: true, message: '请填写购买数量' }] }]
      },
      show: false,
      form: this.$form.createForm(this),
      arrComponents: [
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
      cardInfo: {},
      emitData: {
        price: {},
        open_type: '',
        effective_time: ''
      }
    }
  },
  filters: {
    courseInterests(type) {
      let arr = ['无', '全部团体课', '全部私教课', '指定课程', '全部课程']
      return arr[type - 1]
    },
    openType(value) {
      if (Array.isArray(value)) {
        let arr = ['即时开卡', '到店开卡', '指定日期开卡']
        return value
          .map(item => {
            return arr[item.open_type - 1]
          })
          .join(',')
      } else {
        return ''
      }
    }
  },
  created() {
    this.membershipCardService
      .getOrderTransactionMemberCard({ id: this.id })
      .subscribe(res => {
        this.cardInfo = res.info
        this.emitData.price = res.info.price[0]
        this.emitData.open_type = res.info.open_type[0].open_type
        this.basicInfoRuleList = {
          name: [
            'name',
            { rules: [{ required: true, message: '请填写会员名称' }] }
          ],
          test_time: [
            'test_time',
            {
              initialValue: 0,
              rules: [{ required: true, message: '请选择规格' }]
            }
          ],
          open_type: [
            'open_type',
            {
              initialValue: res.info.open_type[0].open_type,
              rules: [{ required: true, message: '请选择开卡方式' }]
            }
          ],
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
          num: [
            'num',
            { rules: [{ required: true, message: '请填写购买数量' }] }
          ]
        }
      })
  },
  methods: {
    filterChange(value) {
      console.log(value)
      if (value.open_type) {
        this.emitData.open_type = value.open_type
      }
      if (value.price) {
        this.emitData.price = value.price
      }
      if (value.effective_time) {
        this.emitData.effective_time = value.effective_time
      }
    },
    save() {
      let self = this
      this.form.validateFields((error, values) => {
        console.log(error, values)
        if (!error) {
          this.membershipCardService
            .getOrderTransactionMember()
            .subscribe(res => {
              console.log(res)
            })
          this.$modalRouter.push({
            name: 'sold-transaction-order-collection',
            props: {},
            on: {
              success() {
                that.$router.push({ force: true, query: that.query })
              }
            }
          })
          this.show = false
        }
      })
    }
  }
}
</script>
