export const columns = [
  {
    title: '课程类型',
    dataIndex: 'category_name'
  },
  {
    title: '课程名称',
    dataIndex: 'course_name'
  },
  {
    title: '时长（分钟）',
    dataIndex: 'duration'
  },
  {
    title: '支持上课门店',
    dataIndex: 'shop_setting',
    scopedSlots: { customRender: 'shop_setting' }
  },
  {
    title: '定价方式',
    dataIndex: 'price_setting',
    scopedSlots: { customRender: 'price_setting' }
  },
  {
    title: '课程定价',
    dataIndex: 'course_pricing',
    scopedSlots: { customRender: 'course_pricing' }
  },
  {
    title: '授课教练数',
    dataIndex: 'coach_number',
    scopedSlots: { customRender: 'coachNumber' }
  },
  {
    title: '状态',
    dataIndex: 'is_available',
    scopedSlots: { customRender: 'is_available' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    fixed: 'right',
    width: 140,
    scopedSlots: { customRender: 'action' }
  }
]

export const mockTable = [
  {
    'course_id': 1,
    'category_name': '课程分类名称',
    'course_name': '课程名称',
    'duration': '60',
    'shop_number': '全门店',
    'pricing_type': '品牌统一定价',
    'course_pricing': '90元/节~500元/节',
    'coach_number': '5',
    'status': '无效'
  },
  {
    'course_id': 2,
    'category_name': '课程分类名称',
    'course_name': '课程名称',
    'duration': '60',
    'shop_number': '共有三家店',
    'pricing_type': '门店自主定价',
    'course_pricing': '90元/节~500元/节',
    'coach_number': '5',
    'status': '有效'
  }
]
