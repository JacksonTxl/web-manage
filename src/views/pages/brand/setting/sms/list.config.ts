export const columns = () => {
  return [
    {
      title: '订单号',
      dataIndex: 'id'
    },
    {
      title: '购买短信数量',
      dataIndex: 'sms_num'
    },
    {
      title: '金额',
      dataIndex: 'pay_price'
    },
    {
      title: '支付方式',
      dataIndex: 'pay_channel'
    },
    {
      title: '购买人',
      dataIndex: 'user'
    },
    {
      title: '购买时间',
      dataIndex: 'pay_finished_time'
    }
  ]
}
