export const columns = (vm: any) => {
  return [
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
}
