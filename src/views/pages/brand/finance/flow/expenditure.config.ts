export const columns = () => {
  return [
    {
      title: '查询日期',
      dataIndex: 'stat_date'
    },
    {
      title: '门店名称',
      dataIndex: 'shop_name'
    },
    {
      title: '微信（线上）退款',
      dataIndex: 'online_wechat_amount',
      align: 'right'
    },
    {
      title: '微信（线下）退款',
      dataIndex: 'offline_wechat_amount',
      align: 'right'
    },
    {
      title: '支付宝（线下）退款',
      dataIndex: 'offline_ailipay_amount',
      align: 'right'
    },
    {
      title: '现金退款',
      dataIndex: 'cash_amount',
      align: 'right'
    },
    {
      title: '银行转账',
      dataIndex: 'bank_transfer_amount',
      align: 'right'
    },
    {
      titleTotal: '内部结转退款',
      dataIndex: 'internal_amount',
      slots: { title: 'internalTitle' },
      align: 'right'
    },
    {
      title: '其它退款',
      dataIndex: 'other_amount',
      align: 'right'
    },
    {
      title: '支出总金额',
      dataIndex: 'total_amount',
      align: 'right'
    }
  ]
}
