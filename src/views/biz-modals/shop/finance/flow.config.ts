export const ruleOptions = (vm: any) => {
  return {
    reason: {
      rules: [{ required: true, message: '请输入冲销原因' }]
    },
    price: {
      rules: [
        {
          required: true,
          message: '请输入新流水金额'
        }
      ]
    },
    flow_time: {
      rules: [{ required: true, message: '请选择开始售卖时间' }]
    }
  }
}
