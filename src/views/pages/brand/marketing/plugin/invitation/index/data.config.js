export const columnsActivity = [
  {
    title: '时间',
    dataIndex: 'date',
    scopedSlots: { customRender: 'date' }
  },
  {
    title: '参与活动邀请人',
    dataIndex: 'inviter_num',
    scopedSlots: { customRender: 'inviter_num' }
  },
  {
    title: '邀请人带来的交易额',
    dataIndex: 'inviter_revenue',
    scopedSlots: { customRender: 'inviter_revenue' }
  },
  {
    title: '拉新注册人数',
    dataIndex: 'newbie_register_num',
    scopedSlots: { customRender: 'newbie_register_num' }
  },
  {
    title: '拉新领券人数',
    dataIndex: 'coupon_num',
    scopedSlots: { customRender: 'coupon_num' }
  },
  {
    title: '拉新交易人数',
    dataIndex: 'order_num',
    scopedSlots: { customRender: 'order_num' }
  },
  {
    title: '拉新带来的交易额',
    dataIndex: 'newbie_revenue',
    scopedSlots: { customRender: 'newbie_revenue' }
  }
]
export const columnsUser = [
  {
    title: '邀请人姓名',
    dataIndex: 'aaaaa',
    scopedSlots: { customRender: 'aaaaa' }
  },
  {
    title: '邀请人手机号',
    dataIndex: 'bbbbb',
    scopedSlots: { customRender: 'bbbbb' }
  },
  {
    title: '拉新用户姓名',
    dataIndex: 'ccccc',
    scopedSlots: { customRender: 'ccccc' }
  },
  {
    title: '拉新用户手机号',
    dataIndex: 'ddddd',
    scopedSlots: { customRender: 'ddddd' }
  },
  {
    title: '拉新带来的交易额',
    dataIndex: 'eeeee',
    scopedSlots: { customRender: 'eeeee' }
  }
]
