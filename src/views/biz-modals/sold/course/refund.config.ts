export const ruleOptions = (vm: any) => {
  return {
    refundPrice: {
      rules: [{ required: true, message: '请输入退款金额' }]
    }
  }
}
