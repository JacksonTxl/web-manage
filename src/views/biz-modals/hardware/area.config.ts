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
      initialValue: vm.leave_limit
    },
    checkin: {
      initialValue: vm.checkin
    },
    white_list: {
      initialValue: vm.white_list,
      rules: [
        {
          required: true,
          message: '请选择指定员工'
        }
      ]
    }
  }
}
