export const ruleOptions = (vm: any) => {
  return {
    end_time: {
      rules: [{ required: true, message: '请选择结束日期' }]
    },
    description: {}
  }
}
