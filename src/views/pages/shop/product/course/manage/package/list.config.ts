export const columns = () => {
  return [
    {
      title: '课程包名称',
      fixed: 'left',
      width: 180,
      dataIndex: 'course_name'
    },
    {
      title: '课程包分类',
      dataIndex: 'package_type',
      scopedSlots: {
        customRender: 'package_type'
      }
    },
    {
      title: '节数',
      dataIndex: 'total_times',
      align: 'right',
      sorter: true,
      scopedSlots: {
        customRender: 'total_times'
      }
    },
    {
      title: '有效期',
      dataIndex: 'valid_time',
      align: 'right',
      scopedSlots: {
        customRender: 'valid_time'
      }
    },
    {
      title: '支持售卖时间',
      dataIndex: 'sale_time',
      scopedSlots: {
        customRender: 'sale_time'
      }
    },
    {
      title: '售卖价格（元）',
      dataIndex: 'price',
      align: 'right',
      sorter: true,
      scopedSlots: {
        customRender: 'price'
      }
    },
    {
      title: '状态',
      dataIndex: 'shelf_status',
      scopedSlots: {
        customRender: 'shelf_status'
      }
    },
    {
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
      width: 140,
      scopedSlots: {
        customRender: 'action'
      }
    }
  ]
}
export const ruleOptions = (vm: any) => {
  return {
    start_time: {
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            if (!value) {
              return '请选择开始售卖时间'
            }
            if (
              value.valueOf() <
              vm
                .moment(
                  vm
                    .moment()
                    .format()
                    .replace(/\d{2}:\d{2}:\d{2}/, '00:00:00')
                )
                .valueOf()
            ) {
              return '支持售卖时间已过，请重新设置'
            }
          }
        }
      ]
    },
    end_time: {
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            if (!value) {
              return '请选择结束售卖时间'
            }
            if (
              value.valueOf() <
              vm
                .moment(
                  vm
                    .moment()
                    .format()
                    .replace(/\d{2}:\d{2}:\d{2}/, '23:59:59')
                )
                .valueOf()
            ) {
              return '支持售卖时间已过，请重新设置'
            }
          }
        }
      ]
    }
  }
}
