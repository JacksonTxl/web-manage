import {
  ADMISSION_RANGE,
  PRICE_SETTING,
  SUPPORT_SALES
} from '@/constants/card/member'
export const ruleOptions = (vm: any) => {
  return {
    'cardData.card_name': {
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            if (value === undefined || value === '') {
              return '请填写次卡名称'
            }
            if (value && !vm.rules.card_name.test(value)) {
              return '输入的次卡名称格式错误，请重新输入'
            }
          }
        }
      ]
    },
    'cardData.admission_range': {
      initialValue: ADMISSION_RANGE.ONLY_STORE,
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            if (
              value === ADMISSION_RANGE.GENERAL_STORE &&
              !vm.cardData.admission_shop_list.length
            ) {
              return '请添加支持入场门店'
            }
          }
        }
      ]
    },
    'cardData.price_setting': {
      validateTrigger: 'blur',
      initialValue: PRICE_SETTING.UNIFORM_PRICE,
      rules: [
        {
          validator: (field: any, value: any, values: any) => {}
        }
      ]
    },
    'cardData.support_sales': {
      validateTrigger: 'blur',
      initialValue: SUPPORT_SALES.ALL_STORE,
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            if (
              value === SUPPORT_SALES.SPECIFIED_STORE &&
              !vm.cardData.sell_shop_list.length
            ) {
              return '请添加支持售卖门店'
            }
          }
        }
      ]
    },
    start_time: {
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            if (!value) {
              return '请选择开始售卖时间'
            }
          }
        }
      ]
    },
    end_time: {
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            if (!value) {
              return '请选择结束售卖时间'
            }
          }
        }
      ]
    },
    'cardData.num': {
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            if (vm.cardData._is_transfer && !value) {
              return '请输入转让费用'
            }
          }
        }
      ]
    }
  }
}
