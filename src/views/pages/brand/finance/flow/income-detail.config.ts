export const columns = () => {
  return [
    {
      title: '流水号',
      dataIndex: 'flow_id'
    },
    {
      title: '金额（元）',
      dataIndex: 'price',
      scopedSlots: { customRender: 'price' },
      align: 'right'
    },
    {
      title: '收银方式',
      dataIndex: 'pay_channel'
    },
    {
      title: '收银门店',
      dataIndex: 'shop_name'
    },
    {
      title: '类型',
      dataIndex: 'flow_type',
      scopedSlots: { customRender: 'flow_type' }
    },
    {
      title: '创建时间',
      dataIndex: 'flow_time'
    },
    {
      title: '操作人',
      dataIndex: 'operator_name'
    },
    {
      title: '关联订单号',
      dataIndex: 'order_id'
    },
    {
      title: '备注',
      dataIndex: 'remark'
    },
    {
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
      width: 140,
      scopedSlots: { customRender: 'action' }
    }
  ]
}
