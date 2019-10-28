export const columns = () => [
  {
    title: '使用时间',
    dataIndex: 'usage_time'
  },
  {
    title: '使用详情',
    dataIndex: 'usage_detail',
    scopedSlots: { customRender: 'usage_detail' }
  },
  {
    title: '变更额度(元)',
    dataIndex: 'amount_change',
    scopedSlots: { customRender: 'amount_change' }
  },
  {
    title: '剩余额度(元)',
    dataIndex: 'remain_amount'
  },
  {
    title: '操作来源',
    dataIndex: 'operate_source_name'
  },
  {
    title: '操作人',
    dataIndex: 'operator_name'
  }
]
export const Daycolumns = () => [
  {
    title: '使用时间',
    dataIndex: 'usage_time'
  },
  {
    title: '使用详情',
    dataIndex: 'usage_detail',
    scopedSlots: { customRender: 'usage_detail' }
  },
  {
    title: '变更额度(天)',
    dataIndex: 'amount_change',
    scopedSlots: { customRender: 'amount_change' }
  },
  {
    title: '剩余额度(天)',
    dataIndex: 'remain_amount'
  },
  {
    title: '操作来源',
    dataIndex: 'operate_source_name'
  },
  {
    title: '操作人',
    dataIndex: 'operator_name'
  }
]
