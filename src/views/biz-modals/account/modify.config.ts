export const ruleOptions = (vm: any) => {
  const pattern = vm.pattern
  return {
    password: {
      rules: [
        {
          required: true,
          message: '请输入密码'
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
    pwd: {
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            if (!value) {
              return '请输入登录密码'
            }
            if (value.length < 6 || value.length > 15) {
              return '请输入正确格式登录密码'
            }
          }
        }
      ]
    },
    repwd: {
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            if (!value) {
              return '请输入登录密码'
            }
            if (value.length < 6 || value.length > 15) {
              return '请输入正确格式登录密码'
            }
            if (value !== values.pwd) {
              return '两次密码输入不一致'
            }
          }
        }
      ]
    }
  }
}
