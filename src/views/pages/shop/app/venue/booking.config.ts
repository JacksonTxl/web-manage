export const ruleOptions = (vm: any) => {
  return {
    member_id: {
      rules: [{ required: true, message: '预约用户必填' }]
    },
    description: {}
  }
}
