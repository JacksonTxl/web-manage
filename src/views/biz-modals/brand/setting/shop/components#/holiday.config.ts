export const ruleOptions = (vm: any) => {
  return {
    shop_id: {},
    start_time: {
      rules: [
        {
          required: true,
          message: '请输入放假开始时间'
        }
      ]
    },
    end_time: {
      rules: [
        {
          required: true,
          message: '请输入放假结束时间'
        }
      ]
    }
  }
}
