export const columns = [
  {
    title: '售卖场馆',
    dataIndex: 'effective'
  },
  {
    title: '课程类型',
    dataIndex: 'effective'
  },
  {
    title: '课程名称',
    dataIndex: 'admission',
    scopedSlots: { customRender: 'admission' }
  },
  {
    title: '课程强度',
    dataIndex: 'rate',
    scopedSlots: { customRender: 'rate' }
  },
  {
    title: '时长（分钟）',
    dataIndex: 'sell'
  },
  {
    title: '参考课时费',
    dataIndex: 'release'
  },
  {
    title: '状态',
    dataIndex: 'release'
  },
  {
    title: '操作',
    dataIndex: 'action',
    fixed: 'right',
    width: 140,
    scopedSlots: { customRender: 'action' }
  }
]
