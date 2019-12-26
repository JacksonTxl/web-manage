export const searchColumns = [
  {
    title: '商品名称',
    dataIndex: 'product_name',
    align: 'left'
  },
  {
    title: '商品分类',
    dataIndex: 'category_name',
    align: 'left'
  },
  {
    title: '实际库存',
    dataIndex: 'amount',
    align: 'left'
  },
  {
    title: '可用库存',
    dataIndex: 'use_amount',
    align: 'left'
  },
  {
    title: '操作',
    dataIndex: 'action',
    align: 'left',
    width: 140,
    fixed: 'right',
    scopedSlots: { customRender: 'action' }
  }
]
