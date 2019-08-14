export const ruleOptions = (vm: any) => {
  return {
    height: {},
    weight: {},
    body_fat_rate: {},
    basal_metabolism: {},
    fat_content: {},
    skeletal_muscle_content: {},
    bust: {},
    namwaistlinee: {},
    hipline: {},
    id: {},
    test_time: {
      rules: [{ required: true, message: '请填写时间' }]
    }
  }
}
