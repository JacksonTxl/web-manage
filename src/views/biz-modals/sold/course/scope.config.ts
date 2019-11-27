export const ruleOptions = (vm: any) => {
  return {
    add_courses: {
      rules: [{ required: true, message: '请输入赠送额度' }]
    },
    content: {}
  }
}
