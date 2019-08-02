export const rules = (vm: any) => {
  const pattern = vm.pattern
  return {
    firstLetter: [
      'first_letter',
      {
        rules: [
          {
            pattern: pattern.EN('1-1'),
            message: '请输入正确的首字母'
          }
        ]
      }
    ]
  }
}
