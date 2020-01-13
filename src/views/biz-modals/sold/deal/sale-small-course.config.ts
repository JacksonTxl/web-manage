export const ruleOptions = (vm: any) => {
  const pattern = vm.pattern
  return {
    course_num: {
      rules: [{ required: true, message: `请输入购买课时` }]
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
    gift_course_num: {},
    coursePrice: {
      rules: [{ required: true, message: '请输入课程的单价' }]
    },
    saleName: {
      rules: [{ required: true, message: '请选择销售人员' }]
    }
  }
}
