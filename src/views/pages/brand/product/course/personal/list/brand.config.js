export const columns = vm => [
  {
    title: '课程名称',
    dataIndex: 'course_name',
    fixed: 'left',
    width: 200,
    scopedSlots: { customRender: 'course_name' }
  },
  {
    title: '课程类型',
    dataIndex: 'category_name'
  },
  {
    title: '时长（分钟）',
    dataIndex: 'duration',
    sorter: true,
    width: 130,
    align: 'right'
  },
  {
    title: '支持上课门店',
    dataIndex: 'shops',
    scopedSlots: { customRender: 'shops' }
  },
  {
    title: '定价方式',
    dataIndex: 'price_setting',
    scopedSlots: { customRender: 'price_setting' }
  },
  {
    title: '课程定价',
    dataIndex: 'sell_price',
    sorter: true,
    scopedSlots: { customRender: 'sell_price' }
  },
  {
    title: `授课${vm.$c('coach')}数`,
    dataIndex: 'coaches',
    align: 'right',
    sorter: true,
    scopedSlots: { customRender: 'coaches' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    fixed: 'right',
    width: 160,
    scopedSlots: { customRender: 'action' }
  }
]
