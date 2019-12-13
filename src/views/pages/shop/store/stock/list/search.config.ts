export const searchColumns = [
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
    title: '实际库存',
    dataIndex: 'amount',
    align: 'center'
  },
  {
    title: '可用库存',
    dataIndex: 'use_amount',
    align: 'center'
  },
  {
    title: '操作',
    dataIndex: 'action',
    align: 'center',
    width: 140,
    fixed: 'right',
    scopedSlots: { customRender: 'action' }
  }
]
