export const ruleOptions = (vm: any) => {
  const pattern = vm.pattern
  return {
    card_name: {
      rules: [{ required: true, message: '名称必填' }]
    },
    setting_name: [
      {
        rules: [
          {
            pattern: pattern.CN_EN_NUM_SPACE('1-20'),
            message: '1-20个字，支持中英文、数字'
          }
        ]
      }
    ],
    card_price: {
      rules: [
        {
          validator: (field, value, values) => {
            if (values.card_name) {
              if (!value) {
                return '价格必填'
              }
              if (value < 5) {
                return '价格不能小于5元'
              }
            }
          }
        }
      ]
    }
  }
}
