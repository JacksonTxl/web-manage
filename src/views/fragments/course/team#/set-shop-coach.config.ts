import { SHOP_SETTING } from '@/constants/course/team'
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
          message: '支持输入4~30个字的课程名称',
          transform: (v: string) => v.trim()
        }
      ]
    },
    shop_setting: {
      initialValue: SHOP_SETTING.ALL_STORE
    }
  }
}
