export const ruleOptions = (vm: any) => {
  return {
    venues_name: {
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            if (value === undefined || value === '') {
              return '请填写场馆名称'
            }
            if (value && !vm.pattern.CN_EN_NUM_SPACE('1-6').test(value)) {
              return '输入的场馆名称格式错误，请重新输入'
            }
          }
        }
      ]
    },
    open_time_start: {
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            if (!value) {
              return '请选择开始时间'
            }
          }
        }
      ]
    },
    open_time_end: {
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            if (!value) {
              return '请选择结束时间'
            }
          }
        }
      ]
    },
    per_time: {
      initialValue: 1
    },
    min_reserve_num: {
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            if (value) {
              if (value < 1 || value > 9) {
                return '单次最少连续预约场次>0且<10'
              }
            }
          }
        }
      ]
    },
    max_reserve_num: {
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            if (value) {
              if (value < 1 || value > 29) {
                return '每个人一天最多可预约最大预约场次 >0且<30'
              }
            }
          }
        }
      ]
    },
    price: {
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            if (!value) {
              return '请填写价格'
            }
            if (value) {
              if (value <= 0 || value >= 99999) {
                return '请填写正确的价格范围'
              }
            }
          }
        }
      ]
    }
  }
}
