export const columns = () => {
  return [
    {
      title: '奖品名称',
      dataIndex: 'prize_name'
    },
    {
      title: '奖品类型',
      dataIndex: 'prize_type_name'
    },
    {
      title: '奖品总数量',
      dataIndex: 'prize_total_num'
    },
    {
      title: '已抽中数量',
      dataIndex: 'prize_win_num'
    },
    {
      title: '已核销/使用数量',
      dataIndex: 'prize_check_num'
    }
  ]
}
