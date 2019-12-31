export const columns = (vm: any) => [
  {
    title: '商品名称',
    dataIndex: 'product_name'
  },
  {
    title: '可用库存',
    dataIndex: 'use_amount'
  },
  {
    title: vm.isOut ? '出库数' : '入库数',
    dataIndex: 'stock_amount',
    slots: { title: 'stock_amount' },
    scopedSlots: { customRender: 'stock_amount' }
  },
  {
    title: '备注',
    dataIndex: 'remark',
    slots: { title: 'remark' },
    scopedSlots: { customRender: 'remark' }
  }
]
