export const columns = [
  {
    title: '优惠券名称',
    dataIndex: 'coupon_name',
    scopedSlots: { customRender: 'coupon_name' }
  }, {
    title: '类型',
    dataIndex: 'coupon_type',
    scopedSlots: { customRender: 'coupon_type' }
  }, {
    title: '可用门店',
    dataIndex: 'is_shop_range',
    scopedSlots: { customRender: 'is_shop_range' }
  }, {
    title: '面额(元)',
    dataIndex: 'price',
    align: 'right',
    scopedSlots: { customRender: 'price' }
  }, {
    title: '使用有效期',
    dataIndex: 'valid_days',
    scopedSlots: { customRender: 'valid_days' }
  }, {
    title: '剩余数量',
    dataIndex: 'margin',
    align: 'right',
    scopedSlots: { customRender: 'margin' }
  }, {
    title: '已领取',
    dataIndex: 'draw_num',
    align: 'right',
    scopedSlots: { customRender: 'draw_num' }
  }, {
    title: '已使用',
    dataIndex: 'use_num',
    align: 'right',
    scopedSlots: { customRender: 'use_num' }
  }, {
    title: '状态',
    dataIndex: 'coupon_status',
    scopedSlots: { customRender: 'coupon_status' }
  }, {
    title: '投放状态',
    dataIndex: 'put_status',
    scopedSlots: { customRender: 'put_status' }
  }, {
    title: '操作',
    dataIndex: 'action',
    width: 140,
    fixed: 'right',
    scopedSlots: { customRender: 'action' }
  }
]
