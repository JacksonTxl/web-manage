import moment from 'moment'
export const ruleOptions = (vm: any) => {
  const pattern = vm.pattern
  return {
    // 活动名称
    product_name: {
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            if (!value) {
              return '请填写商品名称'
            }
            if (!value.match(pattern.CN_EN_NUM_SPACE('1-30'))) {
              return '请输入商品名称，支持格式长度1~30中英文'
            }
          }
        }
      ]
    },
    // 参团人数
    category_id: {
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            if (!value) {
              return '请选择商品分类'
            }
          }
        }
      ]
    },
    // 配送方式
    delivery_type: {
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            if (!value) {
              return '请选择配送方式'
            }
          }
        }
      ]
    },
    sale_type: {
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            if (!value) {
              return '请选择售卖方式'
            }
          }
        }
      ]
    }
  }
}

export const skuColumns = (vm: any) => {
  let list = [
    {
      title: '划线价',
      dataIndex: 'market_price',
      width: 208,
      slots: { title: 'market_price' },
      scopedSlots: { customRender: 'market_price' }
    },
    {
      title: '售价',
      dataIndex: 'selling_price',
      width: 208,
      slots: { title: 'selling_price' },
      scopedSlots: { customRender: 'selling_price' }
    },
    {
      title: '库存',
      dataIndex: 'stock_amount',
      width: 208,
      slots: { title: 'stock_amount' },
      scopedSlots: { customRender: 'stock_amount' }
    }
  ]
  list = vm.sku.concat(list)
  console.log(list, '================')
  if (vm.isEditMode) {
    console.log('进来删除了')
    list.pop()
  }
  return list
}
