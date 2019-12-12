export const columns = () => [
  {
    title: '商品名称',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '数量',
    dataIndex: 'numbers',
    scopedSlots: { customRender: 'numbers' }
  },
  {
    title: '单价',
    dataIndex: ''
  },
  {
    title: '小计',
    dataIndex: ''
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]
