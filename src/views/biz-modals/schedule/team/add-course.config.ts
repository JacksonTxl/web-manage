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
          message: '请选择教练'
        }
      ]
    },
    court_id: {},
    limit_num: {
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            if (!value) {
              return '请填写人数'
            }
            if (value > 999) {
              return '上课人数不能超过999个'
            }
          }
        }
      ]
    },
    course_fee: {
      rules: [
        {
          required: true,
          message: '请填写课时费'
        }
      ]
    }
  }
}
