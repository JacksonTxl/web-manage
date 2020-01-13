export const ruleOptions = (vm: any) => {
  const pattern = vm.pattern

  return {
    is_minors: {
      rules: [
        {
          required: true,
          message: '请选择用户类型'
        }
      ],
      initialValue: 0
    },
    mobile: {
      rules: [
        {
          required: true,
          message: '请输入正确的手机号码',
          pattern: pattern.MOBILE
        }
      ]
    },
    parent_mobile: {
      rules: [
        {
          required: true,
          message: '请输入正确的手机号码',
          pattern: pattern.MOBILE
        }
      ]
    },
    parent_username: {
      rules: [
        {
          required: true,
          message: '请输入家长姓名'
        }
      ]
    },
    parent_user_role: {
      rules: [
        {
          required: true,
          message: '请选择身份'
        }
      ],
      initialValue: 1
    }
  }
}
