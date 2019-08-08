export const classColumns = [
  {
    title: '课程名称',
    dataIndex: 'q'
  },
  {
    title: '上课时间',
    dataIndex: 'w'
  },
  {
    title: '预约人数',
    dataIndex: 'e'
  },
  {
    title: '签到人数',
    dataIndex: 'r'
  }
]

export const saleColumns = [
  {
    title: '成单时间',
    dataIndex: 'q'
  },
  {
    title: '签单时间',
    dataIndex: 'w'
  },
  {
    title: '签单商品',
    dataIndex: 'e'
  },
  {
    title: '会员姓名',
    dataIndex: 'r'
  },
  {
    title: '订单总价',
    dataIndex: 't'
  },
  {
    title: '实收金额',
    dataIndex: 'y'
  },
  {
    title: '业绩金额',
    dataIndex: 'u'
  }
]

export const columns = (vm: any) => {
  return [
    {
      title: '员工姓名',
      dataIndex: 'staff_name',
      key: 'staff_name'
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      key: 'mobile'
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex'
    },
    {
      title: '工号',
      dataIndex: 'staff_num',
      key: 'staff_num'
    },
    {
      title: '所属部门',
      dataIndex: 'department_name',
      key: 'department_name'
    }
  ]
}
