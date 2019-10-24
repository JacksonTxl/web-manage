export const ruleOptions = (vm: any) => {
  const pattern = vm.pattern
  return {
    ticket_name: {
      rules: [
        {
          required: true,
          message: '请输入票种名称'
        },
        {
          pattern: pattern.CN_EN_NUM('1-15'),
          message: '请输入1~10个字符'
        }
      ]
    },
    ticket_price: {
      initialValue: 1,
      rules: [
        {
          required: true,
          message: '请输入价格'
        }
      ]
    },
    ticket_total_num: {
      initialValue: 1,
      rules: [
        {
          required: true,
          message: '请输入票数'
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
      initialValue: 0,
      rules: [
        {
          required: true,
          message: '请输入最少份数'
        }
      ]
    },
    buy_limit_max: {
      initialValue: 0,
      rules: [
        {
          required: true,
          message: '请输入最大份数'
        }
      ]
    },
    group_buy_min: {},
    reduce_price: {},
    buy_time_limit: {
      initialValue: 1,
      rules: [
        {
          required: true,
          message: '请选择时间'
        }
      ]
    },
    buy_time: {},
    ticket_remark: {}
  }
}
