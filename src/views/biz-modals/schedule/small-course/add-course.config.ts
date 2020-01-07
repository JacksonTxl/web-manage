export const ruleOptions = (vm: any) => {
  return {
    start_days: {
      rules: [{ required: true, message: '时间不能为空' }]
    },
    start_time: {
      rules: [
        { required: true, message: '请选择开始时间' },
        {
          validator: (filed: any, value: any, values: any) => {
            if (value && value > values.end_time) {
              return '开始时间不能大于结束时间'
            }
            if (value && value < vm.startTime) {
              return '开始时间不能小于开班时间'
            }
          }
        }
      ]
    },
    end_time: {
      rules: [
        { required: true, message: '请选择结束时间' },
        {
          validator: (filed: any, value: any, values: any) => {
            if (value && value < values.start_time) {
              return '结束时间不能小于开始时间'
            }
          }
        }
      ]
    },
    course_id: {
      rules: [
        {
          required: true,
          message: '请输入课程'
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
    current_course_name: {
      rules: [{ required: false, message: '请输入课程名称' }]
    }
  }
}
