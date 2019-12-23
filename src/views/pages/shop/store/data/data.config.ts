import IconStoreOrder from '@/assets/img/shop/store/data/icon-store-order.png'
import IconStoreTransaction from '@/assets/img/shop/store/data/icon-store-transaction.png'
import IconStoreRevenue from '@/assets/img/shop/store/data/icon-store-revenue.png'
import IconStorePassenger from '@/assets/img/shop/store/data/icon-store-passenger.png'
import topIconUser from '@/assets/img/shop/store/data/icon_top_revenue.png'
import topIconOrder from '@/assets/img/shop/store/data/icon_top_order.png'
import topIconGuest from '@/assets/img/shop/store/data/icon_top_guest.png'
import topIconMember from '@/assets/img/shop/store/data/icon_top_member.png'

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
    title: '交易会员数(人)'
  },
  {
    icon: topIconGuest,
    title: '客单价(元)'
  }
]
export const wholeNav = [
  {
    icon: IconStoreRevenue,
    title: '营收金额(元)'
  },
  {
    icon: IconStoreOrder,
    title: '订单数(单)'
  },
  {
    icon: IconStoreTransaction,
    title: '交易会员数(人)'
  },
  {
    icon: IconStorePassenger,
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
