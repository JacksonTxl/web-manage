export const weekList = [
  '',
  '周一',
  '周二',
  '周三',
  '周四',
  '周五',
  '周六',
  '周日'
]

export const shop_columns = [
  {
    title: '省',
    dataIndex: 'province_name',
    width: '22%'
  },
  {
    title: '市',
    dataIndex: 'city_name',
    width: '22%'
  },
  {
    title: '区',
    dataIndex: 'district_name',
    width: '22%'
  },
  {
    title: '门店名称',
    dataIndex: 'shop_name',
    width: '34%'
  }
]

export const price_gradient_columns = [
  {
    title: '入场次数',
    scopedSlots: { customRender: 'validity_times' },
    width: '20%',
    dataIndex: 'validity_times'
  },
  {
    title: '售价',
    scopedSlots: { customRender: 'sale_price' },
    width: '20%',
    dataIndex: 'sale_price'
  },
  {
    title: '有效期',
    scopedSlots: { customRender: 'validity_period' },
    width: '20%',
    dataIndex: 'validity_period'
  },
  {
    title: '允许冻结天数',
    scopedSlots: { customRender: 'frozen_day' },
    width: '20%',
    dataIndex: 'frozen_day'
  },
  {
    title: '赠送上限',
    scopedSlots: { customRender: 'gift_unit' },
    width: '20%',
    dataIndex: 'gift_unit'
  }
]

export const courses_columns = [
  {
    title: '课程类别',
    scopedSlots: { customRender: 'course_type' },
    dataIndex: 'course_type',
    width: '33%'
  },
  {
    title: '课程类型',
    scopedSlots: { customRender: 'category' },
    dataIndex: 'category',
    width: '33%'
  },
  {
    title: '课程名称',
    scopedSlots: { customRender: 'course_name' },
    dataIndex: 'course_name',
    width: '34%'
  }
]
