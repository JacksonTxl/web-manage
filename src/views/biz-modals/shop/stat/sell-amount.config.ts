export const columns = () => {
  return [
    {
      title: '签单时间',
      dataIndex: 'order_time',
      width: '18%'
    },
    {
      title: '签单商品',
      dataIndex: 'product_name',
      width: '18%'
    },
    {
      title: '会员姓名',
      dataIndex: 'member_name',
      width: '18%'
    },
    {
      title: '订单总价',
      align: 'right',
      dataIndex: 'total_price',
      width: '9%'
    },
    {
      title: '实收金额',
      dataIndex: 'actual_price',
      align: 'right',
      width: '9%'
    },
    {
      dataIndex: 'sale_price',
      align: 'right',
      slots: { title: 'saleTitle' },
      width: '9%'
    },
    {
      title: '销售姓名',
      dataIndex: 'staff_name',
      width: '9%'
    },
    {
      title: '所属部门',
      dataIndex: 'department_name',
      width: '9%'
    }
  ]
}
