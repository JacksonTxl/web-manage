export const ruleOptions = (vm: any) => {
  const pattern = vm.pattern
  return {
    title: {
      rules: [
        {
          required: true,
          message: '请输入模版名称'
        },
        {
          validator: (field: any, value: any, values: any) => {
            if (value && value.length > 8) {
              return '请输入1-8个字符'
            }
          }
        }
      ]
    },
    content: {
      rules: [
        {
          required: true,
          message: '请输入模版内容'
        }
      ]
    }
  }
}
