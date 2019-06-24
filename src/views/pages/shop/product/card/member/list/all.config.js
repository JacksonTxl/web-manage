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
    title: '支持入场门店',
    dataIndex: 'admission_range',
    scopedSlots: { customRender: 'admission_range' }
  },
  {
    title: '支持售卖门店',
    dataIndex: 'support_sales',
    scopedSlots: { customRender: 'support_sales' }
  },
  {
    title: '支持售卖时间',
    dataIndex: 'sell_time',
    scopedSlots: { customRender: 'sell_time' }
  },
  {
    title: '定价方式',
    dataIndex: 'price_setting',
    scopedSlots: { customRender: 'price_setting' }
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
    title: '上架状态',
    dataIndex: 'shelf_status',
    scopedSlots: { customRender: 'shelf_status' }
  },
  {
    title: '售卖状态',
    dataIndex: 'sell_status',
    scopedSlots: { customRender: 'sell_status' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]
