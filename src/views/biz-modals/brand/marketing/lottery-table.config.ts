export const columns = () => {
  return [
    {
      title: '奖品名称',
      dataIndex: 'prize_name',
      width: '19%'
    },
    {
      title: '奖品类型',
      width: '19%',
      dataIndex: 'prize_type_name'
    },
    {
      title: '奖品总数量',
      width: '19%',
      dataIndex: 'prize_total_num'
    },
    {
      title: '已抽中数量',
      width: '19%',
      dataIndex: 'prize_win_num'
    },
    {
      title: '已核销/使用数量',
      width: '24%',
      dataIndex: 'prize_check_num'
    }
  ]
}
