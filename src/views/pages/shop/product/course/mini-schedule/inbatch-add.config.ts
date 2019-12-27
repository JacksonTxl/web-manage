export const ruleOptions = (vm: any) => {
  return {
    course_id: {
      rules: [{ required: true, message: '请先选择小班课' }]
    }
  }
}
