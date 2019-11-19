/**
 * 配置外放 包含表格配置表单配置等
 */
/**
 *
 * @param vm Vue实例
 * 表格列 用于st-table的列选项
 */
export const columns = (vm: any) => {
  return [
    {
      title: '活动标题',
      dataIndex: 'activity_name',
      fixed: 'left',
      width: '140px',
      scopedSlots: { customRender: 'activity_name' }
    },
    {
      title: '活动开始时间',
      dataIndex: 'start_time',
      scopedSlots: { customRender: 'start_time' }
    },
    {
      title: '活动结束时间',
      dataIndex: 'end_time',
      scopedSlots: { customRender: 'end_time' }
    },
    {
      title: '包含票种',
      dataIndex: 'ticket_type_num',
      // 数字 右对齐
      align: 'right',
      scopedSlots: { customRender: 'ticket_type_num' }
    },
    {
      title: '发布时间',
      dataIndex: 'publish_time',
      scopedSlots: { customRender: 'publish_time' }
    },
    {
      title: '已报名人数',
      dataIndex: 'join_people',
      // 数字 右对齐
      align: 'right',
      scopedSlots: { customRender: 'join_people' }
    },
    {
      title: '活动状态',
      dataIndex: 'activity_status',
      scopedSlots: { customRender: 'activity_status' }
    },
    {
      title: '操作',
      dataIndex: 'actions',
      /**
       * 右对齐 宽度根据最大操作项目宽度决定
       */
      width: 120,
      fixed: 'right',
      scopedSlots: { customRender: 'actions' }
    }
  ]
}
