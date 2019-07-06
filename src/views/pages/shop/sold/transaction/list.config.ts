export const columns = () => [
  {
    title: '商品名称',
    dataIndex: 'product_name',
    scopedSlots: { customRender: 'product_name' }
  }, {
    title: '商品类型',
    dataIndex: 'product_type',
    scopedSlots: { customRender: 'product_type' }
  }, {
    title: '价格',
    dataIndex: 'price',
    scopedSlots: { customRender: 'price' }
  }, {
    title: '销量',
    dataIndex: 'sold_num',
    scopedSlots: { customRender: 'sold_num' }
  }, {
    title: '操作',
    dataIndex: 'action',
    width: 140,
    scopedSlots: { customRender: 'action' }
  }
]
