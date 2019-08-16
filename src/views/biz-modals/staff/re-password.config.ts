export const ruleOptions = (vm: any) => {
  let reg = new RegExp(/^[A-Za-z0-9\_]{6,15}$/)
  return {
    name: {
      rules: [
        {
          required: true,
          message: '请输入登录账户'
        },
        {
          pattern: reg,
          message: '请输入6~15个字符'
        }
      ]
    },
    password: {
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
    repeat_password: {
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
    }
  }
}
