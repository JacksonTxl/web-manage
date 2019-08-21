export const ruleOptions = (vm: any) => {
  return {
    nature_work: {},
    identity: {},
    coach_level_id: {
      rules: [{ required: vm.coach_level_required, message: '请选择教练等级' }]
    },
    basic_salary: {},
    sale_percentage: {},
    course_percentage: {}
  }
}
