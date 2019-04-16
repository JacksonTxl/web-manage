<template>
  <st-panel app>
    <div>Hello {{0 | enumFilter(staffEnums.sex)}}</div>
    {{enums}}
    <div>{{staffEnums}}</div>
  </st-panel>
</template>

<script>
import { UserService } from '@/services/user.service'
import { enumFilter } from '@/filters/other.filters'
export default {
  filters: {
    enumFilter
  },
  serviceInject() {
    return {
      userService: UserService
    }
  },
  subscriptions() {
    /**
     * @type {UserService}
     */
    const user = this.userService
    return {
      enums: user.enums$,
      staffEnums: user.staffEnums$,
      depositeCardEnums: user.depositeCardEnums$,
      memberEnums: user.memberEnums$
    }
  },
  data() {
    return {
      list: []
    }
  },
  methods: {}
}
</script>
