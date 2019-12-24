export const columns = () => {
  return [
    {
      title: '合同编号',
      dataIndex: 'contract_number',
      width: '278px'
    },
    {
      title: '会员姓名',
      dataIndex: 'member_name'
    },
    {
      title: '类型',
      dataIndex: 'task_type',
      width: '60px'
    },
    {
      title: '执行时间',
      dataIndex: 'task_time',
      width: '250px'
    }
  ]
}
