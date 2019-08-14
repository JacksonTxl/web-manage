export const ruleOptions = (vm: any) => {
  return {
    account_name: {
      rules: [{ required: true, message: '请输入姓名' }]
    },
    card_number: {
      rules: [{ required: true, message: '请输入姓名' }]
    },
    bank_name: {
      rules: [{ required: true, message: '请输入开户银行' }]
    }
  }
}
