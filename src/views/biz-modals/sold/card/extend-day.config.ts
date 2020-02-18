export const ruleOptions = (vm: any) => {
  return {
    extend_days: {
      rules: [
        {
          required: true,
          message: '请输入延长天数'
        }
      ]
    },
    content: {}
  }
}
