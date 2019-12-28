export const ruleOptions = (vm: any) => {
  return {
    start_days: {
      rules: [{ required: true, message: '请选择预约日期' }]
    },
    start_time: {
      rules: [{ required: true, message: '请选择开始时间' }]
    },
    end_time: {
      rules: [{ required: true, message: '请选择结束时间' }]
    },
    current_course_name: {
      rules: [{ required: true, message: '请输入课程名称' }]
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
