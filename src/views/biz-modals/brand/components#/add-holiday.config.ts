export const ruleOptions = (vm: any) => {
  return {
    shopId: ['shop_id'],
    startTime: [
      'start_time',
      {
        rules: [
          {
            required: true,
            message: '请输入放假开始时间'
          }
        ]
      }
    ],
    endTime: [
      'end_time',
      {
        rules: [
          {
            required: true,
            message: '请输入放假结束时间'
          }
        ]
      }
    ]
  }
}
