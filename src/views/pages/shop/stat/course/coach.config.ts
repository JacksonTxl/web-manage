export const columns = (vm: any) => {
  return [
    {
      title: '日期',
      width: '150px',
      fixed: 'left',
      dataIndex: 'stat_date'
    },
    {
      title: `${vm.$c('coach')}姓名`,
      fixed: 'left',
      width: '150px',
      dataIndex: 'coach_name'
    },
    {
      title: '所属部门',
      fixed: 'left',
      width: '150px',
      dataIndex: 'department_name'
    },
    {
      title: '上课节数（私）',
      dataIndex: 'personal_course_num',
      scopedSlots: { customRender: 'personal_course_num' },
      align: 'right'
    },
    {
      title: '预约人数（私)',
      dataIndex: 'personal_reserved_num',
      align: 'right'
    },
    {
      title: '签到人数（私）',
      dataIndex: 'personal_checkin_num',
      align: 'right'
    },
    {
      dataIndex: 'personal_checkin_amount',
      titleTotal: '私教消课价值（元)',
      slots: { title: 'personalTitle' },
      scopedSlots: { customRender: 'personal_checkin_amount' },
      align: 'right'
    },
    {
      title: '上课节数（团）',
      dataIndex: 'team_course_num',
      scopedSlots: { customRender: 'team_course_num' },
      align: 'right'
    },
    {
      title: '可约人数（团）',
      dataIndex: 'team_can_reserve_num',
      align: 'right'
    },
    {
      title: '预约人数（团）',
      dataIndex: 'team_reserved_num',
      align: 'right'
    },
    {
      title: '签到人数（团）',
      dataIndex: 'team_checkin_num',
      align: 'right'
    },
    {
      dataIndex: 'team_checkin_amount',
      titleTotal: '团课消课价值（元）',
      slots: { title: 'teamTitle' },
      scopedSlots: { customRender: 'team_checkin_amount' },
      align: 'right'
    }
  ]
}