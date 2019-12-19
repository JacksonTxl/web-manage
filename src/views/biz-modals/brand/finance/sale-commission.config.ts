export const columns = (vm: any) => {
  return [
    {
      title: '成单时间',
      dataIndex: 'created_time',
      width: '200px'
    },
    {
      title: '签单时间',
      dataIndex: 'order_time',
      width: '200px'
    },
    {
      title: '签单商品',
      dataIndex: 'product_name',
      width: '200px'
    },
    {
      title: '会员姓名',
      dataIndex: 'member_name',
      width: '200px'
    },
    {
      title: '订单总价',
      dataIndex: 'total_price',
      width: '200px'
    },
    {
      title: '实收金额',
      dataIndex: 'actual_price',
      width: '200px'
    },
    {
      title: '业绩金额',
      dataIndex: 'sale_price',
      width: '200px'
    }
  ]
}
