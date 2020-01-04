export const ruleOptions = (vm: any) => {
  return {
    sku_name: {
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            if (!value) {
              return '请填写规格名称'
            }
            if (!value.match(vm.pattern.CN_EN_NUM_SPACE('1-20'))) {
              return '请输入规格名称，支持格式长度1~20中英文'
            }
          }
        }
      ]
    }
  }
}
