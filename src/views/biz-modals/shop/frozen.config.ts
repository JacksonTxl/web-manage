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
    id: {},
    course_id: {},
    poundage: {},
    pay_method: {
      rules: [
        {
          required: true,
          message: '请选择支付方式'
        }
      ]
    },
    pay_fee: {
      rules: [
        {
          required: true,
          message: '请输入手续费'
        }
      ]
    },
    end_time: {
      rules: [
        {
          required: true,
          message: '请填写冻结日期'
        }
      ]
    },
    //  moneyFlag
    is_handling_fee: {
      rules: [
        {
          required: true,
          message: '请选择有无手续费'
        }
      ]
    },
    sale_id: {
      rules: [
        {
          required: true,
          message: '请选择收款人员'
        }
      ]
    }
  }
}
