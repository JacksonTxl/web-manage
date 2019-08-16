export const ruleOptions = (vm: any) => {
  return {
    start_time: {
      rules: [{ required: true, message: '请选择开卡日期' }]
    },
    end_time: {
      rules: [{ required: true, message: '请选择到期日期' }]
    }
  }
}
