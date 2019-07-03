// 卡类
export enum CARD_TYPE {
  number = 1,
  period = 2
}

export const columns = () => {
  return [
    {
      title: '售卖门店',
      dataIndex: 'shop_name',
      scopedSlots: { customRender: 'shop_name' },
      sorter: true
    },
    {
      title: '会员卡名称',
      dataIndex: 'card_name',
      scopedSlots: { customRender: 'card_name' }
    },
    {
      title: '类型',
      dataIndex: 'card_type',
      scopedSlots: { customRender: 'card_type' }
    },
    {
      title: '有效期/有效次数',
      dataIndex: 'time_gradient',
      align: 'right',
      scopedSlots: { customRender: 'time_gradient' }
    },
    {
      title: '支持入场范围',
      dataIndex: 'admission_range',
      scopedSlots: { customRender: 'admission_range' }
    },
    {
      title: '售卖时间',
      dataIndex: 'sell_time',
      scopedSlots: { customRender: 'sell_time' }
    },
    {
      title: '售卖价格',
      dataIndex: 'price_gradient',
      align: 'right',
      scopedSlots: { customRender: 'price_gradient' }
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
