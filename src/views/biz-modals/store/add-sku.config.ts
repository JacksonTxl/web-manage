export const ruleOptions = (vm: any) => {
  return {
    sku_name: {
      rules: [
        {
          required: true,
          message: '请输入规格名称',
          pattern: vm.pattern.CN_EN('1-30')
        }
      ]
    }
  }
}
