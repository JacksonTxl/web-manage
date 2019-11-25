export const columns = () => {
  return [
    {
      title: '合同编号',
      dataIndex: 'contract_number',
      width: '20%'
    },
    {
      title: '会员姓名',
      dataIndex: 'member_name',
      width: '30%'
    },
    {
      title: '类型',
      dataIndex: 'task_type',
      width: '10%'
    },
    {
      title: '执行时间',
      dataIndex: 'task_time',
      width: '40%'
    }
  ]
}
