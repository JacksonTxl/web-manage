export const ruleOptions = (vm: any) => {
  const pattern = vm.pattern
  return {
    extra_name: {
      rules: [
        {
          required: true,
          message: '请输入报名选项'
        },
        {
          pattern: pattern.CN_EN_NUM('1-15'),
          message: '请输入1~15个字符'
        },
        {
          validator: (field: any, value: any, values: any) => {
            const signUpNames = vm.signUpList.map(
              (item: any) => item.extra_name
            )
            if (signUpNames.includes(value)) {
              return '票种名称重复请重新输入'
            }
          }
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
