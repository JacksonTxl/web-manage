export const ruleOptions = (vm: any) => {
  return {
    siteName: {
      rules: [
        {
          required: true,
          message: '输入的场馆名称格式错误，请重新输入',
          pattern: vm.pattern.CN_EN_NUM_SPACE('1-6')
        }
      ]
    }
  }
}
