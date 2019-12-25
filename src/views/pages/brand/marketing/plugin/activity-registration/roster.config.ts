import { ID } from '@/api/v1/order/transaction/contract'
export const columns = (vm: any) => {
  return [
    {
      title: '用户姓名',
      width: 140,
      fixed: 'left',
      dataIndex: 'member_name',
      scopedSlots: { customRender: 'member_name' }
    },
    {
      title: '用户手机号',
      dataIndex: 'member_mobile',
      scopedSlots: { customRender: 'member_mobile' }
    },
    {
      title: '报名时间',
      dataIndex: 'registration_time',
      scopedSlots: { customRender: 'registration_time' }
    },
    {
      title: '票种',
      dataIndex: 'ticket_name',
      scopedSlots: { customRender: 'ticket_name' }
    },
    {
      title: '价格(元)',
      dataIndex: 'ticket_price',
      scopedSlots: { customRender: 'ticket_price' }
    },
    {
      title: '票号',
      dataIndex: 'id',
      scopedSlots: { customRender: 'id' }
    },
    {
      title: '状态',
      dataIndex: 'ticket_status',
      scopedSlots: { customRender: 'ticket_status' }
    },
    {
      title: '报名信息',
      dataIndex: 'registration_info',
      scopedSlots: { customRender: 'registration_info' }
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 140,
      fixed: 'right',
      scopedSlots: { customRender: 'action' }
    }
  ]
}
