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
    dataIndex: 'inviter_name',
    scopedSlots: { customRender: 'inviter_name' }
  },
  {
    title: '邀请人手机号',
    dataIndex: 'inviter_mobile',
    scopedSlots: { customRender: 'inviter_mobile' }
  },
  {
    title: '拉新用户姓名',
    dataIndex: 'invitee_name',
    scopedSlots: { customRender: 'invitee_name' }
  },
  {
    title: '拉新用户手机号',
    dataIndex: 'invitee_mobile',
    scopedSlots: { customRender: 'invitee_mobile' }
  },
  {
    title: '拉新带来的交易额',
    dataIndex: 'newbie_revenue',
    scopedSlots: { customRender: 'newbie_revenue' }
  }
]
