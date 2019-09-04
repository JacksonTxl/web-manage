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
          message: '请输入时间'
        }
      ]
    },
    end_time: {
      rules: [
        {
          required: true,
          message: '请输入时间'
        }
      ]
    },
    activity_description: {
      rules: [
        {
          required: true,
          message: '请输入活动描述'
        }
      ]
    },
    wheel_turn_around: {
      rules: [
        {
          required: true,
          message: '请选择轮播获奖'
        }
      ]
    },
    wheel_share_default: {
      rules: [
        {
          required: true,
          message: '请选择分享设置'
        }
      ]
    },
    share_title: {
      rules: [
        {
          required: true,
          message: '请输入活动标题'
        },
        {
          pattern: pattern.CN_EN_NUM('1-15'),
          message: '请输入1~15d个字符'
        }
      ]
    },
    share_bg: {},

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
          message: '请选择用户'
        }
      ]
    },
    draw_condition: {
      rules: [
        {
          required: true,
          message: '请选择抽奖条件'
        }
      ]
    },
    draw_times_type: {
      rules: [
        {
          required: true,
          message: '请选择抽奖机会'
        }
      ]
    },
    per_times: {},
    total_times: {
      rules: [
        {
          required: true,
          message: '请填写每日抽奖次数'
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
