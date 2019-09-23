export const ruleOptions = (vm: any) => {
  return {
    reason_type: {
      initialValue: vm.unlockReasons[0].value
    },
    description: {}
  }
}
