export const ruleOptions = (vm: any) => {
  const { pattern } = vm
  return {
    area_name: {
      rules: [
        {
          required: true,
          pattern: pattern.CN_EN_NUM('1-10'),
          message: '支持输入中英文、数字,不超过10个字'
        }
      ]
    },
    contain_number: {
      rules: [
        {
          required: true,
          message: '请输入场地容纳人数'
        }
      ]
    },
    area_type: {
      rules: [
        {
          required: true,
          message: '请选择场地属性'
        }
      ]
    }
  }
}
