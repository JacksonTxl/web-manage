export const ruleOptions = (vm: any) => {
  return {
    times: {
      rules: [{ required: true, message: '请输入修改课时' }]
    },
    description: {}
  }
}
