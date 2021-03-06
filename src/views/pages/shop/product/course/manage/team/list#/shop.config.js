export const columns = [
  {
    title: '团课名称',
    dataIndex: 'course_name',
    fixed: 'left',
    width: 180,
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
    align: 'right',
    sorter: true,
    dataIndex: 'duration'
  },
  {
    title: '参考课时费（元/节）',
    dataIndex: 'price',
    align: 'right'
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
