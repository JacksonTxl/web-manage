export const ruleOptions = (vm: any) => {
  return {
    member_id: {
      rules: [
        {
          required: true,
          message: '请选择会员'
        }
      ]
    },
    consume_type: {
      rules: [
        {
          required: true,
          message: '请选择消费方式'
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
          message: '请选择上课教练'
        }
      ]
    },
    scheduling_id: {
      initialValue: undefined,
      rules: [
        {
          required: true,
          message: '请选择预约日期'
        }
      ]
    },
    reserve_start_time: {
      initialValue: undefined,
      rules: [
        {
          required: true,
          message: '请选择预约时间'
        }
      ]
    }
  }
}
