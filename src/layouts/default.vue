<template>
  <div class="layout-default">
    <h1>this is layout default</h1>
    {{user}}
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { userService } from '@/services/user.service'

export default {
  subscriptions() {
    return {
      user: userService.user$
    }
  },
  created() {
    console.log('layout created')
  }
}
</script>
