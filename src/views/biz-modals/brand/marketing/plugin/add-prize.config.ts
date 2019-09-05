export const ruleOptions = (vm: any) => {
  const pattern = vm.pattern
  return {
    prize_name: {
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
    prize_type: {
      initialValue: 1,
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
      initialValue: 1,
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
    rate: {
      rules: [
        {
          required: true,
          message: '请填写概率'
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
    image: {}
  }
}
