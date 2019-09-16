export const ruleOptions = (vm: any) => {
  const pattern = vm.pattern
  return {
    prize_name: {
      rules: [
        {
          required: true,
          message: '请输入奖品名称'
        },
        {
          pattern: pattern.CN_EN_NUM('1-10'),
          message: '请输入1~10个字符'
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
    prize_id: {
      rules: [
        {
          message: '请填写昵称'
        }
      ]
    },
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
