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
    title: '时长（分钟）',
    dataIndex: 'admission',
    scopedSlots: { customRender: 'admission' }
  },
  {
    title: '支持上课门店',
    dataIndex: 'sell'
  },
  {
    title: '定价方式',
    dataIndex: 'release'
  },
  {
    title: '课程定价',
    dataIndex: 'release'
  },
  {
    title: '授课教练数',
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
