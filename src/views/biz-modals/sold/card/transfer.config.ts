export const ruleOptions = (vm: any) => {
  const pattern = vm.pattern
  return {
    startTime: {
      rules: [{ required: true, message: '请选择有效开始日期' }]
    },
    remainPrice: {
      rules: [{ required: true, message: '请输入剩余价值' }]
    },
    contractNumber: {
      rules: [
        { required: true, message: '请输入合同编号' },
        {
          pattern: pattern.EN_NUM('6-20'),
          message: '请输入正确合同编号'
        }
      ]
    },
    payType: {
      rules: [{ required: true, message: '请选择支付方式' }]
    },
    handling_fee_reduce: {}
  }
}
