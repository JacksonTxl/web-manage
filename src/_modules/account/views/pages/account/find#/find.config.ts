export const ruleOptions = (vm: any) => {
  const pattern = vm.pattern
  return {
    account: {
      rules: [
        {
          required: true,
          message: '请输入用户名或登录邮箱'
        },
        {
          validator: (field: any, value: any, values: any) => {
            if (value) {
              vm.btnFlag = true
            } else {
              vm.btnFlag = false
            }
          }
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
    },
    pwd: {
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            let flag = false
            if (!value) {
              return '请输入密码'
            }
            if (
              value.length < 6 ||
              value.length > 15 ||
              !pattern.EN_NUM().test(value)
            ) {
              vm.validStatus = 0
              vm.strength = ''
            }
            if (value.length >= 6 && value.length <= 15) {
              vm.validStatus = 1
            }
            console.log(pattern.EN_NUM())
            if (pattern.EN_NUM().test(value)) {
              vm.validStatus = 2
            }
            if (
              pattern.UC_EN('6-8').test(value) ||
              pattern.LC_EN('6-8').test(value) ||
              pattern.NUM('6-8').test(value)
            ) {
              vm.validStatus = 3
              vm.strength = 'weak'
              flag = true
            }
            if (
              pattern.UC_EN('9-15').test(value) ||
              pattern.LC_EN('9-15').test(value) ||
              pattern.UC_LC_EN('6-15').test(value) ||
              pattern.NUM('9-15').test(value)
            ) {
              vm.validStatus = 3
              vm.strength = 'middle'
              flag = true
            }
            if (pattern.UL_EN_NUM('6-15').test(value)) {
              vm.validStatus = 3
              vm.strength = 'strong'
              flag = true
            }
            if (!flag) {
              return '请输入正确的密码'
            }
          }
        }
      ]
    },
    repeat_pwd: {
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            if (!value) {
              return '请输入密码'
            }
            if (values.pwd !== value) {
              return '密码输入不相同，请重新输入'
            }
          }
        }
      ]
    }
  }
}
