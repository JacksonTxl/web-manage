export const allColumns = () => {
  return [
    {
      title: '日期',
      width: '150px',
      dataIndex: 'stat_date'
    },
    {
      title: '上课节数（私）',
      dataIndex: 'personal_course_num',
      scopedSlots: { customRender: 'personal_course_num' }
    },
    {
      title: '预约人数（私)',
      dataIndex: 'personal_reserved_num'
    },
    {
      title: '签到人数（私）',
      dataIndex: 'personal_checkin_num'
    },
    {
      title: '私教消课价值（元)',
      dataIndex: 'personal_consume_amount',
      scopedSlots: { customRender: 'personal_consume_amount' }
    },
    {
      title: '上课节数（团）',
      dataIndex: 'team_course_num',
      scopedSlots: { customRender: 'team_course_num' }
    },
    {
      title: '排课人数（团）',
      dataIndex: 'team_reserved_num'
    },
    {
      title: '预约人数（团）',
      dataIndex: 'team_can_reserve_num'
    },
    {
      title: '签到人数（团）',
      dataIndex: 'team_checkin_num'
    },
    {
      title: '团课消课价值（元）',
      dataIndex: 'team_consume_amount',
      scopedSlots: { customRender: 'team_consume_amount' }
    }
  ]
}
export const courseColumns = () => {
  return [
    {
      title: '日期',
      width: '150px',
      dataIndex: 'stat_date'
    },
    {
      title: '教练姓名',
      dataIndex: 'coach_name'
    },
    {
      title: '所属部门',
      dataIndex: 'department_name'
    },
    {
      title: '上课节数（私）',
      dataIndex: 'personal_course_num',
      scopedSlots: { customRender: 'personal_course_num' }
    },
    {
      title: '预约人数（私)',
      dataIndex: 'personal_reserved_num'
    },
    {
      title: '签到人数（私）',
      dataIndex: 'personal_checkin_num'
    },
    {
      title: '私教消课价值（元)',
      dataIndex: 'personal_consume_amount',
      scopedSlots: { customRender: 'personal_consume_amount' }
    },
    {
      title: '上课节数（团）',
      dataIndex: 'team_course_num',
      scopedSlots: { customRender: 'team_course_num' }
    },
    {
      title: '排课人数（团）',
      dataIndex: 'team_reserved_num'
    },
    {
      title: '预约人数（团）',
      dataIndex: 'team_can_reserve_num'
    },
    {
      title: '签到人数（团）',
      dataIndex: 'team_checkin_num'
    },
    {
      title: '团课消课价值（元）',
      dataIndex: 'team_consume_amount',
      scopedSlots: { customRender: 'team_consume_amount' }
    }
  ]
}
