export const columns = () => {
  return [
    {
      title: '结算月份',
      dataIndex: 'settle_month'
    },
    {
      title: '工号',
      dataIndex: 'staff_num'
    },
    {
      title: '员工姓名',
      dataIndex: 'staff_name'
    },
    {
      title: '员工身份',
      dataIndex: 'staff_identity'
    },
    {
      title: '所属部门',
      dataIndex: 'department_name'
    },
    {
      title: '所在门店',
      dataIndex: 'shop',
      scopedSlots: { customRender: 'shop' }
    },
    {
      title: '底薪',
      dataIndex: 'salary_basic',
      textAlign: 'right'
    },
    {
      title: '销售提成',
      dataIndex: 'sales_commission',
      scopedSlots: { customRender: 'sales_commission' },
      textAlign: 'right',
      sorter: true
    },
    {
      title: '上课提成',
      dataIndex: 'course_commission',
      scopedSlots: { customRender: 'course_commission' },
      textAlign: 'right',
      sorter: true
    },
    {
      title: '结算薪资',
      dataIndex: 'settle_salary',
      textAlign: 'right',
      sorter: true
    }
  ]
}
