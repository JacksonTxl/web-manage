export const columnsShops = [{
  title: '省',
  dataIndex: 'province'
}, {
  title: '市',
  dataIndex: 'city'
}, {
  title: '区',
  dataIndex: 'district'
}, {
  title: '门店',
  dataIndex: 'shop_name'
}]
export const columnsCoaches = [{
  title: '教练',
  dataIndex: 'nickname'
}, {
  title: '教练等级',
  dataIndex: 'level_name'
}, {
  title: '支持上本课程门店数',
  dataIndex: 'nature_work'
}]
export const columnsPrices = [{
  title: '门店',
  dataIndex: 'shop_name'
}, {
  title: '教练等级',
  dataIndex: 'coach_level_name'
}, {
  title: '售卖梯度',
  dataIndex: 'sell_range'
}, {
  title: '售卖价格',
  dataIndex: 'sell_prices'
}, {
  title: '售卖转让手续费',
  dataIndex: 'transfer_num',
  scopedSlots: { customRender: 'transfer_num' }
}]
