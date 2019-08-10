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
      title: '期限',
      scopedSlots: { customRender: 'validity_period' },
      dataIndex: 'validity_period',
      width: '25%'
    },
    {
      title: '售价',
      scopedSlots: { customRender: 'sale_price' },
      dataIndex: 'sale_price',
      width: '25%'
    },
    {
      title: '允许冻结天数',
      scopedSlots: { customRender: 'frozen_day' },
      dataIndex: 'frozen_day',
      width: '25%'
    },
    {
      title: '赠送上限',
      scopedSlots: { customRender: 'gift_unit' },
      dataIndex: 'gift_unit',
      width: '25%'
    }
  ],
  shop: [
    {
      title: '期限',
      scopedSlots: { customRender: 'validity_period' },
      dataIndex: 'validity_period',
      width: '25%'
    },
    {
      title: '售价',
      scopedSlots: { customRender: 'sale_price' },
      dataIndex: 'sale_price',
      width: '25%'
    },
    {
      title: '允许冻结天数',
      scopedSlots: { customRender: 'frozen_day' },
      dataIndex: 'frozen_day',
      width: '25%'
    },
    {
      title: '赠送上限',
      scopedSlots: { customRender: 'gift_unit' },
      dataIndex: 'gift_unit',
      width: '25%'
    }
  ]
}
