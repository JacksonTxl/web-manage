import groupFormConfig from './components#/group-form.config'
export const ruleOptions = (vm: any) => {
  const groupFrom = groupFormConfig(vm)
  return Object.assign(groupFrom, {
    course_id: {
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            if (!value) {
              return '请选择私教课'
            }
          }
        }
      ]
    },
    group_hour: {
      rules: [
        {
          validator: (field: any, value: number, values: number) => {
            if (!value) {
              return '请填写拼团课时'
            }
            if (!Number(value)) {
              return '请填写拼团课时'
            }
            if (value > 9999999) {
              return '拼团课时不能超过9999999，请重新输入'
            }
          }
        }
      ]
    }
  })
}
export const cardColumns = [
  {
    title: '教练等级',
    dataIndex: 'level',
    width: '22%',
    align: 'center'
  },
  {
    title: '课时',
    dataIndex: 'hour',
    align: 'center',
    width: '22%'
  },
  {
    title: '拼团价',
    dataIndex: 'group_price',
    width: '38%',
    align: 'center',
    slots: { title: 'group_price' },
    scopedSlots: { customRender: 'group_price' }
  }
]
