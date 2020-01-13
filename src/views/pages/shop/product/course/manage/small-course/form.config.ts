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
        },
        {
          validator: (field: any, value: any, values: any) => {
            if (value.length > 3) {
              return '最多只能选择3个适用范围'
            }
          }
        }
      ]
    },
    date: {
      rules: [
        {
          required: true,
          message: '请选择时间'
        },
        {
          validator: (field: any, value: any, values: any) => {
            if (values.date[1] - values.date[0] > 15552000000) {
              return '开始时间与结束时间间隔不能超过6个月'
            }
          }
        }
      ]
    },
    num_min: {
      rules: [
        {
          required: true,
          message: '请输入报名人数下限'
        },
        {
          validator: (field: any, value: any, values: any) => {
            if (parseInt(value, 10) > parseInt(values.num_max, 10)) {
              return '报名人数下限不能大于报名人数上限'
            }
          }
        }
      ]
    },
    num_max: {
      rules: [
        {
          required: true,
          message: '请输入报名人数上限'
        },
        {
          validator: (field: any, value: any, values: any) => {
            if (parseInt(value, 10) < parseInt(values.num_min, 10)) {
              return '报名人数上限不能小于报名人数下限'
            }
          }
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
    is_leave: {
      initialValue: 0
    },
    leave_hours: {},
    leave_limit: {},
    appointment_rights: {},
    image: {},
    // description: {},
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
    is_allow_transfer: {
      initialValue: 1
    },
    transfer_num: {},
    transfer_type: {
      initialValue: 2
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
    },
    description: {
      initialValue: vm.info ? vm.info.info.description : ''
    }
  }
}
