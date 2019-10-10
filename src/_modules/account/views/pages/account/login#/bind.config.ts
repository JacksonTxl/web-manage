export const rules = () => {
  return {
    name: [
      'name',
      {
        rules: [
          {
            required: true,
            message: '请输入用户名或登录邮箱'
          }
        ]
      }
    ],
    password: [
      'password',
      {
        rules: [
          {
            required: true,
            message: '请输入密码'
          }
        ]
      }
    ]
  }
}
