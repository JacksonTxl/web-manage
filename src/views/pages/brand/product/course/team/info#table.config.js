export const shopColumns = [{
  title: '省',
  dataIndex: 'province_name',
  width: '20%'
}, {
  title: '市',
  dataIndex: 'city_name',
  width: '20%'
}, {
  title: '区',
  dataIndex: 'district_name'
}, {
  title: '门店名称',
  dataIndex: 'shop_name'
}]
export const coachColumns = [{
  title: '教练',
  dataIndex: 'name',
  sorter: true,
  width: '20%',
  scopedSlots: { customRender: 'name' }
}, {
  title: '教练等级',
  dataIndex: 'gender',
  filters: [
    { text: 'Male', value: 'male' },
    { text: 'Female', value: 'female' }
  ],
  width: '20%'
}, {
  title: '在职状态',
  dataIndex: 'email'
}]
export const priceConfigColumns = [{
  title: '价格等级',
  dataIndex: 'name',
  sorter: true,
  width: '20%',
  scopedSlots: { customRender: 'name' }
}, {
  title: '售卖梯度（节）',
  dataIndex: 'gender',
  filters: [
    { text: 'Male', value: 'male' },
    { text: 'Female', value: 'female' }
  ],
  width: '20%'
}, {
  title: '售卖价格（元/节）',
  dataIndex: 'email'
}, {
  title: '转让手续费',
  dataIndex: 'email'
}, {
  title: '是否在线购买',
  dataIndex: 'email'
}]
