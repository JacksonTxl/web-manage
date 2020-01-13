export const ruleOptions = (vm: any) => {
  const pattern = vm.pattern
  return {
    contractNumber: {
      rules: [
        { required: true, message: '请输入合同编号' },
        {
          pattern: pattern.EN_NUM('6-20'),
          message: '请输入正确合同编号'
        }
      ]
    },
    specs: {},
    open_type: {},
    saleName: {
      rules: [{ required: true, message: '请选择销售人员' }]
    }
  }
}
