export const columns = [
  {
    title: '储值卡名称',
    dataIndex: 'card_name',
    scopedSlots: { customRender: 'shop_name' }
  },
  {
    title: '有效期',
    dataIndex: 'num',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '储值金额',
    dataIndex: 'card_price',
    sorter: (a, b) => a.card_price - b.card_price
  },
  {
    title: '售卖价格',
    dataIndex: 'sell_price',
    sorter: (a, b) => a.sell_price - b.sell_price
  },
  {
    title: '支持消费门店',
    dataIndex: 'consumption_range.name',
    scopedSlots: { customRender: 'consumption_range.name' }
  },
  {
    title: '发布渠道',
    dataIndex: 'publish_channel.name',
    scopedSlots: { customRender: 'publish_channel.name' }
  },

  {
    title: '操作',
    dataIndex: 'action',
    fixed: 'right',
    width: 110,
    scopedSlots: { customRender: 'action' }
  }
]
