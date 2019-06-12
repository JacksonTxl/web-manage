export const columns = [
  {
    title: '会员卡名称',
    dataIndex: 'card_name',
    scopedSlots: { customRender: 'card_name' }
  },
  {
    title: '类型',
    dataIndex: 'card_type.name'
  },
  {
    title: '有效期/有效次数',
    dataIndex: 'time_gradient'
  },
  {
    title: '支持入场门店',
    dataIndex: 'admission_range.name',
    scopedSlots: { customRender: 'admission_range.name' }
  },
  {
    title: '支持售卖门店',
    dataIndex: 'support_sales.name',
    scopedSlots: { customRender: 'support_sales.name' }
  },
  {
    title: '支持售卖时间',
    dataIndex: 'sell_time',
    scopedSlots: { customRender: 'sell_time' }
  },
  {
    title: '定价方式',
    dataIndex: 'price_setting.name'
  },
  {
    title: '售卖价格',
    dataIndex: 'price_gradient',
    scopedSlots: { customRender: 'price_gradient' }
  },
  {
    title: '上架门店数',
    dataIndex: 'shelf_upper',
    sorter: (a, b) => a.shelf_upper - b.shelf_upper
  },
  {
    title: '下架门店数',
    dataIndex: 'shelf_lower',
    sorter: (a, b) => a.shelf_lower - b.shelf_lower
  },

  {
    title: '发布渠道',
    dataIndex: 'publish_channel.name'
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
