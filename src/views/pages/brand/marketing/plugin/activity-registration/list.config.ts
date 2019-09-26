export const columns = (vm: any) => {
  const $t = vm.$t
  console.log($t)
  return [
    {
      title: '用户姓名',
      dataIndex: 'coupon_name',
      scopedSlots: { customRender: 'coupon_name' }
    },
    {
      title: '用户手机号',
      dataIndex: 'coupon_type',
      scopedSlots: { customRender: 'coupon_type' }
    },
    {
      title: '报名时间',
      dataIndex: 'is_shop_range',
      scopedSlots: { customRender: 'is_shop_range' }
    },
    {
      title: '票种',
      dataIndex: 'price',
      align: 'right',
      scopedSlots: { customRender: 'price' }
    },
    {
      title: '价格（元）',
      dataIndex: 'valid_days',
      scopedSlots: { customRender: 'valid_days' }
    },
    {
      title: '可用人数',
      dataIndex: 'margin',
      align: 'right',
      scopedSlots: { customRender: 'margin' }
    },
    {
      title: '状态',
      dataIndex: 'draw_num',
      align: 'right',
      scopedSlots: { customRender: 'draw_num' }
    },
    {
      title: '报名信息',
      dataIndex: 'use_num',
      align: 'right',
      scopedSlots: { customRender: 'use_num' }
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 140,
      fixed: 'right',
      scopedSlots: { customRender: 'action' }
    }
  ]
}
