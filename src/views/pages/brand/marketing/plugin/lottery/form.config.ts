export const ruleOptions = (vm: any) => {
  const pattern = vm.pattern
  return {
    activity_name: {
      rules: [
        {
          required: true,
          message: '请输入活动名称'
        },
        {
          pattern: pattern.CN_EN_NUM('1-15'),
          message: '请输入1~15d个字符'
        }
      ]
    },
    start_time: {
      rules: [
        {
          required: true,
          message: '请输入登录账户'
        },
        {
          pattern: pattern.CN_EN_NUM('1-15'),
          message: '请输入6~15个字符'
        }
      ]
    },
    end_time: {
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
    activity_description: {
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
    wheel_turn_around: {
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
    wheel_share_default: {
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
    share_title: {},
    share_bg: { initialValue: 37 },

    join_crowd_all: {
      rules: [
        {
          required: true,
          message: '请填写昵称'
        }
      ]
    },
    crowd_id: {
      rules: [
        {
          required: true,
          message: '请填写昵称'
        }
      ]
    },
    draw_condition: {
      rules: [
        {
          required: true,
          message: '请填写昵称'
        }
      ]
    },
    draw_times_type: {
      rules: [
        {
          required: true,
          message: '请填写昵称'
        }
      ]
    },
    per_times: {
      rules: [
        {
          required: true,
          message: '请填写昵称'
        }
      ]
    },
    total_times: {
      rules: [
        {
          required: true,
          message: '请填写昵称'
        }
      ]
    },
    prize_times: {
      rules: [
        {
          required: true,
          message: '请填写昵称'
        }
      ]
    },

    prize_name: {
      rules: [
        {
          required: true,
          message: '请填写昵称'
        }
      ]
    },
    prize_type: {
      rules: [
        {
          required: true,
          message: '请填写昵称'
        }
      ]
    },
    coupon_id: {
      rules: [
        {
          required: true,
          message: '请填写昵称'
        }
      ]
    },
    prize_id: {
      rules: [
        {
          required: true,
          message: '请填写昵称'
        }
      ]
    },
    is_shop_range: {
      rules: [
        {
          required: true,
          message: '请填写昵称'
        }
      ]
    },
    support_shop_ids: {
      rules: [
        {
          required: true,
          message: '请填写昵称'
        }
      ]
    },
    valid_days: {
      rules: [
        {
          required: true,
          message: '请填写昵称'
        }
      ]
    },
    number: {
      rules: [
        {
          required: true,
          message: '请填写昵称'
        }
      ]
    },
    image: {
      rules: [
        {
          required: true,
          message: '请填写昵称'
        }
      ]
    }
  }
}
