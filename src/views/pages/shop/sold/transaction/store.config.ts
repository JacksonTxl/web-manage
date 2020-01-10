export const columns = () => [
  {
    title: '商品名称',
    dataIndex: 'product_name',
    width: 140,
    scopedSlots: { customRender: 'product_name' }
  },
  {
    title: '数量',
    dataIndex: 'stock_amount',
    width: 86,
    scopedSlots: { customRender: 'stock_amount' }
  },
  {
    title: '单价',
    width: 82,
    dataIndex: 'unit_price'
  },
  {
    title: '小计',
    dataIndex: 'priceSum',
    width: 84,
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
    },
    saleName: {
      rules: [{ required: true, message: '请选择销售人员' }]
    }
  }
}
