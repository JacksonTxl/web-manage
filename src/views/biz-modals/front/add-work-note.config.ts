export const ruleOptions = (vm: any) => {
  return {
    subject: {
      rules: [{ required: true, message: '请输入待办主题' }]
    },
    content: {
      rules: [{ required: true, message: '请输入待办内容' }]
    }
  }
}
