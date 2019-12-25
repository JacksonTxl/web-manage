export const columns = vm => [
  {
    title: '课程名称',
    dataIndex: 'course_name',
    fixed: 'left',
    width: 180,
    scopedSlots: { customRender: 'course_name' }
  },
  {
    title: '课程类型',
    dataIndex: 'category_name'
  },
  {
    title: '时长（分钟）',
    sorter: true,
    align: 'right',
    dataIndex: 'duration'
  },
  {
    title: '课程定价',
    dataIndex: 'sell_price',
    align: 'right',
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
    title: '发布渠道',
    dataIndex: 'publish_name',
    scopedSlots: { customRender: 'publish_name' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    fixed: 'right',
    width: 160,
    scopedSlots: { customRender: 'action' }
  }
]
