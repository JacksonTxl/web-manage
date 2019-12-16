export const columns = [
  {
    title: '活动名称',
    dataIndex: 'activity_name'
  },
  {
    title: '商品类型',
    dataIndex: 'product_type',
    scopedSlots: { customRender: 'product_type' }
  },
  {
    title: '支持门店',
    dataIndex: 'support_sales',
    scopedSlots: { customRender: 'support_sales' }
  },
  {
    title: '有效时间',
    dataIndex: 'activity_time'
  },
  {
    title: '活动状态',
    dataIndex: 'activity_state',
    scopedSlots: { customRender: 'activity_state' }
  },
  {
    title: '开团人次',
    dataIndex: 'group_total'
  },
  {
    title: '成团订单',
    dataIndex: 'group_success_total'
  },
  {
    title: '剩余活动库存',
    dataIndex: 'stock_remaining'
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 140,
    fixed: 'right',
    scopedSlots: { customRender: 'action' }
  }
]

export const shoplistcolumns = [
  {
    title: '省',
    dataIndex: 'province_name',
    width: '22%',
    scopedSlots: { customRender: 'province_name' }
  },
  {
    title: '市',
    width: '22%',
    dataIndex: 'city_name'
  },
  {
    title: '区',
    width: '22%',
    dataIndex: 'district_name'
  },
  {
    title: '门店名称',
    width: '34%',
    dataIndex: 'shop_name'
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 60,
    fixed: 'right',
    scopedSlots: { customRender: 'action' }
  }
]
