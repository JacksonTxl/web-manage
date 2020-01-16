export const ruleOptions = (vm: any) => {
  const pattern = vm.pattern
  return {
    prize_name: {
      rules: [
        {
          validator: (filed: any, value: any, values: any) => {
            if (!value || !value.match(vm.pattern.CN_EN_NUM_SPACE('1-10'))) {
              return '请输入奖品名称，支持格式长度1-10个字符'
            }
          }
        }
      ]
    },
    prize_type: {
      initialValue: 2,
      rules: [
        {
          required: true,
          message: '请选择类型'
        }
      ]
    },
    coupon_id: {},
    prize_id: {},
    activity_prize_id: {},
    is_shop_range: {
      initialValue: 2,
      rules: [
        {
          required: true,
          message: '请选择门店类型'
        }
      ]
    },
    support_shop_ids: {
      rules: [
        {
          // required: true,
          message: '请门店id'
        }
      ]
    },
    image_default: {
      initialValue: 1,
      rules: [
        {
          required: true,
          message: '请选择图片类型'
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
          message: '请填写数量'
        }
      ]
    },
    valid_days: {
      initialValue: 1
    },
    prize: {
      initialValue: 1,
      rules: [
        {
          required: true,
          message: '请选择图片'
        }
      ]
    }
  }
}
