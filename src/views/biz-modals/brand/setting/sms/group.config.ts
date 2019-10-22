export const ruleOptions = (vm: any) => {
  const pattern = vm.pattern
  return {
    user_type: {
      initialValue: 1,
      rules: [
        {
          required: true,
          message: '请选择接收对象'
        }
      ]
    },
    send_value: {
      rules: [
        {
          required: true,
          message: '请输入内容'
        }
      ]
    },
    send_type: {
      initialValue: 1,
      rules: [
        {
          required: true,
          message: ''
        }
      ]
    },
    send_time: {
      rules: [
        {
          required: true,
          message: '请选择时间'
        }
      ]
    },
    title: {},
    content: {},
    tmpl_id: {
      rules: [
        {
          required: true,
          message: '请选择模版'
        }
      ]
    }
  }
}
