export const ruleOptions = (vm: any) => {
  return {
    nature_work: {},
    identity: {},
    coach_level_id: {
      rules: [
        {
          required: vm.coach_level_required,
          message: `请选择${vm.$c('coach')}等级`
        }
      ]
    },
    basic_salary: {},
    sale_percentage: {},
    course_percentage: {}
  }
}
