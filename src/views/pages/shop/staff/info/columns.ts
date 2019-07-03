// 上课记录表格配置
export const courseColums = [
  {
    title: '上课时间',
    dataIndex: 'course_time',
    key: 'course_time'
  }, {
    title: '上课门店',
    dataIndex: 'shop_name',
    key: 'shop_name'
  }, {
    title: '课程类型',
    dataIndex: 'course_category',
    key: 'course_category'
  }, {
    title: '课程名称',
    dataIndex: 'course_name',
    // key: 'course_name',
    scopedSlots: { customRender: 'course_name' }
  }, {
    title: '上课教练',
    dataIndex: 'coach_name',
    key: 'coach_name'
  }, {
    title: '课程状态',
    dataIndex: 'course_status',
    key: 'course_status'
  }, {
    title: '预约人数',
    dataIndex: 'reserve_num',
    key: 'reserve_num'
  }, {
    title: '签到人数',
    dataIndex: 'checkin_num',
    key: 'checkin_num'
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
    dataIndex: 'follow_date',
    key: 'follow_date'
  }, {
    title: '门店',
    dataIndex: 'shop_name',
    key: 'shop_name'
  }, {
    title: '跟进用户',
    dataIndex: 'member_name',
    // key: 'member_name',
    scopedSlots: { customRender: 'member_name' }
  }, {
    title: '跟进方式',
    dataIndex: 'follow_way',
    key: 'follow_way'
  }, {
    title: '跟进结果',
    dataIndex: 'follow_status',
    key: 'follow_status'
  }, {
    title: '跟进说明',
    dataIndex: 'follow_content',
    key: 'follow_content'
  }
]

// 售卖订单表格配置
export const soldColums = [
  {
    title: '订单编号',
    dataIndex: 'id',
    // key: 'id',
    scopedSlots: { customRender: 'id' }
  }, {
    title: '销售门店',
    dataIndex: 'shop_name',
    key: 'shop_name'
  }, {
    title: '商品名称',
    dataIndex: 'product_name',
    key: 'product_name'
  }, {
    title: '商品类型',
    dataIndex: 'product_type',
    key: 'product_type',
    scopedSlots: { customRender: 'product_type' }
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
    dataIndex: 'member_name',
    key: 'member_name'
  }, {
    title: '手机号',
    dataIndex: 'mobile',
    key: 'mobile'
  }, {
    title: '下单时间',
    dataIndex: 'order_time',
    key: 'order_time'
  }, {
    title: '完成时间',
    dataIndex: 'finish_time',
    key: 'finish_time'
  }
]

// 服务课程表格配置
export const memberColums = [
  {
    title: '服务门店',
    dataIndex: 'shop_name',
    key: 'shop_name'
  }, {
    title: '课程名称',
    dataIndex: 'course_name',
    key: 'course_name',
    scopedSlots: { customRender: 'course_name' }
  }, {
    title: '课程分类',
    dataIndex: 'course_category',
    key: 'course_category'
  }, {
    title: '会员姓名',
    dataIndex: 'member_name',
    key: 'member_name',
    scopedSlots: { customRender: 'member_name' }
  }, {
    title: '手机号',
    dataIndex: 'mobile',
    key: 'mobile'
  }, {
    title: '课程状态',
    dataIndex: 'course_status',
    key: 'course_status',
    scopedSlots: { customRender: 'course_status' }
  }, {
    title: '购买课时',
    dataIndex: 'init_course_num',
    key: 'init_course_num'
  }, {
    title: '剩余课时',
    dataIndex: 'remain_course_num',
    key: 'remain_course_num'
  }, {
    title: '购买日期',
    dataIndex: 'buy_time',
    key: 'buy_time'
  }, {
    title: '到期日期',
    dataIndex: 'end_time',
    key: 'end_time'
  }
]
