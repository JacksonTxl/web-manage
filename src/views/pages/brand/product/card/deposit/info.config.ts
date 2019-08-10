// 门店表头
export const shop_columns = [
  {
    title: '省',
    dataIndex: 'province_name',
    width: '22%'
  },
  {
    title: '市',
    dataIndex: 'city_name',
    width: '22%'
  },
  {
    title: '区',
    dataIndex: 'district_name',
    width: '22%'
  },
  {
    title: '门店名称',
    dataIndex: 'shop_name',
    width: '34%'
  }
]

// 售卖定价表头
export const price_gradient_columns = [
  {
    title: '储值金额',
    scopedSlots: { customRender: 'card_price' },
    dataIndex: 'card_price'
  },
  {
    title: '售卖价格',
    scopedSlots: { customRender: 'sell_price' },
    dataIndex: 'sell_price'
  },
  {
    title: '有效期限',
    scopedSlots: { customRender: 'deadline' },
    dataIndex: 'deadline'
  }
]
