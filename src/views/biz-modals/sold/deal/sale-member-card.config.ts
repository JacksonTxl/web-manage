export const ruleOptions = (vm: any) => {
  const pattern = vm.pattern
  return {
    memberName: {
      rules: [
        {
          validator: (filed: any, value: any, values: any) => {
            if (!value || !value.match(pattern.CN_EN_NUM_SPACE('1-15'))) {
              return '请输入会员姓名，支持格式长度1~15中英文'
            }
          }
        }
      ]
    },
    memberId: {
      rules: [
        {
          validator: (fileds: any, value: any, values: any) => {
            if (!value || value.length > 15) {
              return '请选择转让会员，查询条件长度15'
            }
          }
        }
      ]
    },
    memberMobile: {
      rules: [
        { required: true, message: '请输入手机号' },
        {
          pattern: pattern.MOBILE,
          message: '输入的手机号格式错误，请重新输入'
        }
      ]
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
    specs: {},
    open_type: {},
    saleName: {
      rules: [{ required: true, message: '请选择销售人员' }]
    }
  }
}
