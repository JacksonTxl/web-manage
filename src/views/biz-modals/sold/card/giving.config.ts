export const ruleOptions = (vm: any) => {
  return {
    amount: {
      rules: [{ required: true, message: '请输入赠送额度' }]
    },
    content: {}
  }
}
