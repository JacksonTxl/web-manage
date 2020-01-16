export const columns = () => {
  return [
    {
      dataIndex: 'contract_number',
      slots: { title: 'customTitle' },
      width: '240px'
    },
    {
      dataIndex: 'member_name',
      slots: { title: 'customName' }
    },
    {
      title: '类型',
      dataIndex: 'task_type',
      width: '60px'
    },
    {
      title: '执行时间',
      dataIndex: 'task_time',
      width: '200px'
    }
  ]
}
