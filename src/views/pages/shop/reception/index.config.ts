export const summaryList = () => {
  return [
    {
      label: '今日订单',
      type: 'today_order',
      unit: '单',
      color: '#3A6FED',
      version: 1
    },
    {
      label: '今日预约',
      type: 'today_reserve',
      unit: '条',
      color: '#2C8DD2',
      version: 2
    },
    {
      label: '今日团课',
      type: 'today_team_course',
      unit: '节',
      color: '#1EA9B9',
      version: 1
    },
    {
      label: '今日收银',
      type: 'today_revenue',
      unit: '元',
      color: '#11C5A1',
      version: 2
    },
    {
      label: '今日入场',
      type: 'today_entry',
      unit: '人',
      color: '#01E882',
      version: 1
    }
  ]
}
export const shortcutList = () => {
  return [
    {
      id: 'orderPage',
      icon: 'reception-create',
      label: '销售开单',
      auth: true,
      version: 1
    },
    {
      id: 'reservePage',
      icon: 'reception-order',
      label: '预约管理',
      auth: true,
      version: 2
    },
    {
      id: 'checkInPage',
      icon: 'reception-customer',
      label: '入场管理',
      auth: true,
      version: 1
    },
    {
      id: 'temporaryPage',
      icon: 'reception-advance',
      label: '定金押金',
      auth: true,
      version: 2
    },
    {
      id: 'schedulePage',
      icon: 'reception-course',
      label: '课程预约',
      auth: true,
      version: 1
    },
    {
      id: 'cabinetPage',
      icon: 'reception-cabinet',
      label: '储物柜',
      auth: true,
      version: 1
    },
    {
      id: 'addVisit',
      icon: 'reception-record',
      label: '预约到访',
      auth: true,
      version: 2
    }
  ]
}
