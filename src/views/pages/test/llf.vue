<template>
  <div>
    LLF
    <a-button :loading='isSwitching'
      @click='changeTheme'>changeTheme</a-button>
    <a-button type='primary'>primary</a-button>
  </div>
</template>

<script>
import { ThemeService } from '@/services/theme.service'
var i = 0
export default {
  serviceInject() {
    return {
      themeService: ThemeService
    }
  },
  data() {
    return {
      isSwitching: false
    }
  },
  methods: {
    changeTheme() {
      this.isSwitching = true
      var vars = ['pink', 'green', 'red']
      i++
      console.log(i)
      window.less
        .modifyVars({
          '@primary-color': vars[i % 3]
        })
        .then(() => {
          this.isSwitching = false
          this.$notification.info({
            message: 'haha',
            description: '编译陈工'
          })
        })
    }
  }
}
</script>
