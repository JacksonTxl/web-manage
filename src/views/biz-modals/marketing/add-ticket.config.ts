export const ruleOptions = (vm: any) => {
  const pattern = vm.pattern
  return {
    ticket_name: {
      rules: [
        {
          required: true,
          message: '请输入活动标题'
        },
        {
          pattern: pattern.CN_EN_NUM('1-15'),
          message: '请输入6~10个字符'
        }
      ]
    },
    ticket_price: {
      rules: [
        {
          required: true,
          message: '请输入价格'
        }
      ]
    },
    ticket_total_num: {
      rules: [
        {
          required: true,
          message: '请输入活动标题'
        }
      ]
    },
    crowd_id: {
      rules: [
        {
          required: true,
          message: '请选择购买用户'
        }
      ]
    },
    buy_limit_min: {
      rules: [
        {
          required: true,
          message: '请输入最少份数'
        }
      ]
    },
    buy_limit_max: {
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            if (!value) {
              return '购买最大分数'
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
    coach_levelRule: {},
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
    id_number: {
      rules: [
        {
          message: '请填写正确的身份证号',
          pattern: pattern.ID
        }
      ]
    },
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
      rules: [{ required: true, message: '请选择教练等级' }]
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
    marry_status: {},
    children_status: {},
    graduation_time: {},
    provinces: { initialValue: [] },
    native_place: {},
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
    description: {
      rules: [
        {
          pattern: pattern.CN_EN_NUM('0-300'),
          message: '请输入0-300个字，中英文及数字'
        }
      ]
    },
    employment_time: {},
    introduction: {
      rules: [
        {
          pattern: pattern.CN_EN_NUM('1-300'),
          message: '请输入1-300个字，中英文及数字'
        }
      ]
    },
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
