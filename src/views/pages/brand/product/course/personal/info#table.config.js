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
  dataIndex: 'min_sell',
  scopedSlots: { customRender: 'min_sell' }
}, {
  title: '售卖价格（元/节）',
  dataIndex: 'min_sell_price',
  scopedSlots: { customRender: 'min_sell_price' }
}, {
  title: '转让手续费',
  dataIndex: 'transfer_num',
  scopedSlots: { customRender: 'transfer_num' }
}]
