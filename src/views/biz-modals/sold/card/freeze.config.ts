export const ruleOptions = (vm: any) => {
  return {
    end_time: {
      rules: [{ required: true, message: '请选择冻结结束日期' }]
    },
    poundage: {},
    pay_method: {}
  }
}
