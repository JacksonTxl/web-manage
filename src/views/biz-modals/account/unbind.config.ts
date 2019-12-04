export const ruleOptions = (vm: any) => {
  return {
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
