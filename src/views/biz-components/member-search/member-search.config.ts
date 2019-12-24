export const ruleOptions = (vm: any) => {
  const pattern = vm.pattern
  return {
    member_name: {
      rules: [
        {
          validator: (filed: any, value: any, values: any) => {
            if (!value || !value.match(pattern.CN_EN_NUM_SPACE('1-15'))) {
              return '请输入会员姓名，支持格式长度1~15中英文'
            }
          }
        }
      ]
    },
    member_id: {
      rules: [
        {
          validator: (fileds: any, value: any, values: any) => {
            if (!value || value.length > 15) {
              return '请选择会员，查询条件长度15'
            }
          }
        }
      ]
    },
    mobile: {
      initialValue: {
        code_id: 37,
        phone_code: 86,
        phone: ''
      },
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            if (!value || !value.phone) {
              return '请输入手机号'
            }
            if (!pattern.MOBILE.test(value.phone)) {
              return '请输入正确的手机号'
            }
          }
        }
      ]
    },
    parent_name: {
      rules: [
        {
          validator: (fileds: any, value: any, values: any) => {
            if (!value || value.length > 15) {
              return '请输入家长姓名'
            }
          }
        }
      ]
    },
    parent_mobile: {
      initialValue: {
        code_id: 37,
        phone_code: 86,
        phone: ''
      },
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            if (!value || !value.phone) {
              return '请输入手机号'
            }
            if (!pattern.MOBILE.test(value.phone)) {
              return '请输入正确的手机号'
            }
          }
        }
      ]
    },
    is_minors: {
      initialValue: 0,
      rules: []
    },
    parent_user_role: {
      initialValue: 0,
      rules: []
    }
  }
}
