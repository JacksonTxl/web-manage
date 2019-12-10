export const columns = (vm: any) => [
  {
    title: '商品名称',
    dataIndex: 'id'
  },
  {
    title: '可用库存',
    dataIndex: 'start_time'
  },
  {
    title: '入库数',
    dataIndex: 'shop_name',
    slots: { title: 'shop_name' },
    scopedSlots: { customRender: 'shop_name' }
  },
  {
    title: '备注',
    dataIndex: 'group_status',
    slots: { title: 'group_status' },
    scopedSlots: { customRender: 'shop_name' }
  }
]
