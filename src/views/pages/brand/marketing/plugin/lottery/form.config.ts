export const ruleOptions = (vm: any) => {
  const pattern = vm.pattern
  return {
    'activity_base.activity_name': {
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
    'activity_base.activity_description': {
      rules: [
        {
          required: true,
          message: '请输入活动描述'
        }
      ]
    },
    'activity_base.wheel_turn_around': {
      rules: [
        {
          required: true,
          message: '请选择轮播获奖'
        }
      ]
    },
    'activity_base.wheel_share_default': {
      rules: [
        {
          required: true,
          message: '请选择分享设置'
        }
      ]
    },
    'activity_base.share_title': {
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
    'activity_base.share_bg': {},

    join_crowd_all: {
      rules: [
        {
          required: true,
          message: '请填写昵称'
        }
      ]
    },
    'activity_rule.crowd_id': {
      rules: [
        {
          required: true,
          message: '请选择用户'
        }
      ]
    },
    'activity_rule.draw_condition': {
      rules: [
        {
          required: true,
          message: '请选择抽奖条件'
        }
      ]
    },
    'activity_rule.draw_times_type': {
      rules: [
        {
          required: true,
          message: '请选择抽奖机会'
        }
      ]
    },
    'activity_rule.per_times': {},
    'activity_rule.total_times': {
      rules: [
        {
          required: true,
          message: '请填写每日抽奖次数'
        }
      ]
    },
    'activity_prizes.prize_name': {
      rules: [
        {
          required: true,
          message: '请填写奖品名称'
        }
      ]
    },
    'activity_lucky.lucky_name': {
      rules: [
        {
          required: true,
          message: '请填写未中奖奖品名称'
        }
      ]
    },
    'activity_lucky.lucky_image': {
      rules: [
        {
          required: true,
          message: '请填写未中奖奖品地址'
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
