export const columns = (vm: any) => {
  const columns = [
    {
      title: '人脸',
      dataIndex: 'image_face',
      scopedSlots: { customRender: 'image_face' }
    },
    {
      title: '姓名',
      dataIndex: 'member_name',
      scopedSlots: { customRender: 'member_name' }
    },
    { title: '手机号', dataIndex: 'mobile' },
    {
      title: '用户等级',
      dataIndex: 'member_level',
      scopedSlots: { customRender: 'member_level' }
    },
    { title: '跟进销售', dataIndex: 'follow_salesman' },
    { title: `跟进${vm.$c('coach')}`, dataIndex: 'follow_coach' },
    { title: '注册时间', dataIndex: 'register_time' },
    { title: '成为会员时间', dataIndex: 'be_member_time' },
    { title: '累计消费(元)', align: 'right', dataIndex: 'sum_consumption' },
    {
      title: '操作',
      fixed: 'right',
      width: 170,
      scopedSlots: { customRender: 'action' }
    }
  ]
  const saleColumns = [
    {
      title: '人脸',
      dataIndex: 'image_face',
      scopedSlots: { customRender: 'image_face' }
    },
    {
      title: '姓名',
      dataIndex: 'member_name',
      scopedSlots: { customRender: 'member_name' }
    },
    { title: '手机号', dataIndex: 'mobile' },
    {
      title: '用户等级',
      dataIndex: 'member_level',
      scopedSlots: { customRender: 'member_level' }
    },
    { title: '跟进销售', dataIndex: 'follow_salesman' },
    {
      dataIndex: 'salesman_protect_day',
      slots: { title: 'customSaleTitle' },
      scopedSlots: { customRender: 'salesman_protect_day' }
    },
    { title: `跟进${vm.$c('coach')}`, dataIndex: 'follow_coach' },
    { title: '注册时间', dataIndex: 'register_time' },
    { title: '成为会员时间', dataIndex: 'be_member_time' },
    { title: '累计消费(元)', align: 'right', dataIndex: 'sum_consumption' },
    {
      title: '操作',
      fixed: 'right',
      width: 170,
      scopedSlots: { customRender: 'action' }
    }
  ]
  const coachColumns = [
    {
      title: '人脸',
      dataIndex: 'image_face',
      scopedSlots: { customRender: 'image_face' }
    },
    {
      title: '姓名',
      dataIndex: 'member_name',
      scopedSlots: { customRender: 'member_name' }
    },
    { title: '手机号', dataIndex: 'mobile' },
    {
      title: '用户等级',
      dataIndex: 'member_level',
      scopedSlots: { customRender: 'member_level' }
    },
    { title: '跟进销售', dataIndex: 'follow_salesman' },
    { title: `跟进${vm.$c('coach')}`, dataIndex: 'follow_coach' },
    {
      dataIndex: 'coach_protect_day',
      slots: { title: 'customCoachTitle' },
      scopedSlots: { customRender: 'coach_protect_day' }
    },

    { title: '注册时间', dataIndex: 'register_time' },
    { title: '成为会员时间', dataIndex: 'be_member_time' },
    { title: '累计消费(元)', align: 'right', dataIndex: 'sum_consumption' },
    {
      title: '操作',
      fixed: 'right',
      width: 170,
      scopedSlots: { customRender: 'action' }
    }
  ]
  return vm.crmRule.sales_is_protect
    ? saleColumns
    : vm.crmRule.coach_is_protect
    ? coachColumns
    : columns
}
