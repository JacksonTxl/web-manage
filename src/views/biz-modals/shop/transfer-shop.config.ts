export const columns = (vm: any) => {
  return [
    {
      title: '卡课',
      dataIndex: 'name'
    },
    {
      title: '剩余',
      dataIndex: 'remain_amount',
      scopedSlots: { customRender: 'remain_amount' }
    },
    {
      title: '有效期',
      dataIndex: 'start_end',
      scopedSlots: { customRender: 'start_end' }
    }
  ]
}

export const ruleOptions = (vm: any) => {
  return {
    poundage: {},
    attribution: {},
    course_id: {},
    to_shop: {
      rules: [
        {
          required: true,
          message: '请填写收款方式'
        }
      ]
    }
  }
}
