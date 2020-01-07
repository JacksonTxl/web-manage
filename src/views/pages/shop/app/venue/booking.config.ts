export const ruleOptions = (vm: any) => {
  const pattern = vm.pattern
  return {
    member_id: {
      rules: [{ required: true, message: '预约用户必填' }]
    },
    description: {},
    mobile: {
      rules: [
        { required: true, message: '手机号码必填' },
        {
          pattern: pattern.MOBILE,
          message: '输入的手机号格式错误，请重新输入'
        }
      ]
    },
    member_name: {
      rules: [
        { required: true, message: '会员名称必填' },
        {
          pattern: pattern.CN_EN_NUM_SPACE('1-15'),
          message: '请输入会员姓名，支持格式长度1~15中英文'
        }
      ]
    }
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
