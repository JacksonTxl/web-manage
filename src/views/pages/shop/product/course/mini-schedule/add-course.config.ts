export const ruleOptions = (vm: any) => {
  return {
    start_days: {
      rules: [{ required: true, message: '请选择预约日期' }]
    },
    start_time: {
      rules: [{ required: true, message: '请选择预约时间' }]
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
