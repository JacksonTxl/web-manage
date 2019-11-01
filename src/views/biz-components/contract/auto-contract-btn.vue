<template>
  <st-button v-if="!isBrandStudio" v-bind="$attrs" v-on="$listeners">
    自动生成
  </st-button>
</template>

<script>
import { UserService } from '@/services/user.service'
export default {
  serviceInject() {
    return {
      user: UserService
    }
  },
  rxState() {
    return {
      isBrandStudio: this.user.isBrandStudio$
    }
  }
}
</script>
