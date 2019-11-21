export const columnsGroupStored = [
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
    slots: { title: 'discount' },
    scopedSlots: { customRender: 'discount' }
  }
]

export const ruleOptions = (vm: any) => {
  const pattern = vm.pattern
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
              return '活动名称长度不能超过30，请重新输入'
            }
            if (!pattern.CN_EN_NUM(value)) {
              return '输入的活动名称格式错误，请重新输入'
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
    activity_time: {
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            console.log('value', value)
            if (!value) {
              return '请选择活动时间'
            }
            if (
              vm.$children.info &&
              value.endTime < vm.$children.info.end_time
            ) {
              return '活动结束时间只能延长不可缩短'
            }
          }
        }
      ]
    },
    // 储值卡
    depositId: {
      rules: [
        {
          required: true,
          message: '请选择储值卡'
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
            if (+vm.info.stock_total > +value) {
              let msg =
                '活动库存输入必须在' +
                vm.info.stock_total +
                '～999999之间，请重新输入'
              return msg
            }
          }
        }
      ]
    },
    published_time: {
      rules: [
        {
          required: true,
          message: '请选择发布时间'
        },
        {
          validator: (field: any, value: any, values: any) => {
            if (
              vm.$children[0].ACTIVITY_STATUS.TIMING ===
                vm.$children[0].activityState &&
              !value
            ) {
              return '请选择发布时间'
            }
          }
        }
      ]
    }
  }
}
