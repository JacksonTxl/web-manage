export const columns = (vm: any) => [
  {
    title: '日期',
    dataIndex: 'created_time',
    fixed: 'left',
    width: 160
  },
  {
    title: '录入人',
    dataIndex: 'operator',
    scopedSlots: { customRender: 'operator' },
    fixed: 'left',
    width: 120
  },
  {
    title: '跟进客户',
    dataIndex: 'member',
    fixed: 'left',
    width: 120,
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
    dataIndex: 'follow_next_time',
    width: '180px'
  },
  {
    dataIndex: 'follow_num',
    slots: { title: 'contentTitle' },
    align: 'right',
    width: '143px'
  },
  {
    title: '跟进内容',
    dataIndex: 'follow_content',
    width: '150px',
    scopedSlots: { customRender: 'follow_content' }
  }
]
