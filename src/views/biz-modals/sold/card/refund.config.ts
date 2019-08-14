export const ruleOptions = (vm: any) => {
  return {
    refund_price: {
      rules: [{ required: true, message: '请输入退款金额' }]
    }
  }
}
