import SoldDealGatheringTip from '@/views/biz-modals/sold/deal/gathering-tip'
import SoldDealGathering from '@/views/biz-modals/sold/deal/gathering'
import SoldCourseSmallCourseTransfer from '@/views/biz-modals/sold/course/small-course/transfer'
import SoldCourseSmallCourseChange from '@/views/biz-modals/sold/course/small-course/change'
import SoldCourseSmallCourseRefund from '@/views/biz-modals/sold/course/small-course/refund'

const useSmallCourseActions = () => {
  return {
    modals: {
      SoldCourseSmallCourseTransfer,
      SoldCourseSmallCourseChange,
      SoldDealGatheringTip,
      SoldDealGathering,
      SoldCourseSmallCourseRefund
    },
    methods: {
      onTrasnfer(record) {
        this.$modalRouter.push({
          name: 'sold-course-small-course-transfer',
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
      onChangeSmallCourse(record) {
        this.$modalRouter.push({
          name: 'sold-course-small-course-change',
          props: {
            id: record.id
          },
          on: {
            success: async res => {
              if (res.type === 'create') {
                // 创建订单成功
                let props = {
                  order_id: res.orderId,
                  type: 'small_course',
                  message: '订单创建成功',
                  needPay: true
                }
                let orderSuccessRes = await this.createdGatheringTip(props)
                this.tipCallBack(
                  res.orderId,
                  'small_course',
                  orderSuccessRes.type
                )
              } else if (res.type === 'createPay') {
                // 创建订单成功 并且到支付页面
                let props = {
                  order_id: res.orderId,
                  type: 'small_course'
                }
                let payOrderRes = await this.createdOrderPay(props)
                this.payCallBack(res.orderId, 'small_course', payOrderRes.type)
              }
            }
          }
        })
      },
      onRefund(record) {
        this.$modalRouter.push({
          name: 'sold-course-small-course-refund',
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

export default useSmallCourseActions
