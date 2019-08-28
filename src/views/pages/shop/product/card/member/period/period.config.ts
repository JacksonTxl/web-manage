export const ruleOptions = (vm: any) => {
  return {
    card_name: {
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            if (value === undefined || value === '') {
              return '请填写期限卡名称'
            }
            if (value && !vm.rules.card_name.test(value)) {
              return '输入的期限卡名称格式错误，请重新输入'
            }
          }
        }
      ]
    },
    start_time: {
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            if (!value) {
              return '请选择开始售卖时间'
            }
          }
        }
      ]
    },
    end_time: {
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            if (!value) {
              return '请选择结束售卖时间'
            }
          }
        }
      ]
    },
    transferNum: {
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            if (vm.is_transfer && !value) {
              return '请输入转让费用'
            }
          }
        }
      ]
    }
  }
}
