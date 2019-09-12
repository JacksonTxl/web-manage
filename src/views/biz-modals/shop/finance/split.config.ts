export const columns = (vm: any) => {
  return [
    {
      title: '销售姓名',
      dataIndex: 'staff_name',
      scopedSlots: { customRender: 'staff_name' }
    },
    {
      title: '销售身份',
      dataIndex: 'staff_type_name',
      scopedSlots: { customRender: 'staff_type_name' }
    },
    {
      title: '拆分比例',
      dataIndex: 'split_ratio',
      scopedSlots: { customRender: 'split_ratio' }
    },
    {
      title: '业务金额(元)',
      dataIndex: 'split_money',
      scopedSlots: { customRender: 'split_money' }
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 140,
      scopedSlots: { customRender: 'action' }
    }
  ]
}
