export const classrecord = () => {
  return [
    {
      title: '课程类型',
      dataIndex: 'reserve_type'
    },
    {
      title: '课程名称',
      dataIndex: 'course_name'
    },
    {
      title: '上课时间',
      dataIndex: 'start_time'
    },
    {
      title: '上课教练',
      dataIndex: 'coach_name'
    },
    {
      title: '预约人数',
      dataIndex: 'reserve_num'
    },
    {
      title: '预约状态',
      dataIndex: 'reserve_status'
    },
    {
      title: '签到状态',
      dataIndex: 'is_checkin',
      scopedSlots: { customRender: 'is_checkin' }
    },
    {
      title: '预约时间',
      dataIndex: 'created_time',
      sorter: (a: any, b: any) => {
        let A = new Date(a.created_time).getTime()
        let B = new Date(b.created_time).getTime()
        if (A < B) {
          return -1
        }
        if (A > B) {
          return 1
        }
        return 0
      }
    },
    {
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
      width: 150,
      scopedSlots: { customRender: 'action' }
    }
  ]
}
export const admission = () => {
  return [
    {
      title: '入场门店',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: '会员卡',
      dataIndex: 'age1',
      key: 'age1'
    },
    {
      title: '入场时间',
      dataIndex: 'age2',
      key: 'age2'
    },
    {
      title: '扣除次数',
      dataIndex: 'age3',
      key: 'age3'
    },
    {
      title: '离场时间',
      dataIndex: 'age4',
      key: 'age4'
    },
    {
      title: '临时储物柜',
      dataIndex: 'age5',
      key: 'age5'
    }
  ]
}
