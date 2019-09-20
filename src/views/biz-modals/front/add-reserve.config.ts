export const ruleOptions = () => ({
  reserve_id: {
    rules: [{ required: true, message: '预约用户必填' }]
  },
  reserve_date: {
    rules: [{ required: true, message: '预约日期必填' }]
  },
  reserve_time: {
    rules: [{ required: true, message: '预约时间必填' }]
  },
  receptionist_id: {
    rules: [{ required: true, message: '接待人必填' }]
  }
})
