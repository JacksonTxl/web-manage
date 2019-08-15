export const ruleOptions = (vm: any) => {
  const pattern = vm.pattern
  return {
    end_time: {
      rules: [{ required: true, message: '请选择租赁时间' }]
    },
    lease_num: {
      rules: [{ required: true, message: '请填租赁天数' }]
    },
    saleName: {
      rules: [{ required: true, message: '请选择销售人员' }]
    },
    contract_number: {
      rules: [
        { required: true, message: '请输入合同编号' },
        {
          required: pattern.EN_NUM('6-20'),
          message: '输入的手机号格式错误，请重新输入'
        }
      ]
    }
  }
}
