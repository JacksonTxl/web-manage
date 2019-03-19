<template>
  <div>
    Theme Change
    <a-button @click="changeTheme('default')">default</a-button>
    <a-button @click="changeTheme('pink')">pink</a-button>

  </div>
</template>

<script>
import { ThemeService } from '@/services/theme.service'
export default {
  serviceInject() {
    return {
      themeService: ThemeService
    }
  },
  methods: {
    changeTheme(theme) {
      console.log(this)
      this.themeService.changeTheme(theme)
    }
  }
}
</script>
