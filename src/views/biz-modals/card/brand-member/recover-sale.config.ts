export const ruleOptions = (vm: any) => {
  return {
    endTime: { rules: [{ required: true, message: '请选择结束售卖时间' }] }
  }
}
