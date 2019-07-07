export const columns = () => {
  return [{
    title: '课程包名称',
    dataIndex: 'course_name'
  }, {
    title: '课程包分类',
    dataIndex: 'package_type',
    scopedSlots: {
      customRender: 'package_type'
    }
  }, {
    title: '节数',
    dataIndex: 'total_times',
    align: 'right',
    scopedSlots: {
      customRender: 'total_times'
    }
  }, {
    title: '有效期',
    dataIndex: 'valid_time',
    align: 'right',
    scopedSlots: {
      customRender: 'valid_time'
    }
  }, {
    title: '支持售卖时间',
    dataIndex: 'sale_time',
    scopedSlots: {
      customRender: 'sale_time'
    }
  }, {
    title: '售卖价格（元）',
    dataIndex: 'price',
    align: 'right',
    scopedSlots: {
      customRender: 'price'
    }
  }, {
    title: '状态',
    dataIndex: 'shelf_status',
    scopedSlots: {
      customRender: 'shelf_status'
    }
  }, {
    title: '操作',
    dataIndex: 'action',
    fixed: 'right',
    width: 140,
    scopedSlots: {
      customRender: 'action'
    }
  }]
}