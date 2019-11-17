export const columns = (vm: any) => [
  {
    title: '日期',
    dataIndex: 'created_time'
  },
  {
    title: '录入人',
    dataIndex: 'operator',
    scopedSlots: { customRender: 'operator' }
  },
  {
    title: '跟进客服',
    dataIndex: 'member',
    scopedSlots: { customRender: 'member' }
  },
  {
    title: '手机号',
    dataIndex: 'mobile'
  },
  {
    title: '客户等级',
    dataIndex: 'member_level',
    scopedSlots: { customRender: 'member_level' }
  },
  {
    title: `跟进${vm.$c('coach')}`,
    dataIndex: 'coach',
    scopedSlots: { customRender: 'coach' }
  },
  {
    title: '跟进销售',
    dataIndex: 'salesman',
    scopedSlots: { customRender: 'salesman' }
  },
  {
    title: '跟进方式',
    dataIndex: 'follow_way',
    scopedSlots: { customRender: 'follow_way' }
  },
  {
    title: '跟进状态',
    dataIndex: 'follow_status',
    scopedSlots: { customRender: 'follow_status' }
  },
  {
    title: '下次跟进时间',
    dataIndex: 'follow_next_time'
  },
  {
    title: '下次跟进次数',
    dataIndex: 'follow_num'
  },
  {
    title: '跟进内容',
    dataIndex: 'follow_content',
    scopedSlots: { customRender: 'follow_content' }
  }
]
