export const columnsGroupStored = [
  {
    title: '原价',
    dataIndex: 'price',
    scopedSlots: { customRender: 'price' }
  },
  {
    title: '拼团价',
    dataIndex: 'discount',
    slots: { title: 'discount' },
    scopedSlots: { customRender: 'discount' }
  }
]
