<template>
  <div>
    this is app layout
    {{user}}
    <router-view></router-view>
  </div>
</template>

<script lang="js">
import { userService } from '@/services/user.service'

export default {
  data() {
    return {
      testEslint: '',
      flag: true
    }
  },
  methods: {
    tEslint() {
      if (this.flag) {
        console.log('ddff')
      }
    }
  }
}
</script>
