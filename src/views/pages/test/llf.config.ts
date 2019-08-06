export const ruleOptions = (vm: any) => {
  return {
    'cardData.user_name': {
      rules: [{ required: true, message: 'haha' + vm.a }]
    }
  }
}
