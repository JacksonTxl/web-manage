export const ruleOptions = (vm: any) => {
  const pattern = vm.pattern
  return {
    course_name: {
      rules: [
        {
          required: true,
          message: '请输入请输入1~30个字的课程名称'
        },
        {
          pattern: pattern.CN_EN_NUM('1-30'),
          message: '请输入1~30个字的课程名称'
        }
      ]
    },
    scope_application: {
      rules: [
        {
          required: true,
          message: '请选择范围'
        }
      ]
    },
    date: {
      rules: [
        {
          required: true,
          message: '请选择时间'
        }
      ]
    },
    num_min: {
      rules: [
        {
          required: true,
          message: '请输入报名人数下限'
        }
      ]
    },
    num_max: {
      rules: [
        {
          required: true,
          message: '请输入报名人数上限'
        }
      ]
    },
    course_times: {
      rules: [
        {
          required: true,
          message: '请输入总课时'
        }
      ]
    },
    // img_type: {
    //   rules: [
    //     {
    //       required: true,
    //       message: '手机号格式错误',
    //       pattern: pattern.MOBILE
    //     }
    //   ]
    // },
    is_leave: {
      initialValue: 0,
      rules: [
        {
          required: true,
          message: '请输入请假限制'
        }
      ]
    },
    leave_hours: {},
    leave_limit: {},
    appointment_rights: {},
    image: {},
    description: {},
    coach_ids: {
      rules: [
        {
          required: true,
          message: '请选择教练'
        }
      ]
    },
    staff_id: {
      rules: [
        {
          required: true,
          message: '请选择负责人'
        }
      ]
    },
    apply_date: {
      rules: [
        {
          required: true,
          message: '请选择时间'
        }
      ]
    },
    is_allow_transfer: {},
    transfer_num: {},
    transfer_type: {
      initialValue: 1
    },
    sales_price: {
      rules: [
        {
          required: true,
          message: '请填写售卖价格'
        }
      ]
    },
    sell_type: {
      rules: [
        {
          required: true,
          message: '请选择售卖方式'
        }
      ],
      initialValue: [2]
    }
  }
}
