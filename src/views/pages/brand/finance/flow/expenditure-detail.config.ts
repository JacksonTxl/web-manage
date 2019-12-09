export const columns = () => {
  return [
    {
      title: '流水号',
      dataIndex: 'flow_id',
      width: 160,
      fixed: 'left'
    },
    {
      title: '金额（元）',
      dataIndex: 'price',
      scopedSlots: { customRender: 'price' },
      sorter: true
    },
    {
      title: '支付方式',
      dataIndex: 'pay_channel'
    },
    {
      title: '类型',
      dataIndex: 'flow_type',
      scopedSlots: { customRender: 'flow_type' }
    },
    {
      title: '退款时间',
      dataIndex: 'flow_time',
      sorter: true
    },
    {
      title: '操作人',
      dataIndex: 'operator_name'
    },
    {
      title: '关联订单号',
      dataIndex: 'order_id',
      scopedSlots: { customRender: 'member_name' }
    },
    {
      title: '备注',
      dataIndex: 'remark',
      scopedSlots: { customRender: 'remark' }
    }
  ]
}
