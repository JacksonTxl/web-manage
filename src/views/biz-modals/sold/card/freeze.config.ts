export const ruleOptions = (vm: any) => {
  return {
    end_time: {
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            if (!value) {
              return '请选择冻结结束日期'
            }
          }
        }
      ]
    },
    poundage: {},
    pay_method: {
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            if (!value) {
              return '请选择支付方式'
            }
          }
        }
      ]
    }
  }
}
