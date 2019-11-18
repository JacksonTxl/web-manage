export const ruleOptions = (vm: any) => {
  const pattern = vm.pattern
  return {
    phone: {
      rules: [
        {
          required: true,
          pattern: pattern.MOBILE,
          message: '请输入正确的手机号'
        }
      ]
    },
    country_phone: {
      initialValue: {
        code_id: 37,
        phone_code: 86,
        phone: ''
      },
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            if (!value || !value.phone) {
              return '请输入手机号'
            }
            if (!pattern.MOBILE.test(value.phone)) {
              return '请输入正确的手机号'
            }
          }
        }
      ]
    },
    captcha: {
      rules: [
        {
          required: true,
          message: '请输入验证码'
        }
      ]
    }
  }
}
