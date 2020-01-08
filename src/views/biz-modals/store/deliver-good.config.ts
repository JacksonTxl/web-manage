export const ruleOptions = (vm: any) => {
  return {
    expressCompany: { rules: [{ required: true, message: '请输入物流公司' }] },
    expressNumber: { rules: [{ required: true, message: '请输入物流单号' }] }
  }
}
