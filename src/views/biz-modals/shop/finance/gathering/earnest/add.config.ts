export const ruleOptions = (vm: any) => {
  const pattern = vm.pattern
  return {
    member_name: {
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
    member_id: {
      rules: [
        {
          validator: (fileds: any, value: any, values: any) => {
            if (!value || value.length > 15) {
              return '请选择会员，查询条件长度15'
            }
          }
        }
      ]
    },
    mobile: {
      rules: [
        { required: true, message: '请输入手机号' },
        {
          pattern: pattern.MOBILE,
          message: '输入的手机号格式错误，请重新输入'
        }
      ]
    },
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
    sale_id: {
      rules: [{ required: true, message: '请选择销售人员' }]
    }
  }
}
