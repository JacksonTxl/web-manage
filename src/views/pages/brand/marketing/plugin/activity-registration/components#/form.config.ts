export const ruleOptions = (vm: any) => {
  const pattern = vm.pattern
  return {
    activity_name: {
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
    date: {
      rules: [
        {
          required: true,
          message: '请输入活动时间'
        }
      ]
    },
    member_limit_num: {
      rules: [
        {
          required: true,
          message: '请输入活动限制人数'
        },
        {
          validator: (field: any, value: any, values: any) => {
            if (!vm.defaultForm$) return
            const memberLimitNum = vm.defaultForm$.member_limit_num
            if (value < memberLimitNum) {
              return `编辑活动时，活动人数不能小于${memberLimitNum}`
            }
          }
        }
      ]
    }
  }
}
