export const ruleOptions = (vm: any) => {
  return {
    endTime: {
      rules: [{ required: true, message: '请选择冻结结束日期' }]
    },
    payType: {}
  }
}
