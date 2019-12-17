import IconStoredOrder from '@/assets/img/shop/stored/data/icon-stored-order.png'
import IconStoredTransaction from '@/assets/img/shop/stored/data/icon-stored-transaction.png'
import IconStoredRevenue from '@/assets/img/shop/stored/data/icon-stored-revenue.png'
import IconStoredPassenger from '@/assets/img/shop/stored/data/icon-stored-passenger.png'
import topIconUser from '@/assets/img/shop/stored/data/icon_top_revenue.png'
import topIconOrder from '@/assets/img/shop/stored/data/icon_top_order.png'
import topIconGuest from '@/assets/img/shop/stored/data/icon_top_guest.png'
import topIconMember from '@/assets/img/shop/stored/data/icon_top_member.png'

export const headerTitleItem = [
  'total_price',
  'order_num',
  'trade_member_num',
  'per_ticket_sales'
]
export const headerInfo = [
  {
    icon: topIconUser,
    title: '营收金额(元)'
  },
  {
    icon: topIconOrder,
    title: '订单数(单)'
  },
  {
    icon: topIconMember,
    title: '营收金额(元)'
  },
  {
    icon: topIconGuest,
    title: '客单价(元)'
  }
]
export const wholeNav = [
  {
    icon: IconStoredRevenue,
    title: '营收金额(元)'
  },
  {
    icon: IconStoredOrder,
    title: '订单数(单)'
  },
  {
    icon: IconStoredTransaction,
    title: '交易会员数(人)'
  },
  {
    icon: IconStoredPassenger,
    title: '客单价(元)'
  }
]
export const moneyOeders = []
export const categoryRevenue = []
export const fieldNav = [
  'revenue_amount',
  'order_count',
  'transaction_member',
  'customer_price'
]
