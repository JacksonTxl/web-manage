export const ruleOptions = (vm: any) => {
  return {
    start_days: {
      rules: [{ required: true, message: '时间不能为空' }],
      initialValue: vm.time
    },
    start_time: {
      rules: [{ required: true, message: '请选择开始时间' }]
    },
    end_time: {
      rules: [{ required: true, message: '请选择结束时间' }]
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
    },
    course_name: {
      rules: [{ required: true, message: '请输入课程名称' }]
    }
  }
}
