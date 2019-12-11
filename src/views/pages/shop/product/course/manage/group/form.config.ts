export const ruleOptions = (vm: any) => {
  const pattern = vm.pattern
  return {
    course_name: {
      rules: [
        {
          required: true,
          message: '请输入'
        },
        {
          pattern: pattern.CN_EN_NUM('1-30'),
          message: '请输入1~30个字的课程名称'
        }
      ]
    },
    // scope_application: {
    //   rules: [
    //     {
    //       required: true,
    //       message: '请输入'
    //     }
    //   ]
    // },
    date: {
      rules: [
        {
          required: true,
          message: '请选择时间'
        }
      ]
    },
    num_min: {
      rules: [
        {
          required: true,
          message: '请输入报名人数下限'
        }
      ]
    },
    num_max: {
      rules: [
        {
          required: true,
          message: '请输入报名人数上限'
        }
      ]
    },
    course_times: {
      rules: [
        {
          required: true,
          message: '请输入用户名'
        },
        {
          pattern: pattern.CN_EN_NUM('1-15'),
          message: '请输入1-15个字符'
        }
      ]
    }
    // img_type: {
    //   rules: [
    //     {
    //       required: true,
    //       message: '手机号格式错误',
    //       pattern: pattern.MOBILE
    //     }
    //   ]
    // }
  }
}
