export const columns = () => {
  return [
    {
      title: '日期',
      width: '150px',
      fixed: 'left',
      dataIndex: 'stat_date'
    },
    {
      title: '收入流水总额(元)',
      dataIndex: 'total_amount',
      unit: '¥',
      align: 'right'
    },
    {
      title: '线上微信(元)',
      dataIndex: 'online_wechat_amount',
      unit: '¥',
      align: 'right'
    },
    {
      title: '线下微信(元)',
      unit: '¥',
      dataIndex: 'offline_wechat_amount',
      align: 'right'
    },
    {
      title: '线下支付宝(元)',
      unit: '¥',
      dataIndex: 'offline_ailipay_amount',
      align: 'right'
    },
    {
      title: '线下POS(元)',
      unit: '¥',
      dataIndex: 'offline_pos_amount',
      align: 'right'
    },
    {
      title: '现金(元)',
      unit: '¥',
      dataIndex: 'cash_amount',
      align: 'right'
    },
    {
      title: '银行转账(元)',
      unit: '¥',
      dataIndex: 'bank_transfer_amount',
      align: 'right'
    },
    {
      title: '内部结转(元)',
      unit: '¥',
      dataIndex: 'internal_amount',
      align: 'right'
    },
    {
      title: '其它(元)',
      unit: '¥',
      dataIndex: 'other_amount',
      align: 'right'
    }
  ]
}
