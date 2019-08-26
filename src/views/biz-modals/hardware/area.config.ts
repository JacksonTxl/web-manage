export const ruleOptions = (vm: any) => {
  return {
    area_id: {},
    people_type: {
      rules: [
        {
          required: true,
          message: '请选择人员范围'
        }
      ]
    },

    course_time: {
      rules: [
        {
          required: true,
          message: '请输入时间'
        }
      ]
    },
    leave_limit: {
      rules: [
        {
          required: true,
          message: '请选择人员范围'
        }
      ]
    },
    checkin: {
      initialValue: 0
    },
    white_list: {
      rules: [
        {
          required: true,
          message: '请选择指定员工'
        }
      ]
    }
  }
}
