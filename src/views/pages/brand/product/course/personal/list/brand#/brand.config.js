export const columns = [
  {
    title: '课程类型',
    dataIndex: 'category_name'
  },
  {
    title: '课程名称',
    dataIndex: 'course_name'
  },
  {
    title: '时长（分钟）',
    dataIndex: 'duration'
  },
  {
    title: '支持上课门店',
    dataIndex: 'shop_number'
  },
  {
    title: '定价方式',
    dataIndex: 'pricing_type'
  },
  {
    title: '课程定价',
    dataIndex: 'course_pricing'
  },
  {
    title: '授课教练数',
    dataIndex: 'coach_number'
  },
  {
    title: '状态',
    dataIndex: 'status'
  },
  {
    title: '操作',
    dataIndex: 'action',
    fixed: 'right',
    width: 140,
    scopedSlots: { customRender: 'action' }
  }
]
