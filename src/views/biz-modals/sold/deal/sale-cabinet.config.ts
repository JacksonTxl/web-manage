export const ruleOptions = (vm: any) => {
  const pattern = vm.pattern
  return {
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
          pattern: pattern.EN_NUM('6-20'),
          message: '请输入正确合同编号'
        }
      ]
    },
    saleName: {
      rules: [{ required: true, message: '请选择销售人员' }]
    }
  }
}
