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
      initialValue: 1,
      rules: []
    },
    contractNumber: {
      rules: [
        { required: true, message: '请输入合同编号' },
        {
          pattern: pattern.EN_NUM('6-20'),
          message: '请输入正确合同编号'
        }
      ]
    },
    coach_level: {
      rules: [{ required: true, message: `请选择${vm.$c('coach')}等级` }]
    },
    buyNum: {
      rules: [
        {
          validator: (rule: any, value: any, values: any) => {
            let price = 0
            if (vm.info.price_model === 1) {
              // 教练平级
              price = vm.personalPrice.min_sell
            } else {
              price = vm.minPrice
            }
            if (!value) {
              return '请输入购买数量'
            } else if (value < price) {
              return `不能少于课程定价的最低购买节数${price}`
            }
            if (!vm.isAmountDisabled) {
              return '购买数量未确认，请点击确定'
            }
          }
        }
      ]
    },
    coachId: {
      rules: [{ required: true, message: `请选择上课${vm.$c('coach')}` }]
    },
    gift_course_num: {},
    coursePrice: {
      rules: [{ required: true, message: '请输入课程的单价' }]
    },
    saleName: {
      rules: [{ required: true, message: '请选择销售人员' }]
    }
  }
}
