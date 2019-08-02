export const rules = (vm: any) => {
  const pattern = vm.pattern
  return {
    phone: [
      'phone',
      {
        rules: [
          {
            required: true,
            pattern: pattern.MOBILE,
            message: '请输入正确的手机号'
          }
        ]
      }
    ],
    captcha: [
      'captcha',
      {
        rules: [
          {
            required: true,
            message: '请输入验证码'
          }
        ]
      }
    ]
  }
}
