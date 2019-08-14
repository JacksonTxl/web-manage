export const columns = () => {
  return [
    {
      title: '省',
      dataIndex: 'province_name',
      width: '22%',
      scopedSlots: { customRender: 'province_name' }
    },
    {
      title: '市',
      width: '22%',
      dataIndex: 'city_name'
    },
    {
      title: '区',
      width: '22%',
      dataIndex: 'district_name'
    },
    {
      title: '门店名称',
      width: '34%',
      dataIndex: 'shop_name'
    }
  ]
}
