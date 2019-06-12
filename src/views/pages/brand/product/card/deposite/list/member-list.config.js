export const columns = [
  {
    title: '储值卡名称',
    dataIndex: 'card_name',
    scopedSlots: { customRender: 'card_name' }
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
    title: '支持售卖门店',
    dataIndex: 'support_sales.name',
    scopedSlots: { customRender: 'support_sales.name' }
  },
  {
    title: '支持消费门店',
    dataIndex: 'consumption_range.name',
    scopedSlots: { customRender: 'consumption_range.name' }
  },
  {
    title: '支持售卖时间',
    dataIndex: 'sell_time'
  },
  {
    title: '上架门店数',
    dataIndex: 'upper_shelf_num',
    sorter: (a, b) => a.upper_shelf_num - b.upper_shelf_num
  },
  {
    title: '下架门店数',
    dataIndex: 'lower_shelf_num',
    sorter: (a, b) => a.lower_shelf_num - b.lower_shelf_num
  },
  {
    title: '发布渠道',
    dataIndex: 'publish_channel.name',
    scopedSlots: { customRender: 'publish_channel.name' }
  },

  {
    title: '售卖状态',
    dataIndex: 'sell_status',
    scopedSlots: { customRender: 'sell_status' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    fixed: 'right',
    width: 140,
    scopedSlots: { customRender: 'action' }
  }
]
