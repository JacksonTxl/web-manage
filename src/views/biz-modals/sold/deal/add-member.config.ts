export const ruleOptions = (vm: any) => {
  return {
    name: {
      rules: [
        {
          validator: (filed: any, value: any, values: any) => {
            if (!value || !value.match(vm.pattern.CN_EN_NUM_SPACE('1-15'))) {
              return '请输入会员姓名，支持格式长度1~15中英文'
            }
          }
        }
      ]
    },
    mobile: {
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            if (!value) {
              return '请输入手机号'
            }
            if (value && !vm.pattern.MOBILE.test(value)) {
              return '输入的手机号格式错误，请重新输入'
            }
          }
        }
      ]
    }
  }
}
