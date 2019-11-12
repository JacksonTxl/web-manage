export const ruleOptions = (vm: any) => {
  return {
    valid_time: {
      rules: [
        {
          validator: (rule: any, value: any, values: any) => {
            // let price = 0
            // if (vm.info.price_model === 1) {
            //   // 教练平级
            //   price = vm.personalPrice.min_sell
            // } else {
            //   price = vm.minPrice
            // }
            if (!value) {
              return '请输入初始额度'
            }
            if (!vm.isAmountDisabled) {
              return '初始额度未确认，请点击确定'
            }
          }
        }
      ]
    },
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
      rules: [{ required: true, message: `请选择${vm.$c('member_card')}` }]
    }
  }
}
