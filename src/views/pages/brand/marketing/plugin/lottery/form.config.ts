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
          message: '请输入1~15个字符'
        }
      ]
    },
    'activity_base.activity_description': {
      rules: [
        {
          required: true,
          message: '请输入活动描述'
        },
        {
          pattern: pattern.CN_EN_NUM('1-15'),
          message: '请输入1~15个字符'
        }
      ]
    },
    'activity_base.wheel_turn_around': {
      initialValue: 1,
      rules: [
        {
          required: true,
          message: '请选择轮播获奖'
        }
      ]
    },
    'activity_base.wheel_share_default': {
      initialValue: 1,
      rules: [
        {
          required: true,
          message: '请选择分享设置'
        }
      ]
    },
    'activity_base.activity_sub_name': {
      rules: [
        {
          required: true,
          message: '请输入活动标题'
        },
        {
          pattern: pattern.CN_EN_NUM('1-15'),
          message: '请输入1~15个字符'
        }
      ]
    },
    'activity_base.share_bg': {},
    'activity_base.share_title': {},
    'activity_rule.join_crowd_all': {
      initialValue: 1,
      rules: [
        {
          required: true,
          message: '请选择用户'
        }
      ]
    },
    'activity_rule.crowd_id': {
      rules: [
        {
          message: '请选择用户'
        }
      ]
    },
    'activity_rule.draw_condition': {
      initialValue: 1,
      rules: [
        {
          required: true,
          message: '请选择抽奖条件'
        }
      ]
    },
    'activity_rule.draw_times_type': {
      initialValue: 1,
      rules: [
        {
          required: true,
          message: '请选择抽奖机会'
        }
      ]
    },
    'activity_rule.per_times': {
      rules: [
        {
          required: true,
          message: '请填写每日抽奖次数'
        }
      ]
    },
    'activity_rule.total_times': {
      rules: [
        {
          message: '请填写每日总次数'
        }
      ]
    },
    'activity_rule.prize_times': {
      rules: [
        {
          message: '请填写每日总次数'
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
    }
  }
}
