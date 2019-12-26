export const columns = (vm: any) => [
  {
    title: '日期',
    fixed: 'left',
    dataIndex: 'stat_date',
    width: 140
  },
  {
    title: `总售课节数`,
    align: 'right',
    dataIndex: 'sale_total_num'
  },
  {
    title: `私教售课节数`,
    dataIndex: 'personal_course_num',
    align: 'right'
    // scopedSlots: { customRender: 'image_face' }
  },
  {
    title: '团课售课节数',
    align: 'right',
    dataIndex: 'team_course_num'
  },
  {
    title: '小班课售课节数',
    align: 'right',
    dataIndex: 'small_course_num'
  },
  {
    title: '消课总节数',
    align: 'right',
    dataIndex: 'checkin_total_num'
  },
  {
    title: '私教课消课节数',
    align: 'right',
    dataIndex: 'personal_checkin_num'
  },
  {
    title: '团课消课节数',
    align: 'right',
    dataIndex: 'team_checkin_num'
  },
  {
    title: '小班课消课节数',
    align: 'right',
    dataIndex: 'small_checkin_num'
  }
]
