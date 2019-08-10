export const ruleOptions = (vm: any) => {
  return {
    name: {
      rules: [{ required: true, message: '请输入用户姓名' }]
    },
    mobile: {
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            if (!value) {
              return '请输入手机号'
            }
            if (value && !vm.rules.mobile.test(value)) {
              return '输入的手机号格式错误，请重新输入'
            }
          }
        }
      ]
    }
  }
}
