export const detailColumns = [
  {
    title: '商品名称',
    dataIndex: 'product_name',
    align: 'center'
  },
  {
    title: '商品分类',
    dataIndex: 'category_name',
    align: 'center'
  },
  {
    title: '出入库类型',
    dataIndex: 'stock_flow',
    align: 'center',
    slots: { title: 'stock_flow' },
    scopedSlots: { customRender: 'stock_flow' }
  },
  {
    title: '出入库',
    dataIndex: 'change_amount',
    align: 'center'
  },
  {
    title: '剩余量',
    dataIndex: 'surplus_amount',
    align: 'center'
  },
  {
    title: '操作时间',
    dataIndex: 'operator_time',
    align: 'center'
  },
  {
    title: '操作人',
    dataIndex: 'operator_name',
    align: 'center'
  },
  {
    title: '备注',
    dataIndex: 'remark',
    align: 'center'
  }
]
