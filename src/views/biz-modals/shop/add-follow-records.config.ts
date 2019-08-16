export const ruleOptions = (vm: any) => {
  return {
    follow_way: {},
    follow_status: {},
    follow_next_time: {},
    follow_content: {
      rules: [{ required: true, message: '请填写跟进内容' }]
    }
  }
}
