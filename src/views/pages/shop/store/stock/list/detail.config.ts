export const detailColumns = [
  {
    title: '商品名称',
    dataIndex: 'product_name'
  },
  {
    title: '商品分类',
    dataIndex: 'category_name'
  },
  {
    title: '出入库类型',
    dataIndex: 'stock_flow',
    slots: { title: 'stock_flow' },
    scopedSlots: { customRender: 'stock_flow' }
  },
  {
    title: '出入库',
    dataIndex: 'change_amount'
  },
  {
    title: '剩余量',
    dataIndex: 'surplus_amount'
  },
  {
    title: '操作时间',
    dataIndex: 'operator_time'
  },
  {
    title: '操作人',
    dataIndex: 'operator_name'
  },
  {
    title: '备注',
    dataIndex: 'remark'
  }
]
