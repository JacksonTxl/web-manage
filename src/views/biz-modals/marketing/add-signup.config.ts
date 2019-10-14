export const ruleOptions = (vm: any) => {
  const pattern = vm.pattern
  return {
    extra_name: {
      rules: [
        {
          required: true,
          message: '请输入活动标题'
        },
        {
          pattern: pattern.CN_EN_NUM('1-15'),
          message: '请输入1~15个字符'
        }
      ]
    },
    extra_type: {
      rules: [
        {
          required: true,
          message: '请选择报名类型'
        }
      ]
    },
    extra_info: {
      rules: [
        {
          required: true,
          message: '请输入活动时间'
        }
      ]
    },
    extra_require: {
      rules: [
        {
          required: true,
          message: '请选择是否必填'
        }
      ]
    }
  }
}
