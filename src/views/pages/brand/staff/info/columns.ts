// 上课记录表格配置
export const courseColums = [
  {
    title: '上课时间',
    dataIndex: 'course_time',
    key: 'course_time'
  }, {
    title: '上课门店',
    dataIndex: 'course_shop',
    key: 'course_shop'
  }, {
    title: '课程类型',
    dataIndex: 'course_type',
    key: 'course_type'
  }, {
    title: '课程名称',
    dataIndex: 'course_name',
    key: 'course_name'
  }, {
    title: '上课教练',
    dataIndex: 'course_coach',
    key: 'course_coach'
  }, {
    title: '课程状态',
    dataIndex: 'course_status',
    key: 'course_status'
  }, {
    title: '上课人数',
    dataIndex: 'course_nums',
    key: 'course_nums'
  }, {
    title: '签到人数',
    dataIndex: 'sign_nums',
    key: 'sign_nums'
  }, {
    title: '操作',
    fixed: 'right',
    width: 200,
    scopedSlots: { customRender: 'action' }
  }
]

// 跟进记录表格配置
export const followColumns = [
  {
    title: '跟进时间',
    dataIndex: 'follow_time',
    key: 'follow_time'
  }, {
    title: '门店',
    dataIndex: 'follow_shop',
    key: 'follow_shop'
  }, {
    title: '跟进会员',
    dataIndex: 'follow_member',
    key: 'follow_member'
  }, {
    title: '跟进方式',
    dataIndex: 'follow_way',
    key: 'follow_way'
  }, {
    title: '跟进结果',
    dataIndex: 'follow_result',
    key: 'follow_result'
  }, {
    title: '跟进说明',
    dataIndex: 'follow_note',
    key: 'follow_note'
  }
]

// 售卖订单表格配置
export const soldColums = [
  {
    title: '订单编号',
    dataIndex: 'order_num',
    key: 'order_num'
  }, {
    title: '销售门店',
    dataIndex: 'sold_shop',
    key: 'sold_shop'
  }, {
    title: '商品名称',
    dataIndex: 'shop_name',
    key: 'shop_name'
  }, {
    title: '商品类型',
    dataIndex: 'shop_type',
    key: 'shop_type'
  }, {
    title: '订单状态',
    dataIndex: 'order_status',
    key: 'order_status'
  }, {
    title: '支付状态',
    dataIndex: 'pay_status',
    key: 'pay_status'
  }, {
    title: '用户姓名',
    dataIndex: 'user_name',
    key: 'user_name'
  }, {
    title: '手机号',
    dataIndex: 'phone',
    key: 'phone'
  }, {
    title: '下单时间',
    dataIndex: 'order_time',
    key: 'order_time'
  }, {
    title: '完成时间',
    dataIndex: 'resul_time',
    key: 'resul_time'
  }
]

// 服务会员表格配置
export const memberColums = [
  {
    title: '课程名称',
    dataIndex: 'q',
    key: 'q'
  }, {
    title: '课程分类',
    dataIndex: 'w',
    key: 'w'
  }, {
    title: '会员姓名',
    dataIndex: 'e',
    key: 'e'
  }, {
    title: '手机号',
    dataIndex: 'r',
    key: 'r'
  }, {
    title: '课程状态',
    dataIndex: 't',
    key: 't'
  }, {
    title: '购买课时',
    dataIndex: 'y',
    key: 'y'
  }, {
    title: '剩余课时',
    dataIndex: 'u',
    key: 'u'
  }, {
    title: '购买时间',
    dataIndex: 'i',
    key: 'i'
  }, {
    title: '到期时间',
    dataIndex: 'o',
    key: 'o'
  }
]
