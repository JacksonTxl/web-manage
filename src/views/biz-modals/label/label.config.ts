export const ruleOptions = (vm: any) => {
  return {
    tag_name: {
      rules: [
        {
          required: true,
          message: '请输入标签名称，长度1~10中英文',
          pattern: vm.pattern.CN_EN('1-10')
        }
      ]
    }
  }
}
