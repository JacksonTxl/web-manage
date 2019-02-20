<template>
  <div>
    this is app layout
    {{user}}
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { userService } from '@/services/user.service'

export default {
  subscriptions() {
    return {
      user: userService.user
    }
  }
}
</script>
