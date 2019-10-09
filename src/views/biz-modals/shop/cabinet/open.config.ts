import { get } from 'lodash-es'

export const ruleOptions = (vm: any) => {
  return {
    reason_type: {
      initialValue: get(vm.unlockReasons, '0.value', 1)
    },
    description: {}
  }
}
