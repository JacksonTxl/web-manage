import { SELL_TYPE, PRICE_SETTING } from '@/constants/course/personal'
export const ruleOptions = (vm: any) => {
  return {
    course_name: {
      rules: [
        {
          required: true,
          message: '请输入课程名称'
        },
        {
          min: 4,
          message: '支持输入4~30个字的课程名称'
        }
      ]
    },
    sell_type: {
      initialValue: [SELL_TYPE.OFFLINE]
    },
    effective_unit: {
      rules: [
        {
          required: true,
          message: '请输入课程有效期'
        }
      ],
      initialValue: 7
    },
    price_setting: {
      initialValue: PRICE_SETTING.UNIFORM_PRICE
    }
  }
}
