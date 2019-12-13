export const columns = (vm: any) => {
  return [
    {
      title: '商品名称',
      dataIndex: 'activity_name'
    },
    {
      title: '商品分类',
      dataIndex: 'product_type'
    },
    {
      title: '销售渠道',
      dataIndex: 'support_sales'
    },
    {
      title: '上架状态',
      dataIndex: 'activity_time'
    },
    {
      title: '销量',
      dataIndex: 'activity_state'
    },
    {
      title: '单价',
      dataIndex: 'group_total'
    },
    {
      title: '库存',
      dataIndex: 'group_success_total'
    }
  ]
}
