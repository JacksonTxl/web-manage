export const columns = () => {
  return [
    {
      title: '储值卡名称',
      dataIndex: 'card_name',
      scopedSlots: { customRender: 'card_name' }
    },
    {
      title: '有效期',
      dataIndex: 'num',
      align: 'right',
      scopedSlots: { customRender: 'num' }
    },
    {
      title: '储值金额',
      dataIndex: 'card_price',
      align: 'right',
      scopedSlots: { customRender: 'card_price' }
    },
    {
      title: '售卖价格',
      dataIndex: 'sell_price',
      align: 'right',
      scopedSlots: { customRender: 'sell_price' }
    },
    {
      title: '支持消费门店',
      dataIndex: 'consumption_range',
      scopedSlots: { customRender: 'consumption_range' }
    },
    {
      title: '售卖时间',
      dataIndex: 'sell_time',
      scopedSlots: { customRender: 'sell_time' }
    },
    {
      title: '发布渠道',
      dataIndex: 'publish_channel',
      scopedSlots: { customRender: 'publish_channel' }
    },
    {
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
      width: 140,
      scopedSlots: { customRender: 'action' }
    }
  ]
}
