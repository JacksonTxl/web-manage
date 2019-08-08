export const ruleOptions = (vm: any) => {
  return {
    template_name: {
      rules: [{ required: true, message: '请输入模板名称', max: 15 }]
    },
    performance_type: {
      initialValue: 1,
      rules: [{ required: true, message: '请选择业绩类型' }]
    },
    performance_mode: {
      rules: [{ required: true, message: '请选择提成模式' }]
    },
    performance_num: {
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            let performance_mode = values.performance_mode
            if (!value) {
              return '请输入默认提成'
            }
            if (performance_mode === 1) {
              if (value > 100 || value < 0) {
                return '请输入大于0且小于等于100的值'
              }
            }
            if (performance_mode === 2) {
              if (value > 999999) {
                return '请输入大于0且小于等于999999的值'
              }
            }
          }
        }
      ]
    }
  }
}
