export const columns = [
  {
    title: '结算月份',
    dataIndex: 'q'
  },
  {
    title: '工号',
    dataIndex: 'w'
  },
  {
    title: '员工姓名',
    dataIndex: 'e'
  },
  {
    title: '员工身份',
    dataIndex: 'r'
  },
  {
    title: '所属部门',
    dataIndex: 't'
  },
  {
    title: '所在门店',
    dataIndex: 'y'
  },
  {
    title: '底薪',
    dataIndex: 'u'
  },
  {
    title: '销售提成',
    dataIndex: 'i',
    scopedSlots: { customRender: 'i' }
  },
  {
    title: '上课提成',
    dataIndex: 'o',
    scopedSlots: { customRender: 'o' }
  },
  {
    title: '结算薪资',
    dataIndex: 'p'
  }
]

export const list = (vm: any) => [
  {
    id: 1,
    q: '201901',
    w: '1号',
    e: '超人',
    r: `私教${vm.$c('coach')}、销售`,
    t: '部门1',
    y: '上海体验店',
    u: '11923',
    i: '12332',
    o: '12323',
    p: '1233'
  }
]
