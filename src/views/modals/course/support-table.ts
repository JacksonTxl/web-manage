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
  title: '工作性质',
  dataIndex: 'nature_work',
  scopedSlots: { customRender: 'nature_work' }
}]
export const columnsPrices = [{
  title: '门店',
  dataIndex: 'shop_name'
}, {
  title: '教练等级',
  dataIndex: 'level'
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
export const columnsPricesShop = [ {
  title: '教练等级',
  dataIndex: 'level'
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
