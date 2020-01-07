export const ruleOptions = (vm: any) => {
  const pattern = vm.pattern
  return {
    name: {
      rules: [
        {
          required: true,
          message: '请输入姓名'
        },
        {
          pattern: pattern.CN_EN_NUM('0-15'),
          message: '请输入15个字符以内'
        }
      ]
    },
    account: {
      rules: [
        {
          required: true,
          message: '请输入登录账户'
        },
        {
          pattern: pattern.CN_EN_NUM('6-15'),
          message: '请输入6~15个字符'
        }
      ]
    },
    password: {
      rules: [
        {
          required: true,
          message: '请输入登录密码'
        },
        {
          pattern: pattern.CN_EN_NUM('6-15'),
          message: '请输入6~15个字符'
        }
      ]
    },
    repeat_password: {
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            if (!value) {
              return '请输入登录密码'
            }
            if (value.length < 6 || value.length > 15) {
              return '请输入正确格式登录密码'
            }
            if (value !== values.password) {
              return '两次密码输入不一致'
            }
          }
        }
      ]
    },
    staff_name: {
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
    },
    nickname: {
      rules: [
        {
          required: true,
          message: '请填写昵称'
        },
        {
          pattern: pattern.CN_EN_NUM('1-10'),
          message: '请输入1-10个字，中英文及数字'
        }
      ]
    },
    country_code_id: { initialValue: 37 },
    mobile: {
      rules: [
        {
          required: true,
          message: '手机号格式错误',
          pattern: pattern.MOBILE
        }
      ]
    },
    mail: {
      rules: [
        {
          message: '请填写正确格式邮箱号',
          pattern: pattern.EMAIL
        }
      ]
    },
    sex: {
      rules: [{ required: true, message: '请选择你的性别' }]
    },
    id_type: { initialValue: 1 },
    /**
     * TODO: 临时处理一下，待李月处理
     */
    id_number: {
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            if (vm.id_type === 1 && value && !pattern.ID.test(value)) {
              return '请填写正确的身份证号'
            }
            if (vm.id_type === 2 && value && !pattern.ID_CARD.test(value)) {
              return '请填写正确的护照号码'
            }
          }
        }
      ]
    },
    coach_levelRule: {},
    image_avatar: {},
    image_face: {},
    identity: {
      rules: [{ required: true, message: '请选择职能' }]
    },
    department_id: {
      rules: [{ required: true, message: '请选择部门' }]
    },
    staff_num: {
      rules: [
        {
          pattern: pattern.CN_EN_NUM('1-20'),
          message: '请输入1-20个字，中英文及数字'
        }
      ]
    },
    nature_work: {},
    entry_date: {},
    shop_id: {
      rules: [{ required: true, message: '请选择门店' }]
    },
    role_id: {
      rules: [{ required: true, message: '请选择系统角色' }]
    },
    album_id: {},
    is_permission: { initialValue: 0 },
    coach_level_id: {
      rules: [{ required: true, message: `请选择${vm.$c('coach')}等级` }]
    },
    graduated_school: {
      rules: [
        {
          pattern: pattern.CN_EN_NUM('1-100'),
          message: '请输入1-100个字，中英文及数字'
        }
      ]
    },
    education: {},
    birthday: {},
    native_place: {},
    children_status: {},
    marry_status: {},
    graduation_time: {},
    profession: {
      rules: [
        {
          pattern: pattern.CN_EN_NUM('1-50'),
          message: '请输入1-50个字，中英文及数字'
        }
      ]
    },
    address: {
      rules: [
        {
          pattern: pattern.CN_EN_NUM('0-100'),
          message: '请输入0-100个字，中英文及数字'
        }
      ]
    },
    description: {},
    employment_time: {},
    introduction: {},
    specialty_id: {},
    certification_name: {
      rules: [
        {
          pattern: pattern.CN_EN_NUM('1-100'),
          message: '请输入1-100个字，中英文及数字'
        }
      ]
    },
    is_show: {}
  }
}
