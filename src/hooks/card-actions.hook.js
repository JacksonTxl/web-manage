import SoldCardRenewalMember from '@/views/biz-modals/sold/card/renewal-member'
import SoldCardUpgradeMember from '@/views/biz-modals/sold/card/upgrade-member'
import SoldDealGatheringTip from '@/views/biz-modals/sold/deal/gathering-tip'
import SoldDealGathering from '@/views/biz-modals/sold/deal/gathering'

const useCardActions = () => {
  return {
    modals: {
      SoldCardRenewalMember,
      SoldCardUpgradeMember,
      SoldDealGatheringTip,
      SoldDealGathering
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
                this.tipCallBack(res.orderId, 'member', orderSuccessRes.type)
              } else if (res.type === 'createPay') {
                // 创建订单成功 并且到支付页面
                let props = {
                  order_id: res.orderId,
                  type: 'member'
                }
                let payOrderRes = await this.createdOrderPay(props)
                this.payCallBack(res.orderId, 'member', payOrderRes.type)
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
                this.tipCallBack(res.orderId, 'member', orderSuccessRes.type)
              } else if (res.type === 'createPay') {
                // 创建订单成功 并且到支付页面
                let props = {
                  order_id: res.orderId,
                  type: 'member'
                }
                let payOrderRes = await this.createdOrderPay(props)
                this.payCallBack(res.orderId, 'member', payOrderRes.type)
              }
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
      async payCallBack(orderId, modalType, callBackType) {
        switch (callBackType) {
          case 'cancel':
            // this.$router.reload()
            // this.onSearch()
            this.$emit('refresh')
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
            // this.$router.reload()
            this.$emit('refresh')
            break
          case 'Print':
            this.$emit('refresh')
            this.createdOrderPrint(orderId)
            break
          case 'ViewOrder':
            this.$emit('refresh')
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
