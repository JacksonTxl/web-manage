export const columns = [
  {
    title: '上课场馆',
    dataIndex: 'member',
    scopedSlots: { customRender: 'member' }
    // sorter: (a, b) => a.name.length - b.name.length
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
    title: '时长（分钟）',
    dataIndex: 'sell'
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
    title: '操作',
    dataIndex: 'action',
    fixed: 'right',
    width: 140,
    scopedSlots: { customRender: 'action' }
  }
]