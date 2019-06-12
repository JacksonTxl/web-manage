export const columns = [
  {
    title: '上课场馆',
    dataIndex: 'shop_name'
    // sorter: (a, b) => a.name.length - b.name.length
  },
  {
    title: '课程类型',
    dataIndex: 'category_name'
  },
  {
    title: '课程名称',
    dataIndex: 'course_name',
    scopedSlots: { customRender: 'course_name' }
  },
  {
    title: '时长（分钟）',
    dataIndex: 'duration'
  },
  {
    title: '课程定价',
    dataIndex: 'sell_price'
  },
  {
    title: '授课教练数',
    dataIndex: 'coaches',
    scopedSlots: { customRender: 'coaches' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    fixed: 'right',
    width: 100,
    scopedSlots: { customRender: 'action' }
  }
]
