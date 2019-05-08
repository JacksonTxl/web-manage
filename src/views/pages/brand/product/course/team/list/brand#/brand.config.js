export const columns = [
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
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]
