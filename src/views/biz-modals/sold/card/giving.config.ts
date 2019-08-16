export const ruleOptions = (vm: any) => {
  return {
    gift_quota: {
      rules: [{ required: true, message: '请输入赠送额度' }]
    }
  }
}
