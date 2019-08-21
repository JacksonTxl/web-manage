export const ruleOptions = (vm: any) => {
  const patter = vm.pattern
  return {
    card_number: {
      rules: [{ required: true, message: '请输入实体卡号' }]
    },
    physical_number: [
      {
        rules: [{ required: true, message: '请输入物理ID' }]
      }
    ]
  }
}
