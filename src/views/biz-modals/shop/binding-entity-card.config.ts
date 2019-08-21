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
    }
  }
}
