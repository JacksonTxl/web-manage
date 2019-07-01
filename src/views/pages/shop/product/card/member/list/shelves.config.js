export const columns = [
  {
    title: '会员卡名称',
    dataIndex: 'card_name',
    scopedSlots: { customRender: 'card_name' }
  },
  {
    title: '类型',
    dataIndex: 'card_type',
    scopedSlots: { customRender: 'card_type' }
  },
  {
    title: '有效期/有效次数',
    dataIndex: 'time_gradient',
    scopedSlots: { customRender: 'time_gradient' }
  },
  {
    title: '支持入场范围',
    dataIndex: 'admission_range',
    scopedSlots: { customRender: 'admission_range' }
  },
  {
    title: '售卖时间',
    dataIndex: 'sell_time',
    scopedSlots: { customRender: 'sell_time' }
  },
  {
    title: '售卖价格',
    dataIndex: 'price_gradient',
    scopedSlots: { customRender: 'price_gradient' }
  },
  {
    title: '发布渠道',
    dataIndex: 'publish_channel',
    scopedSlots: { customRender: 'publish_channel' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]
