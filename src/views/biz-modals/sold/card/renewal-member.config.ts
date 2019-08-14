export const ruleOptions = (vm: any) => {
  return {
    startTime: {
      rules: [{ required: true, message: '请选择开始时间' }]
    },
    saleName: {
      rules: [{ required: true, message: '请选择销售人员' }]
    },
    contractNumber: {
      rules: [{ required: true, message: '请输入合同编号' }]
    }
  }
}
