export const columns = (vm: any) => [
  {
    title: '日期',
    dataIndex: 'date'
  },
  {
    title: '录入人',
    dataIndex: 'member_name',
    scopedSlots: { customRender: 'member_name' }
  },
  {
    title: '跟进客服',
    dataIndex: 'mobile'
  },
  {
    title: '手机号',
    dataIndex: 'member_level',
    scopedSlots: { customRender: 'member_level' }
  },
  {
    title: '客户等级',
    dataIndex: 'follow_salesman'
  },
  {
    title: `跟进${vm.$c('coach')}`,
    dataIndex: 'follow_coach'
  },
  {
    title: '跟进销售',
    dataIndex: 'register_time'
  },
  {
    title: '跟进方式',
    dataIndex: 'be_member_time'
  },
  {
    title: '跟进状态',
    dataIndex: 'sum_consumption'
  },
  {
    title: '下次跟进时间',
    fixed: 'right',
    scopedSlots: { customRender: 'action' }
  },
  {
    title: '下次跟进次数',
    fixed: 'right',
    scopedSlots: { customRender: 'action' }
  },
  {
    title: '跟进内容',
    scopedSlots: { customRender: 'action' }
  }
]
