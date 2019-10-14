export const columns = () => {
  return [
    {
      title: '签单时间',
      dataIndex: 'order_time'
    },
    {
      title: '签单商品',
      dataIndex: 'product_name'
    },
    {
      title: '会员姓名',
      dataIndex: 'member_name'
    },
    {
      title: '订单总价',
      align: 'right',
      dataIndex: 'total_price'
    },
    {
      title: '实收金额',
      dataIndex: 'actual_price',
      align: 'right',
    },
    {
      dataIndex: 'sale_price',
      align: 'right',
      slots: { title: 'saleTitle' },
      scopedSlots: { customRender: 'sale_price' }
    },
    {
      title: '销售姓名',
      dataIndex: 'staff_name'
    },
    {
      title: '所属部门',
      dataIndex: 'department_name'
    }
  ]
}
