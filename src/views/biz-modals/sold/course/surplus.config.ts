import { forEach } from 'lodash-es'
export const ruleOptions = (vm: any) => {
  let rules: any = {}
  vm.courseList.forEach((item: any, index: any) => {
    rules[`num-${index}`] = {
      rules: [
        {
          required: true,
          message: '请输入课时'
        }
      ]
    }
  })

  return rules
}
