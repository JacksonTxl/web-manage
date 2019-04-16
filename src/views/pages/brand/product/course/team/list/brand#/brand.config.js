export const columns = [
  {
    title: '课程类型',
    dataIndex: 'category_name',
    scopedSlots: { customRender: 'category_name' }
    // sorter: (a, b) => a.name.length - b.name.length
  },
  {
    title: '课程名称',
    dataIndex: 'course_name'
  },
  {
    title: '课程强度',
    dataIndex: 'strength_level',
    scopedSlots: { customRender: 'strength_level' }
  },
  {
    title: '时长（分钟）',
    dataIndex: 'duration',
    scopedSlots: { customRender: 'duration' }
  },
  {
    title: '参考课时费',
    dataIndex: 'price'
  },
  {
    title: '上课门店数',
    dataIndex: 'shop_setting'
  },
  {
    title: '状态',
    dataIndex: 'is_available'
  },
  {
    title: '操作',
    dataIndex: 'action'
  }
]
