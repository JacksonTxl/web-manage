export const ruleOptions = (vm: any) => {
  return {
    price: {
      rules: [{ required: true, message: '请输入支付金额!' }]
    },
    payment_method: {
      rules: [{ required: true, message: '请选择支付方式!' }]
    },
    deposit_card_id: {
      rules: [{ required: true, message: '请选择储值卡!' }]
    }
  }
}
