export const admissionColumns = (vm: any) => {
  return [
    { title: '省', dataIndex: 'province_name', key: 'province_name' },
    { title: '市', dataIndex: 'city_name', key: 'city_name' },
    { title: '区', dataIndex: 'district_name', key: 'district_name' },
    { title: '门店名称', dataIndex: 'shop_name', key: 'shop_name' }
  ]
}
export const courseColumns = (vm: any) => {
  return [
    { title: '课程类型', dataIndex: 'course_type', key: 'course_type' },
    { title: '课程名称', dataIndex: 'name', key: 'name' }
  ]
}
