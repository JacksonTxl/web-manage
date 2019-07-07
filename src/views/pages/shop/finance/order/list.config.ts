export const columns = () => {
  return [
    {
      title: '订单编号',
      dataIndex: 'id',
      scopedSlots: { customRender: 'id' }
    }, {
      title: '商品名称',
      dataIndex: 'product_name',
      scopedSlots: { customRender: 'product_name' }
    }, {
      title: '商品类型',
      dataIndex: 'product_type_name',
      scopedSlots: { customRender: 'product_type_name' }
    }, {
      title: '订单状态',
      dataIndex: 'order_status',
      scopedSlots: { customRender: 'order_status' }
    }, {
      title: '支付状态',
      dataIndex: 'pay_status',
      scopedSlots: { customRender: 'pay_status' }
    }, {
      title: '会员姓名',
      dataIndex: 'member_name',
      scopedSlots: { customRender: 'member_name' }
    }, {
      title: '手机号',
      dataIndex: 'member_mobile',
      align: 'right',
      scopedSlots: { customRender: 'member_mobile' }
    }, {
      title: '订单总价',
      dataIndex: 'total_price',
      align: 'right',
      scopedSlots: { customRender: 'total_price' }
    }, {
      title: '优惠金额',
      dataIndex: 'order_discount',
      align: 'right',
      scopedSlots: { customRender: 'order_discount' }
    }, {
      title: '减免金额',
      dataIndex: 'reduce_price',
      align: 'right',
      scopedSlots: { customRender: 'reduce_price' }
    }, {
      title: '实收金额',
      dataIndex: 'pay_price',
      align: 'right',
      scopedSlots: { customRender: 'pay_price' }
    }, {
      title: '剩余待收',
      dataIndex: 'remainder_price',
      align: 'right',
      scopedSlots: { customRender: 'remainder_price' }
    }, {
      title: '创建时间',
      dataIndex: 'created_time',
      scopedSlots: { customRender: 'created_time' }
    }, {
      title: '销售',
      dataIndex: 'staff_name',
      scopedSlots: { customRender: 'staff_name' }
    }, {
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
      width: 140,
      scopedSlots: { customRender: 'action' }
    }]
}
