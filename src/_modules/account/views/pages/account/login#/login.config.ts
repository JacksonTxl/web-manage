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
