import groupFormConfig from './components#/group-form.config'
export const ruleOptions = (vm: any) => {
  const pattern = vm.pattern
  const groupFrom = groupFormConfig(vm)
  return Object.assign(groupFrom, {
    // 会籍卡
    cardId: {
      rules: [
        {
          required: true,
          message: '请选择会籍卡'
        }
      ]
    }
  })
}
export const cardColumns = [
  {
    title: '期限/次数',
    dataIndex: 'spec',
    width: '22%',
    align: 'center'
  },
  {
    title: '原价',
    dataIndex: 'price',
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
