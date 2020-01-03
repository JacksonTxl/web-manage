export const ruleOptions = (vm: any) => {
  return {
    start_days: {
      rules: [{ required: true, message: '日期不能为空' }],
      initialValue: vm.time
    },
    course_id: {
      rules: [
        {
          required: true,
          message: '请选择课程'
        }
      ]
    }
  }
}
