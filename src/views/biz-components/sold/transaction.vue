<template>
  <div></div>
</template>

<script>
import SoldDealGathering from '@/views/biz-modals/sold/deal/gathering'
import SoldDealSaleCabinet from '@/views/biz-modals/sold/deal/sale-cabinet'
import SoldDealSaleCourse from '@/views/biz-modals/sold/deal/sale-course'
import SoldDealSaleDepositCard from '@/views/biz-modals/sold/deal/sale-deposit-card'
import SoldDealSaleMemberCard from '@/views/biz-modals/sold/deal/sale-member-card'
import SoldDealSalePersonalCourse from '@/views/biz-modals/sold/deal/sale-personal-course'
import SoldDealGatheringTip from '@/views/biz-modals/sold/deal/gathering-tip'
import { PRODUCT_TYPE } from '@/constants/sold/transaction'
import { OssService } from '@/services/oss.service'
export default {
  name: 'SoldTransaction',
  props: {},
  modals: {
    SoldDealGathering,
    SoldDealSaleCabinet,
    SoldDealSaleCourse,
    SoldDealSaleDepositCard,
    SoldDealSaleMemberCard,
    SoldDealSalePersonalCourse,
    SoldDealGatheringTip
  },
  serviceInject() {
    return {
      ossService: OssService
    }
  },
  data() {
    return {
      PRODUCT_TYPE
    }
  },
  methods: {
    // 订单收款modal
    createdOrderPay(props) {
      return new Promise((resolve, reject) => {
        this.$modalRouter.push({
          name: 'sold-deal-gathering',
          props,
          on: {
            success: resolve
          }
        })
      })
    },
    // 订单收款回调
    async payCallBack(orderId, modalType, callBackType) {
      switch (callBackType) {
        case 'cancel':
          this.onSearch()
          break
        case 'pay':
          this.createdGatheringTip({
            message: '收款成功',
            order_id: orderId
          }).then(res => {
            this.tipCallBack(orderId, modalType, res.type)
          })
          break
      }
    },
    // 创建成功，提示框modal
    createdGatheringTip(props) {
      return new Promise((resolve, reject) => {
        this.$modalRouter.push({
          name: 'sold-deal-gathering-tip',
          props,
          on: {
            success: resolve
          }
        })
      })
    },
    // 提示框回调，gathering-tip
    async tipCallBack(orderId, modalType, callBackType) {
      switch (callBackType) {
        case 'cancel':
          this.$router.reload()
          break
        case 'Print':
          this.createdOrderPrint(orderId)
          break
        case 'ViewOrder':
          this.createdOrderViewOrder(orderId)
          break
        case 'Pay':
          this.createdOrderPay({ order_id: orderId, type: modalType }).then(
            res => {
              this.payCallBack(orderId, modalType, res.type)
            }
          )
          break
      }
    },
    /**
     * 交易签单，签单操作
     * @params order_id 订单id
     * @params product_type 签单类型
     * @params member_id 会员id
     * @params member_name 会员姓名
     * @params member_mobile 会员手机号
     */
    onTransaction(
      order_id,
      product_type,
      member_id,
      member_name,
      member_mobile
    ) {
      const record = {
        id: order_id,
        product_type,
        member_id,
        member_name,
        member_mobile
      }
      switch (record.product_type) {
        case this.PRODUCT_TYPE.MEMBER_CARD:
          this.onMember(record)
          break
        case this.PRODUCT_TYPE.DEPOSIT_CARD:
          this.onDeposit(record)
          break
        case this.PRODUCT_TYPE.PERSONAL_COURSE:
          this.onPersonalCourse(record)
          break
        case this.PRODUCT_TYPE.PACKAGE:
          this.onPackage(record)
          break
        case this.PRODUCT_TYPE.CABINET:
          this.onCabinet(record)
          break
      }
    },
    // 签单成功回调
    async saleCallBack(result, type) {
      if (result.type === 'create') {
        // 创建订单成功
        let props = {
          order_id: result.orderId,
          type,
          message: '订单创建成功',
          needPay: true
        }
        let orderSuccessRes = await this.createdGatheringTip(props)
        this.tipCallBack(result.orderId, type, orderSuccessRes.type)
      } else if (result.type === 'createPay') {
        // 创建订单成功 并且到支付页面
        let props = {
          order_id: result.orderId,
          type
        }
        let payOrderRes = await this.createdOrderPay(props)
        this.payCallBack(result.orderId, type, payOrderRes.type)
      }
    },
    // 会员卡签单
    onMember(record) {
      this.$modalRouter.push({
        name: 'sold-deal-sale-member-card',
        props: {
          id: `${record.id}`,
          memberInfo: {
            member_id: record.member_id,
            member_name: record.member_name,
            member_mobile: record.member_mobile
          }
        },
        on: {
          success: result => {
            this.saleCallBack(result, 'member')
          }
        }
      })
    },
    // 储值卡签单
    onDeposit(record) {
      this.$modalRouter.push({
        name: 'sold-deal-sale-deposit-card',
        props: {
          id: `${record.id}`,
          memberInfo: {
            member_id: record.member_id,
            member_name: record.member_name,
            member_mobile: record.member_mobile
          }
        },
        on: {
          success: result => {
            this.saleCallBack(result, 'deposit')
          }
        }
      })
    },
    // 储物柜签单
    onCabinet(record) {
      this.$modalRouter.push({
        name: 'sold-deal-sale-cabinet',
        props: {
          // 默认传0，因为没有选择具体的柜子
          id: '0',
          areaId: `${record.id}`,
          memberInfo: {
            member_id: record.member_id,
            member_name: record.member_name,
            member_mobile: record.member_mobile
          }
        },
        on: {
          success: result => {
            this.saleCallBack(result, 'cabinet_order')
          }
        }
      })
    },
    // 课程包签单
    onPackage(record) {
      this.$modalRouter.push({
        name: 'sold-deal-sale-course',
        props: {
          id: `${record.id}`,
          memberInfo: {
            member_id: record.member_id,
            member_name: record.member_name,
            member_mobile: record.member_mobile
          }
        },
        on: {
          success: result => {
            this.saleCallBack(result, 'package')
          }
        }
      })
    },
    // 私教课签单
    onPersonalCourse(record) {
      this.$modalRouter.push({
        name: 'sold-deal-sale-personal-course',
        props: {
          id: `${record.id}`,
          memberInfo: {
            member_id: record.member_id,
            member_name: record.member_name,
            member_mobile: record.member_mobile
          }
        },
        on: {
          success: result => {
            this.saleCallBack(result, 'personal')
          }
        }
      })
    },
    // 打印合同
    createdOrderPrint(order_id) {
      let url = `${
        window.location.origin
      }/extra/contract-preview?id=${order_id}`
      this.ossService.openNewTab(url)
    },
    // 查看订单
    createdOrderViewOrder(order_id) {
      this.$router.push({
        name: 'shop-finance-order-info-collection-details',
        query: {
          id: order_id
        }
      })
    }
  }
}
</script>
