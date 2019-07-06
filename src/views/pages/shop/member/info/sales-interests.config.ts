export const coupon = () => {
  return [
    {
      title: '优惠劵',
      dataIndex: 'coupon_name',
      key: 'coupon_name'
    },
    {
      title: '领券来源',
      dataIndex: 'source'
    },
    {
      title: '全部状态',
      dataIndex: 'status'
    },
    {
      title: '领取时间',
      dataIndex: 'created_time'
    }
  ]
}
export const integral = () => {
  return [
    {
      title: '积分数量',
      dataIndex: 'age',
      scopedSlots: { customRender: 'age' }
    },
    {
      title: '原因',
      dataIndex: 'age1'
    },
    {
      title: '操作人',
      dataIndex: 'age2'
    },
    {
      title: '操作时间',
      dataIndex: 'age3'
    }
  ]
}
