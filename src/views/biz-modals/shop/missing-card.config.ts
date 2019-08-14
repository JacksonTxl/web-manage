export const ruleOptions = (vm: any) => {
  return {
    rfid: {
      rules: [
        {
          required: true,
          message: '请输入正确的实体卡号',
          pattern: /\d$/
        }
      ]
    },
    card_num: {
      rules: [
        {
          required: true,
          message: '请输入正确的物理ID',
          pattern: /\d$/
        }
      ]
    },
    moneyFlag: {
      rules: [
        {
          required: true,
          message: '请选择有无手续费'
        }
      ]
    },
    poundage: {
      rules: [
        {
          required: true,
          message: '请填写手续费',
          pattern: /\d$/
        }
      ]
    },
    pay_method: {
      rules: [
        {
          required: true,
          message: '请选择支付方式'
        }
      ]
    },
    payment: {
      rules: [
        {
          required: true,
          message: '请选择收款方式'
        }
      ]
    },
    payee: {
      rules: [
        {
          required: true,
          message: '请选择收款人员'
        }
      ]
    }
  }
}
