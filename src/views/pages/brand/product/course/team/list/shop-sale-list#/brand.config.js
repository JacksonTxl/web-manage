export const columns = [
  {
    title: '课程类型',
    dataIndex: 'member',
    scopedSlots: { customRender: 'member' }
    // sorter: (a, b) => a.name.length - b.name.length
  },
  {
    title: '课程名称',
    dataIndex: 'effective'
  },
  {
    title: '课程强度',
    dataIndex: 'effective'
  },
  {
    title: '时长（分钟）',
    dataIndex: 'admission',
    scopedSlots: { customRender: 'admission' }
  },
  {
    title: '参考课时费',
    dataIndex: 'sell'
  },
  {
    title: '上课门店数',
    dataIndex: 'release'
  },
  {
    title: '状态',
    dataIndex: 'release'
  },
  {
    title: '操作',
    dataIndex: 'release'
  }
]
