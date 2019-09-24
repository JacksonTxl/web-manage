export const ruleOptions = (vm: any) => {
  const pattern = vm.pattern
  return {
    reserve_id: {
      rules: [{ required: true, message: '预约用户必填' }]
    },
    reserve_date: {
      rules: [{ required: true, message: '预约日期必填' }]
    },
    reserve_time: {
      rules: [{ required: true, message: '预约时间必填' }]
    },
    receptionist_id: {
      rules: [{ required: true, message: '接待人必填' }]
    },
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
