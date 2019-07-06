export const columns = [
  {
    title: '团课名称',
    dataIndex: 'course_name',
    scopedSlots: { customRender: 'course_name' }
  },
  {
    title: '课程类别',
    dataIndex: 'category_name'
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
    title: '参考课时费（元/节）',
    dataIndex: 'price'
  },
  {
    title: '发布渠道',
    dataIndex: 'publish_name'
  },
  {
    title: '操作',
    dataIndex: 'action',
    fixed: 'right',
    width: 160,
    scopedSlots: { customRender: 'action' }
  }
]
