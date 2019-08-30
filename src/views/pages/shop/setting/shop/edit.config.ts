export const ruleOptions = (vm: any) => {
  const patter = vm.pattern
  return {
    shopPhone: {
      validateTrigger: 'blur',
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            if (vm.phoneValidtorType) {
              if (value && !vm.pattern.TEL.test(value)) {
                return '输入的门店电话格式错误，请重新输入'
              }
            } else {
              if (!vm.shopPhones.length) {
                return '请填写门店电话'
              }
            }
          }
        }
      ]
    },
    email: {
      rules: [
        {
          type: 'email',
          message: '输入的邮箱格式错误，请重新输入!'
        }
      ]
    }
  }
}
