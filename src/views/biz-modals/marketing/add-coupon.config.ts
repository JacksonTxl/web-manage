export const columns = (vm: any) => {
  return [
    {
      title: '优惠券名称',
      dataIndex: 'coupon_name',
      scopedSlots: { customRender: 'coupon_name' }
    },
    {
      title: '可用门店',
      dataIndex: 'is_shop_range',
      scopedSlots: { customRender: 'is_shop_range' }
    },
    {
      title: '面额',
      dataIndex: 'price',
      scopedSlots: { customRender: 'price' }
    },
    {
      title: '门槛',
      dataIndex: 'use_type',
      scopedSlots: { customRender: 'use_type' }
    },
    {
      title: '剩余数量',
      dataIndex: 'margin',
      scopedSlots: { customRender: 'margin' }
    }
  ]
}
