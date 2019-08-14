import { PatternService } from '@/services/pattern.service'
export const ruleOptions = (vm: any) => {
  const pattern = new PatternService()
  return {
    first_letter: {
      rules: [
        {
          pattern: pattern.EN('1-1'),
          message: '请输入正确的首字母'
        }
      ]
    },
    start_num: {
      rules: [
        {
          required: true,
          message: '请输入起始编号'
        }
      ]
    },
    num: {
      rules: [
        {
          required: true,
          message: '请输入柜子数量'
        }
      ]
    },
    sort_type: {
      rules: [
        {
          required: true,
          message: '请输入递增方式'
        }
      ]
    },
    price_num: {
      rules: [
        {
          required: true,
          message: '请输入售卖价格'
        }
      ]
    },
    transfer_num: {},
    use_status: {
      rules: [
        {
          required: true,
          message: '请选择可用状态'
        }
      ]
    },
    reason: {
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            if (values.use_status === 2) {
              if (!value) {
                return '请输入不可用原因'
              }
              const ptn = pattern.CN_EN_NUM_SPACE('1-30') || new RegExp('')
              if (!ptn.test(value)) {
                return '不可用原因格式错误'
              }
            }
          }
        }
      ]
    }
  }
}
