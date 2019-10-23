export const ruleOptions = (vm: any) => {
  return {
    course_id: {},
    course_name: {
      rules: [
        {
          required: true,
          message: '请输入课程名称'
        },
        {
          min: 4,
          message: '支持输入4~30个字的课程名称',
          transform: (v: string) => v.trim()
        }
      ]
    },
    category_id: {
      rules: [
        {
          required: true,
          message: '请选择课程类型'
        },
        {
          validator: (field: any, value: any, values: any) => {
            if (value === -1) {
              return '请选择课程类型'
            }
          }
        }
      ]
    },
    train_aim: {
      rules: [
        {
          required: true,
          message: '请选择训练目的'
        }
      ]
    },
    duration: {
      rules: [
        {
          required: true,
          message: '请输入课程时长'
        }
      ]
    },
    image: {
      rules: []
    },
    description: {
      initialValue: ''
    }
  }
}
