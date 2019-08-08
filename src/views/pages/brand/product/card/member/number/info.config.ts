export const shop_columns = [
  {
    title: '省',
    dataIndex: 'province_name',
    width: '22%'
  },
  {
    title: '市',
    dataIndex: 'city_name',
    width: '22%'
  },
  {
    title: '区',
    dataIndex: 'district_name',
    width: '22%'
  },
  {
    title: '门店名称',
    dataIndex: 'shop_name',
    width: '34%'
  }
]

export const price_gradient_columns = {
  brand: [
    {
      title: '入场次数',
      scopedSlots: { customRender: 'validity_times' },
      dataIndex: 'validity_times',
      width: '20%'
    },
    {
      title: '售价',
      scopedSlots: { customRender: 'sale_price' },
      dataIndex: 'sale_price',
      width: '20%'
    },
    {
      title: '有效期',
      scopedSlots: { customRender: 'validity_period' },
      dataIndex: 'validity_period',
      width: '20%'
    },
    {
      title: '允许冻结天数',
      scopedSlots: { customRender: 'frozen_day' },
      dataIndex: 'frozen_day',
      width: '20%'
    },
    {
      title: '赠送上限',
      scopedSlots: { customRender: 'gift_unit' },
      dataIndex: 'gift_unit',
      width: '20%'
    }
  ],
  shop: [
    {
      title: '入场次数',
      scopedSlots: { customRender: 'validity_times' },
      dataIndex: 'validity_times',
      width: '20%'
    },
    {
      title: '售价',
      scopedSlots: { customRender: 'sale_price' },
      dataIndex: 'sale_price',
      width: '20%'
    },
    {
      title: '有效期',
      scopedSlots: { customRender: 'validity_period' },
      dataIndex: 'validity_period',
      width: '20%'
    },
    {
      title: '允许冻结天数',
      scopedSlots: { customRender: 'frozen_day' },
      dataIndex: 'frozen_day',
      width: '20%'
    },
    {
      title: '赠送上限',
      scopedSlots: { customRender: 'gift_unit' },
      dataIndex: 'gift_unit',
      width: '20%'
    }
  ]
}
