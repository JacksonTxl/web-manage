export const ruleOptions = (vm: any) => {
  return {
    shop_id: {},
    date: {
      rules: [
        {
          required: true,
          message: '请选择放假时间'
        }
      ]
    }
  }
}
