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
          message: '请输入1~10个字符'
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
    group_buy_min: {},
    reduce_price: {},
    buy_time_limit: {},
    buy_time: {},
    ticket_remark: {}
  }
}
