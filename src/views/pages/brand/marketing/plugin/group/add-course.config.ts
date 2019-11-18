export const ruleOptions = (vm: any) => {
  return {
    // 活动名称
    group_name: {
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            if (!value) {
              return '请填写活动名称'
            }
            if (value.length > 30) {
              return '活动名称长度不能超过30，请重新输入'
            }
          }
        }
      ]
    },
    // 参团人数
    num: {
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
    time: {
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
    stock: {
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
    title: '原价',
    dataIndex: 'price',
    width: '60%',
    align: 'center'
  },
  {
    title: '拼团价',
    dataIndex: 'group_price',
    width: '40%',
    slots: { title: 'group_price' },
    scopedSlots: { customRender: 'group_price' }
  }
]
