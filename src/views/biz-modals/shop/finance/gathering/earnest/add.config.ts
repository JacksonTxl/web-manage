export const ruleOptions = (vm: any) => {
  const pattern = vm.pattern
  return {
    pay_price: {
      rules: [{ required: true, message: '请输入定金金额' }]
    },
    contract_number: {
      rules: [
        { required: true, message: '请输入合同编号' },
        {
          pattern: pattern.EN_NUM('6-20'),
          message: '请输入正确合同编号'
        }
      ]
    },
    description: {},
    pay_channel: [{ required: true, message: '请选择支付方式' }],
    sale_id: {}
  }
}
