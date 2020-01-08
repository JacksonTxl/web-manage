export const columns = [
  {
    title: '场地名称',
    dataIndex: 'site_name'
  },
  {
    title: '特殊设置',
    dataIndex: 'site_settings_text'
  },
  {
    title: '状态',
    dataIndex: 'site_status',
    scopedSlots: { customRender: 'site_status' }
  },
  {
    title: '操作',
    fixed: 'right',
    width: 170,
    scopedSlots: { customRender: 'action' }
  }
]
