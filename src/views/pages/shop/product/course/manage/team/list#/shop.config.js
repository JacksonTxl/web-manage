export const columns = [
  {
    title: '售卖场馆',
    dataIndex: 'shop_name'
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
    title: '课程强度',
    dataIndex: 'strength_level',
    scopedSlots: { customRender: 'strength_level' }
  },
  {
    title: '时长（分钟）',
    dataIndex: 'duration'
  },
  {
    title: '参考课时费',
    dataIndex: 'price'
  },
  {
    title: '操作',
    dataIndex: 'action',
    fixed: 'right',
    width: 140,
    scopedSlots: { customRender: 'action' }
  }
]
