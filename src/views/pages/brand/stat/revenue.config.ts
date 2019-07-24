export const columns = () => [
  {
    title: '总营收(元)',
    dataIndex: 'image_face',
    scopedSlots: { customRender: 'image_face' }
  },
  {
    title: '私教课(元)',
    dataIndex: 'member_name',
    scopedSlots: { customRender: 'member_name' }
  },
  { title: '团体课(元)', dataIndex: 'mobile' },
  {
    title: '储值卡(元)',
    dataIndex: 'member_level',
    scopedSlots: { customRender: 'member_level' }
  },
  { title: '课程包(元)', dataIndex: 'follow_salesman' },
  { title: '定金(元)', dataIndex: 'follow_coach' },
  { title: '押金(元)', dataIndex: 'register_time' },
  { title: '云店(元)', dataIndex: 'be_member_time' },
  { title: '其他(元)', align: 'right', dataIndex: 'sum_consumption' }
  // {
  //   title: '操作',
  //   fixed: 'right',
  //   width: 170,
  //   scopedSlots: { customRender: 'action' }
  // }
]
