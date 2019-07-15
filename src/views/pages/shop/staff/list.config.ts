export const columns = () => {
  return [
    {
      title: '姓名',
      dataIndex: 'staff_name',
      key: 'staff_name',
      fixed: 'left',
      width: 100
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',
      fixed: 'left',
      width: 100
    },
    { title: '手机号', dataIndex: 'mobile', key: 'mobile' },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      scopedSlots: { customRender: 'sex' }
    },
    { title: '工号', dataIndex: 'staff_num', key: 'staff_num' },
    { title: '所属部门', dataIndex: 'department', key: 'department' },
    {
      title: '所在门店',
      dataIndex: 'shop',
      key: 'shop',
      scopedSlots: { customRender: 'shop' }
    },
    {
      title: '员工职能',
      dataIndex: 'identity',
      key: 'identity',
      scopedSlots: { customRender: 'identity' }
    },
    {
      title: '在职状态',
      dataIndex: 'work_status',
      key: 'work_status',
      scopedSlots: { customRender: 'work_status' }
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 140,
      scopedSlots: { customRender: 'action' }
    }
  ]
}
