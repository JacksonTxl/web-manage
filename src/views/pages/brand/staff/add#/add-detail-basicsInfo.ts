export const ruleOptions = (vm: any) => {
  debugger
  const pattern = vm.pattern
  debugger
  return {
    name: {
      rules: [
        {
          required: true,
          message: '请输入用户名'
        },
        {
          pattern: pattern.CN_EN_NUM('6-15'),
          message: '请输入6~15d个字符'
        }
      ]
    },
    staff_name: {
      rules: [
        {
          required: true,
          message: '请输入用户名'
        },
        {
          pattern: pattern.CN_EN_NUM('6-15'),
          message: '请输入6~15个字符'
        }
      ]
    },
    nickname: {
      rules: [
        {
          required: true,
          message: '请填写昵称'
        },
        {
          pattern: pattern.CN_EN_NUM('1-10'),
          message: '请输入1-10个字，中英文及数字'
        }
      ]
    },
    account: {
      rules: [
        {
          required: true,
          message: '请输入登录账户'
        },
        {
          pattern: pattern.CN_EN_NUM('6-15'),
          message: '请输入6~15个字符'
        }
      ]
    }
  }
}
