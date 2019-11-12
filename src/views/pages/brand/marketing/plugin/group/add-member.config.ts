export const ruleOptions = (vm: any) => {
  return {
    group_name: {
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            if (!value) {
              return '请填写优惠券名称'
            }
            if (value.length > 10) {
              return '优惠券名称长度不能超过10，请重新输入'
            }
          }
        }
      ]
    },
    price: {
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            // let price = value + ''
            if (!value) {
              return '请填写优惠券面额'
            }
          }
        }
      ]
    },
    use_type: {
      rules: [
        {
          required: true,
          message: '请选择使用条件'
        }
      ]
    },
    full_price: {
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            let use_type = +values.use_type
            let couponPirce = +values.price || 0

            if (use_type === 2) {
              if (!value) {
                return '请填写使用条件'
              }
              if (+value <= 0) {
                return '满减门槛应大于0'
              }
              if (couponPirce > +value) {
                return '满减门槛不能低于优惠券面额'
              }
            }
          }
        }
      ]
    },
    number: {
      rules: [
        {
          required: true,
          message: '请填写发放数量'
        }
      ]
    },
    valid_days: {
      rules: [
        {
          required: true,
          message: '请填写使用期限'
        }
      ]
    },
    is_limit: {
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            let is_limit = values.is_limit
            if (is_limit !== 1 && is_limit !== 2) {
              return '请选择是否限制领用'
            }
          }
        }
      ]
    },
    is_share: {},
    person_limit: {
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            let is_limit = values.is_limit
            if (is_limit === 2) {
              if (!value) {
                return '请输入每人限领数量'
              }
              if (+value <= 0) {
                return '每人限领数量应大于0'
              }
            }
          }
        }
      ]
    }
  }
}
export const cardColumns = [
  {
    title: '期限/次数',
    dataIndex: 'city_name',
    width: '22%'
  },
  {
    title: '原价',
    dataIndex: 'district_name',
    width: '22%'
  },
  {
    title: '拼团价',
    dataIndex: 'group_price',
    width: '34%',
    slots: { title: 'group_price' },
    scopedSlots: { customRender: 'group_price' }
  }
]
