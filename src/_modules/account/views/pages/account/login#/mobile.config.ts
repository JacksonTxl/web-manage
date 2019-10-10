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
