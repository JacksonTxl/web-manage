export const ruleOptions = (vm: any) => {
  return {
    product_type: {
      rules: [{ required: true, message: '请输入租赁天数' }]
    },
    product_name: {
      rules: [
        {
          validator: (fileds: any, value: any, values: any) => {
            if (!value || value.length > 15) {
              return '请选择商品，查询条件长度15'
            }
          }
        }
      ]
    }
  }
}
