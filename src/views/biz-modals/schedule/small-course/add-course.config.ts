export const ruleOptions = (vm: any) => {
  return {
    start_time: {
      rules: [{ required: true, message: '时间不能为空' }],
      initialValue: vm.time
    },
    course_id: {
      rules: [
        {
          required: true,
          message: '请选择课程'
        }
      ]
    },
    coach_id: {
      rules: [
        {
          required: true,
          message: `请选择${vm.$c('coach')}`
        }
      ]
    },
    court_id: {
      rules: [
        {
          required: true,
          message: '请选择场地'
        }
      ]
    }
  }
}
