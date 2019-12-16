export const columns = () => [
  {
    key: 1,
    title: '商品名称',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' }
  },
  {
    key: 2,
    title: '数量',
    dataIndex: 'numbers',
    scopedSlots: { customRender: 'numbers' }
  },
  {
    key: 3,
    title: '单价',
    dataIndex: ''
  },
  {
    key: 4,
    title: '小计',
    dataIndex: ''
  },
  {
    key: 5,
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]
