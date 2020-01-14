export const ruleOptions = (vm: any) => {
  return {
    templateName: {
      rules: [{ required: true, message: '请输入课程名' }]
    },
    maxNumber: {
      rules: [{ required: false }]
    },
    dateTime: {
      rules: [{ required: true, message: '请选择起止时间' }]
    }
  }
}
