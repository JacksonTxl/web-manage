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
      title: '微信（线上）',
      dataIndex: 'online_wechat_amount',
      align: 'right'
    },
    {
      title: '微信（线下）',
      dataIndex: 'offline_wechat_amount',
      align: 'right'
    },
    {
      title: '支付宝（线下）',
      dataIndex: 'offline_ailipay_amount',
      align: 'right'
    },
    {
      title: '线下POS',
      dataIndex: 'offline_pos_amount',
      align: 'right'
    },
    {
      title: '现金',
      dataIndex: 'cash_amount',
      align: 'right'
    },
    {
      title: '银行转账',
      dataIndex: 'bank_transfer_amount',
      align: 'right'
    },
    {
      titleTotal: '内部结转',
      dataIndex: 'internal_amount',
      slots: { title: 'internal_amount' },
      align: 'right'
    },
    {
      title: '其它',
      dataIndex: 'other_amount',
      align: 'right'
    },
    {
      title: '总收银金额',
      dataIndex: 'total_amount',
      align: 'right'
    }
  ]
}
