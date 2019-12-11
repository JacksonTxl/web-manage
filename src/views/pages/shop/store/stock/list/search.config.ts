export const searchColumns = [
  {
    title: '商品名称',
    dataIndex: 'spec',
    align: 'center'
  },
  {
    title: '商品分类',
    dataIndex: 'price',
    align: 'center'
  },
  {
    title: '实际库存',
    dataIndex: 'price2',
    align: 'center'
  },
  {
    title: '可用库存',
    dataIndex: 'price3',
    align: 'center'
  },
  {
    title: '操作',
    dataIndex: 'price4',
    align: 'center',
    width: 140,
    fixed: 'right',
    scopedSlots: { customRender: 'action' }
  }
]
