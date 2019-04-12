const columns = [
  { title: '姓名', width: 100, dataIndex: 'staff_name', sorter: true, key: 'name', fixed: 'left', scopedSlots: { customRender: 'staff_name' } },
  { title: '昵称', width: 100, dataIndex: 'nickname', key: 'nickname' },
  { title: '手机号', dataIndex: 'mobile', key: '1', width: 150 },
  { title: '工号', dataIndex: 'staff_id', key: '2', width: 150 },
  { title: '所在门店', dataIndex: 'shop_name', key: '3', width: 150 },
  { title: '所属部门', dataIndex: 'brand_name', key: '4', width: 150 },
  { title: '身份', dataIndex: 'identity', key: '5', width: 150 },
  { title: '在职状态', dataIndex: 'address', key: '6', width: 150 },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 100,
    scopedSlots: { customRender: 'action' }
  }
]
