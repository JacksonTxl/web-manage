export const ruleOptions = (vm: any) => {
  return {
    openDay: { rules: [{ required: true, message: '请输入天数' }] },
    courseList: {
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            if (vm.courseInterests === 3) {
              if (!value || value.length <= 0) {
                return '请选择课程'
              }
            }
          }
        }
      ]
    },
    timeList: {
      rules: [
        {
          validator: (field: any, value: any, values: any) => {
            console.log(value)
            if (vm.admissionTime === 2 && vm.moreIsShow) {
              if (!value || value.length <= 0) {
                return '请选择入场时间'
              }
            }
          }
        }
      ]
    }
  }
}

export const shopColumns = () => {
  return [
    {
      title: '省',
      dataIndex: 'province_name',
      scopedSlots: { customRender: 'province_name' }
    },
    {
      title: '市',
      dataIndex: 'city_name',
      scopedSlots: { customRender: 'city_name' }
    },
    {
      title: '区',
      dataIndex: 'district_name',
      scopedSlots: { customRender: 'district_name' }
    },
    {
      title: '门店名称',
      dataIndex: 'shop_name',
      scopedSlots: { customRender: 'shop_name' }
    }
  ]
}
// 入场时间
export const admissionTimeList = () => {
  return [
    {
      value: 1,
      label: '不限制'
    },
    {
      value: 2,
      label: '自定义'
    }
  ]
}
