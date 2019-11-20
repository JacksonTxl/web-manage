export const ruleOptions = (vm: any) => {
  return {
    // 活动名称
    activity_name: {
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            if (!value) {
              return '请填写活动名称'
            }
            if (value.length > 30) {
              return '活动名称长度不能超过15，请重新输入'
            }
          }
        }
      ]
    },
    cardId: {
      rules: [
        {
          required: true,
          message: '请选择私教课'
        }
      ]
    },
    activity_search: {
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            if (!value) {
              return '请填写选择课程'
            }
          }
        }
      ]
    },
    group_hour: {
      rules: [
        {
          validator: (field: any, value: number, values: number) => {
            if (!value) {
              return '请填写拼团课时'
            }
            if (!Number(value)) {
              return '请填写拼团课时'
            }
            if (value > 9999999) {
              return '拼团课时不能超过9999999，请重新输入'
            }
          }
        }
      ]
    },
    // 参团人数
    group_sum: {
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            if (!value) {
              return '请填写参团人数'
            }
            if (value > 100) {
              return '参团人数不能超过100，请重新输入'
            }
            if (value < 2) {
              return '参团人数不能少于2，请重新输入'
            }
          }
        }
      ]
    },
    // 拼团有效期
    valid_time: {
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            if (!value) {
              return '请填写拼团有效期'
            }
            if (value > 720) {
              return '拼团有效期不能超过720，请重新输入'
            }
            if (value < 2) {
              return '拼团有效期不能少于2，请重新输入'
            }
          }
        }
      ]
    },
    // 活动库存
    stock_total: {
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            if (!value) {
              return '请填写活动库存'
            }
            if (value > 999999) {
              return '活动库存不能超过999999，请重新输入'
            }
          }
        }
      ]
    }
  }
}
export const cardColumns = [
  {
    title: '教练等级',
    dataIndex: 'level',
    width: '22%',
    align: 'center'
  },
  {
    title: '课时',
    dataIndex: 'hour',
    align: 'center',
    width: '22%'
  },
  {
    title: '拼团价',
    dataIndex: 'group_price',
    width: '38%',
    align: 'center',
    slots: { title: 'group_price' },
    scopedSlots: { customRender: 'group_price' }
  }
]
