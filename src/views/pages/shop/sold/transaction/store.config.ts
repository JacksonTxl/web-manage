export const columns = () => [
  {
    title: '商品名称',
    dataIndex: 'product_name',
    scopedSlots: { customRender: 'product_name' }
  },
  {
    title: '数量',
    dataIndex: 'stock_amount',
    scopedSlots: { customRender: 'stock_amount' }
  },
  {
    title: '单价',
    dataIndex: 'selling_price'
  },
  {
    title: '小计',
    dataIndex: 'priceSum',
    scopedSlots: { customRender: 'priceSum' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]
export const ruleOptions = (vm: any) => {
  const pattern = vm.pattern
  return {
    memberName: {
      rules: [
        {
          validator: (filed: any, value: any, values: any) => {
            if (!value || !value.match(pattern.CN_EN_NUM_SPACE('1-15'))) {
              return '请输入会员姓名，支持格式长度1~15中英文'
            }
          }
        }
      ]
    },
    memberId: {
      rules: [
        {
          validator: (fileds: any, value: any, values: any) => {
            if (!value || value.length > 15) {
              return '请选择会员，查询条件长度15'
            }
          }
        }
      ]
    }
  }
}
