export const columns = () => {
  return [
    {
      title: '用户名称',
      dataIndex: 'member_name',
      scopedSlots: { customRender: 'member_name' }
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      scopedSlots: { customRender: 'mobile' }
    },
    {
      title: '领券时间',
      dataIndex: 'created_time',
      scopedSlots: { customRender: 'created_time' }
    },
    {
      title: '用券时间',
      dataIndex: 'use_time',
      scopedSlots: { customRender: 'use_time' }
    },
    {
      title: '优惠券状态',
      dataIndex: 'coupon_status',
      scopedSlots: { customRender: 'coupon_status' }
    },
    {
      title: '剩余有效天数',
      dataIndex: 'valid_days',
      scopedSlots: { customRender: 'valid_days' }
    },
    {
      title: '使用门店',
      dataIndex: 'shop_name',
      scopedSlots: { customRender: 'shop_name' }
    },
    {
      title: '订单金额',
      dataIndex: 'order_price',
      scopedSlots: { customRender: 'order_price' }
    }
  ]
}
