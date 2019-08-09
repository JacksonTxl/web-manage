import { SHOP_SETTING } from '@/constants/course/personal'
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
    shop_setting: {
      initialValue: SHOP_SETTING.ALL_STORE
    },
    shop_ids: {
      rules: [
        {
          required: true,
          message: '请选择上课门店'
        }
      ]
    },
    coach_ids: {
      rules: []
    },
    course_id: {}
  }
}
