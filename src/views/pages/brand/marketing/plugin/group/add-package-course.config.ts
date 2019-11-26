import groupFormConfig from './components#/group-form.config'
export const ruleOptions = (vm: any) => {
  const pattern = vm.pattern
  const groupFrom = groupFormConfig(vm)
  return Object.assign(groupFrom, {
    shop_id: {
      rules: [
        {
          required: true,
          message: '请选择拼团门店'
        }
      ]
    },
    course_id: {
      rules: [
        {
          required: true,
          message: '请选择课程包'
        }
      ]
    }
  })
}
export const cardColumns = [
  {
    title: '原价',
    dataIndex: 'price',
    width: '60%',
    align: 'center'
  },
  {
    title: '拼团价',
    dataIndex: 'group_price',
    width: '40%',
    slots: { title: 'group_price' },
    scopedSlots: { customRender: 'group_price' }
  }
]
