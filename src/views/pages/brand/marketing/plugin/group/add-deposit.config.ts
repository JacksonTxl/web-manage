import groupFormConfig from './components#/group-form.config'
export const columnsGroupStored = [
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
    slots: { title: 'discount' },
    scopedSlots: { customRender: 'discount' }
  }
]

export const ruleOptions = (vm: any) => {
  const pattern = vm.pattern
  const groupFrom = groupFormConfig(vm)
  return Object.assign(groupFrom, {
    depositId: {
      rules: [
        {
          required: true,
          message: '请选择储值卡'
        }
      ]
    }
  })
}
