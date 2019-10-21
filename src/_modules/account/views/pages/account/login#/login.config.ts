export const ruleOptions = (vm: any) => {
  const pattern = vm.pattern
  return {
    name: {
      rules: [
        {
          required: true,
          message: '请输入用户名或登录邮箱'
        }
      ]
    },
    password: {
      rules: [
        {
          required: true,
          message: '请输入密码'
        }
      ]
    },
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
    },
    isAgree: {
      initialValue: true,
      valuePropName: 'checked',
      rules: [
        {
          required: true,
          message: '请确认勾选用户协议'
        },
        {
          validator: (field: any, value: any, values: any) => {
            if (!value) {
              return '请确认勾选用户协议'
            }
          }
        }
      ]
    }
  }
}
