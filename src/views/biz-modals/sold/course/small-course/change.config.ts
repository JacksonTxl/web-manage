export const ruleOptions = (vm: any) => {
  return {
    course_id: {
      rules: [{ required: true, message: `请选择${vm.$c('small_course')}` }]
    },
    course_num: {
      rules: [{ required: true, message: `请填写课时` }]
    },
    contract_number: {
      rules: [{ required: true, message: '请输入合同编号' }]
    },
    old_course_price: {
      rules: [{ required: true, message: '请输入原卡抵扣' }]
    },
    saleName: {
      rules: [{ required: true, message: '请选择销售人员' }]
    }
  }
}
