export const rules = (vm: any) => {
  const pattern = vm.pattern
  return {
    id: ['id'],
    settingName: [
      'setting_name', {
        rules: [{
          required: true,
          pattern: pattern.CN_EN_NUM_SPACE('1-20'),
          message: '1-20个字，支持中英文、数字'
        }]
      }
    ]
  }
}