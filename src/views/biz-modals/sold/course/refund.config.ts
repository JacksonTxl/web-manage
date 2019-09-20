export const ruleOptions = (vm: any) => {
  return {
    refundPrice: {
      rules: [
        { required: true, message: '请输入退款金额' },
        {
          validator: (field: any, value: number) => {
            if (Number(value) > Number(vm.packageInfo.total_price)) {
              return '退款金额不能大于订单总额'
            }
          }
        }
      ]
    }
  }
}
