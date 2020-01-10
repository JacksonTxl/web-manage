export const ruleOptions = (vm: any) => {
  return {
    templateName: {
      rules: [{ required: true, message: '请输入课程名' }]
    },
    maxNumber: {
      rules: [{ required: true, message: '请输入排课限制' }]
    },
    dateTime: {
      rules: [{ required: true, message: '请选择起止时间' }]
    }
  }
}
