export const ruleOptions = (vm: any) => {
  return {
    id: {},
    shopStatus: [
      'shop_status',
      {
        rules: [
          {
            required: true,
            message: '请选择运营状态'
          }
        ]
      }
    ]
  }
}
