export const searchColumns = [
  {
    title: '商品名称',
    dataIndex: 'product_name',
    scopedSlots: { customRender: 'product_name' }
  },
  {
    title: '商品分类',
    dataIndex: 'category_name'
  },
  {
    title: '实际库存',
    dataIndex: 'amount'
  },
  {
    title: '可用库存',
    dataIndex: 'use_amount'
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 140,
    fixed: 'right',
    scopedSlots: { customRender: 'action' }
  }
]
