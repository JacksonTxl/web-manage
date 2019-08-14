export const ruleOptions = (vm: any) => {
  return {
    startTime: {
      rules: [{ required: true, message: '请选择开始时间' }]
    },
    contractNumber: {
      rules: [{ required: true, message: '请输入合同编号' }]
    },
    surplusPrice: {
      rules: [{ required: true, message: '请输入原卡抵扣' }]
    },
    saleName: {
      rules: [{ required: true, message: '请选择销售人员' }]
    },
    memberCardId: {
      rules: [{ required: true, message: '请选择会员卡' }]
    }
  }
}
