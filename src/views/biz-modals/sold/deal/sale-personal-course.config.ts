export const ruleOptions = (vm: any) => {
  const pattern = vm.pattern
  return {
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
