export const ruleOptions = (vm: any) => {
  return {
    coach: {
      rules: [{ required: true, message: `请选择修改${vm.$c('coach')}` }]
    },
    description: {}
  }
}
