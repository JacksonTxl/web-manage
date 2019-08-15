export const ruleOptions = (vm: any) => {
  const pattern = vm.pattern
  return {
    memberName: {
      rules: [{ required: true, message: '请输入会员姓名' }]
    },
    memberId: {
      rules: [{ required: true, message: '请选择转让会员' }]
    },
    memberMobile: {
      rules: [
        { required: true, message: '请输入手机号' },
        {
          required: pattern.MOBILE,
          message: '输入的手机号格式错误，请重新输入'
        }
      ]
    },
    cabinet: {
      rules: [
        {
          validator: (rule: any, value: any, values: any) => {
            if (!value) {
              vm.disabledCalendar = true
              return '请选择租赁柜号'
            } else {
              vm.disabledCalendar = false
            }
          }
        }
      ]
    },
    endTimePicker: {
      rules: [{ required: true, message: '请选择租赁时间' }]
    },
    endTimeInput: {
      rules: [{ required: true, message: '请输入租赁天数' }]
    },
    contractNumber: {
      rules: [
        { required: true, message: '请输入合同编号' },
        {
          required: pattern.EN_NUM('6-20'),
          message: '请输入正确合同编号'
        }
      ]
    },
    saleName: {
      rules: [{ required: true, message: '请选择销售人员' }]
    }
  }
}
