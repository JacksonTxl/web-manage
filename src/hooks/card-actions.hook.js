import SoldCardRenewalMember from '@/views/biz-modals/sold/card/renewal-member'
import SoldCardUpgradeMember from '@/views/biz-modals/sold/card/upgrade-member'
import SoldDealGatheringTip from '@/views/biz-modals/sold/deal/gathering-tip'
import SoldDealGathering from '@/views/biz-modals/sold/deal/gathering'
import SoldDealChangeMember from '@/views/biz-modals/sold/deal/change-member'

const useCardActions = () => {
  return {
    modals: {
      SoldCardRenewalMember,
      SoldCardUpgradeMember,
      SoldDealGatheringTip,
      SoldDealGathering,
      SoldDealChangeMember
    },
    methods: {
      upgradeCard(record) {
        this.$modalRouter.push({
          name: 'sold-card-upgrade-member',
          props: {
            id: record.id
          },
          on: {
            success: async res => {
              this.$emit('success')
              if (res.type === 'create') {
                // 创建订单成功
                let props = {
                  order_id: res.orderId,
                  type: 'member',
                  message: '订单创建成功',
                  needPay: true
                }
                let orderSuccessRes = await this.createdGatheringTip(props)
                this.tipCallBack(
                  res.orderId,
                  'member',
                  orderSuccessRes.type,
                  res.soldId,
                  res.isFamilyCard
                )
              } else if (res.type === 'createPay') {
                // 创建订单成功 并且到支付页面
                let props = {
                  order_id: res.orderId,
                  type: 'member'
                }
                let payOrderRes = await this.createdOrderPay(props)
                this.payCallBack(
                  res.orderId,
                  'member',
                  payOrderRes.type,
                  res.soldId,
                  res.isFamilyCard
                )
              }
            }
          }
        })
      },
      // 续卡
      onRenewal(record) {
        this.$modalRouter.push({
          name: 'sold-card-renewal-member',
          props: {
            id: record.id
          },
          on: {
            success: async res => {
              if (res.type === 'create') {
                // 创建订单成功
                let props = {
                  order_id: res.orderId,
                  type: 'member',
                  message: '订单创建成功',
                  needPay: true
                }
                let orderSuccessRes = await this.createdGatheringTip(props)
                this.tipCallBack(
                  res.orderId,
                  'member',
                  orderSuccessRes.type,
                  res.soldId,
                  res.isFamilyCard
                )
              } else if (res.type === 'createPay') {
                // 创建订单成功 并且到支付页面
                let props = {
                  order_id: res.orderId,
                  type: 'member'
                }
                let payOrderRes = await this.createdOrderPay(props)
                this.payCallBack(
                  res.orderId,
                  'member',
                  payOrderRes.type,
                  res.soldId,
                  res.isFamilyCard
                )
              }
            }
          }
        })
      },
      // 变更成员
      onChangeMember(record) {
        this.$modalRouter.push({
          name: 'sold-deal-change-member',
          props: {
            id: record.id
          },
          on: {
            success: () => {
              this.$emit('refresh')
            }
          }
        })
      },
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
      async payCallBack(
        orderId,
        modalType,
        callBackType,
        soldId,
        isFamilyCard
      ) {
        switch (callBackType) {
          case 'cancel':
            this.$emit('refresh')
            break
          case 'pay':
            this.createdGatheringTip({
              message: '收款成功',
              order_id: orderId,
              isFamilyCard
            }).then(res => {
              this.tipCallBack(orderId, modalType, res.type, soldId)
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
      async tipCallBack(
        orderId,
        modalType,
        callBackType,
        soldId,
        isFamilyCard
      ) {
        switch (callBackType) {
          case 'cancel':
            // this.$router.reload()
            this.$emit('refresh')
            break
          case 'Print':
            this.$emit('refresh')
            this.createdOrderPrint(orderId)
            break
          case 'PrintOrder':
            this.printOrder(orderId)
            break
          case 'ViewOrder':
            this.$emit('refresh')
            this.createdOrderViewOrder(orderId)
            break
          case 'Pay':
            this.createdOrderPay({ order_id: orderId, type: modalType }).then(
              res => {
                this.payCallBack(
                  orderId,
                  modalType,
                  res.type,
                  soldId,
                  isFamilyCard
                )
              }
            )
            break
          case 'ChangeMember':
            this.onChangeMember({
              id: soldId
            })
            break
        }
      },
      // 打印小票
      printOrder(order_id) {
        window.open(
          '/ticket/gathering-print?id=' + order_id,
          '_blank',
          'width=800,height=600'
        )
      },
      // 打印合同
      createdOrderPrint(order_id) {
        let url = `${
          window.location.origin
        }/common/contract-preview?id=${order_id}`
        window.open(url)
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
}

export default useCardActions
