export const allColumns = () => {
  return [
    {
      title: '日期',
      width: '150px',
      fixed: 'left',
      dataIndex: 'stat_date'
    },
    {
      title: '上课节数（私）',
      dataIndex: 'personal_course_num',
      scopedSlots: { customRender: 'personal_course_num' }
    },
    {
      title: '上课教练数（私）',
      dataIndex: 'personal_coach_num'
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
      dataIndex: 'personal_checkin_amount',
      slots: { title: 'personalTitle' },
      scopedSlots: { customRender: 'personal_checkin_amount' }
    },
    {
      title: '上课节数（团）',
      dataIndex: 'team_course_num',
      scopedSlots: { customRender: 'team_course_num' }
    },
    {
      title: '上课教练数（团）',
      dataIndex: 'team_coach_num'
    },
    {
      title: '可约人数（团）',
      dataIndex: 'team_can_reserve_num'
    },
    {
      title: '预约人数（团）',
      dataIndex: 'team_reserved_num'
    },
    {
      title: '签到人数（团）',
      dataIndex: 'team_checkin_num'
    },
    {
      dataIndex: 'team_checkin_amount',
      slots: { title: 'teamTitle' },
      scopedSlots: { customRender: 'team_checkin_amount' }
    }
  ]
}
export const coachColumns = () => {
  return [
    {
      title: '日期',
      width: '150px',
      fixed: 'left',
      dataIndex: 'stat_date'
    },
    {
      title: '教练姓名',
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
      dataIndex: 'personal_checkin_amount',
      slots: { title: 'personalTitle' },
      scopedSlots: { customRender: 'personal_checkin_amount' }
    },
    {
      title: '上课节数（团）',
      dataIndex: 'team_course_num',
      scopedSlots: { customRender: 'team_course_num' }
    },
    {
      title: '可约人数（团）',
      dataIndex: 'team_can_reserve_num'
    },
    {
      title: '预约人数（团）',
      dataIndex: 'team_reserved_num'
    },
    {
      title: '签到人数（团）',
      dataIndex: 'team_checkin_num'
    },
    {
      dataIndex: 'team_checkin_amount',
      slots: { title: 'teamTitle' },
      scopedSlots: { customRender: 'team_checkin_amount' }
    }
  ]
}
