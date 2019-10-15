export const ruleOptions = (vm: any) => {
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
    }
  }
}
