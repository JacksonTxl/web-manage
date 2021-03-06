export const columns = (vm: any) => [
  {
    title: '人脸',
    dataIndex: 'image_face',
    fixed: 'left',
    width: 40,
    scopedSlots: { customRender: 'image_face' }
  },
  {
    title: '姓名',
    dataIndex: 'member_name',
    fixed: 'left',
    width: 100,
    scopedSlots: { customRender: 'member_name' }
  },
  {
    title: '手机号',
    dataIndex: 'mobile'
  },
  {
    title: '用户等级',
    dataIndex: 'member_level',
    scopedSlots: { customRender: 'member_level' }
  },
  { title: '跟进销售', dataIndex: 'follow_salesman' },
  { title: `跟进${vm.$c('coach')}`, dataIndex: 'follow_coach' },
  { title: '注册时间', dataIndex: 'register_time' },
  { title: '成为会员时间', dataIndex: 'be_member_time' },
  { title: '净收入(元)', align: 'right', dataIndex: 'sum_revenue' },
  { title: '累计消费(元)', align: 'right', dataIndex: 'sum_consumption' },
  { title: '累计退款(元)', align: 'right', dataIndex: 'sum_refund' },
  {
    title: '操作',
    fixed: 'right',
    width: 170,
    scopedSlots: { customRender: 'action' }
  }
]
