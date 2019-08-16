export const ruleOptions = (vm: any) => {
  return {
    start_time: {
      rules: [
        {
          required: true,
          message: '请选择课程开始时间'
        }
      ]
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
    limit_num: {
      rules: [
        {
          required: true,
          message: '请输入人数'
        }
      ]
    },
    course_fee: {
      rules: [
        {
          required: true,
          message: '请输入课时费'
        }
      ]
    }
  }
}
