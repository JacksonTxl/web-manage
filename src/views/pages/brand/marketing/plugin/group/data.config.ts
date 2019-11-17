export const columns = (vm: any) => {
  const $t = vm.$t
  return [
    {
      title: '拼团编号',
      dataIndex: 'id',
      scopedSlots: { customRender: 'id' }
    },
    {
      title: '开团时间',
      dataIndex: 'start_time',
      scopedSlots: { customRender: 'start_time' }
    },
    {
      title: '拼团门店',
      dataIndex: 'shop_name',
      scopedSlots: { customRender: 'shop_name' }
    },
    {
      title: '拼团状态',
      dataIndex: 'group_status',
      scopedSlots: { customRender: 'group_status' }
    },
    {
      title: '会员',
      dataIndex: 'member_name',
      scopedSlots: { customRender: 'member_name' }
    },
    {
      title: '身份',
      dataIndex: 'member_type',
      scopedSlots: { customRender: 'member_type' }
    },
    {
      title: '手机号',
      dataIndex: 'member_mobile',
      scopedSlots: { customRender: 'member_mobile' }
    },
    {
      title: '参与时间',
      dataIndex: 'join_start_time',
      align: 'right',
      scopedSlots: { customRender: 'join_start_time' }
    },
    {
      title: '新老用户',
      dataIndex: 'is_new_member',
      scopedSlots: { customRender: 'is_new_member' }
    },
    {
      title: '订单编号',
      dataIndex: 'order_id',
      scopedSlots: { customRender: 'order_id' }
    }
  ]
}
