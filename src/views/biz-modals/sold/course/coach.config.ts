export const ruleOptions = (vm: any) => {
  return {
    coach: {
      rules: [{ required: true, message: '请选择修改教练' }]
    },
    description: {}
  }
}
