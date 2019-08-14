export const ruleOptions = (vm: any) => {
  return {
    refundPrice: {
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            if (!value) {
              return '请输入退款金额'
            }
            if (parseInt(value, 10) > parseInt(vm.info.actual_price, 10)) {
              return '退款金额不能大于实收金额'
            }
          }
        }
      ]
    }
  }
}
