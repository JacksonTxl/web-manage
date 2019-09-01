export const columns = () => {
  return [
    {
      title: '流水号',
      dataIndex: 'flow_id',
      scopedSlots: { customRender: 'flow_id' }
    },
    {
      title: '金额（元）',
      dataIndex: 'amount',
      scopedSlots: { customRender: 'amount' }
    },
    {
      title: '收银方式',
      dataIndex: 'pay_type',
      scopedSlots: { customRender: 'pay_type' }
    },
    {
      title: '类型',
      dataIndex: 'flow_type_name',
      scopedSlots: { customRender: 'flow_type_name' }
    },
    {
      title: '收款时间',
      dataIndex: 'flow_time',
      scopedSlots: { customRender: 'flow_time' }
    },
    {
      title: '操作人',
      dataIndex: 'operator_name',
      scopedSlots: { customRender: 'operator_name' }
    },
    {
      title: '备注',
      dataIndex: 'remark',
      scopedSlots: { customRender: 'remark' }
    },
    {
      title: '操作',
      dataIndex: 'action',
      scopedSlots: { customRender: 'action' }
    }
  ]
}
