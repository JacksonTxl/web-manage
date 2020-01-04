export const ruleOptions = (vm: any) => {
  return {
    member_id: {
      rules: [{ required: true, message: '预约用户必填' }]
    },
    description: {}
  }
}

export const columns = [
  { title: '已选场次', dataIndex: 'site_name' },
  { title: '时段', dataIndex: 'start_time', width: 120 },
  { title: '价格', dataIndex: 'price', width: 120 },
  {
    title: '操作',
    width: 80,
    scopedSlots: { customRender: 'action' }
  }
]
