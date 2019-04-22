export const shopColumns = [{
  title: '省',
  dataIndex: 'province',
  width: '20%'
}, {
  title: '市',
  dataIndex: 'city',
  width: '20%'
}, {
  title: '区',
  dataIndex: 'district',
  width: '20%'
}, {
  title: '门店名称',
  dataIndex: 'shop_name',
  width: '30%'
}]
export const coachColumns = [{
  title: '教练',
  dataIndex: 'name'
}, {
  title: '教练等级',
  dataIndex: 'level'
}, {
  title: '在职状态',
  dataIndex: 'nature_work'
}]
export const priceConfigColumns = [{
  title: '价格等级',
  dataIndex: 'level'
}, {
  title: '售卖梯度（节）',
  dataIndex: 'sale',
  scopedSlots: { customRender: 'sale' }
}, {
  title: '售卖价格（元/节）',
  dataIndex: 'price'
}, {
  title: '转让手续费',
  dataIndex: 'transfer'
}]
