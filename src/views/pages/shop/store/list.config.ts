export const columns = (vm: any) => {
  return [
    {
      title: '商品名称',
      dataIndex: 'product_name'
    },
    {
      title: '商品分类',
      dataIndex: 'category_name'
    },
    {
      title: '销售渠道',
      dataIndex: 'sale_type_name'
    },
    {
      title: '上架状态',
      dataIndex: 'product_shelves_name'
    },
    {
      title: '销量',
      dataIndex: 'sales_volume'
    },
    {
      title: '单价',
      dataIndex: 'selling_price'
    },
    {
      title: '库存',
      dataIndex: 'stock_amount'
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 140,
      fixed: 'right',
      scopedSlots: { customRender: 'action' }
    }
  ]
}
