<template>
  <div class="st-copyright">
    <div>Copyright &#169; {{ yearRange }} 三体云智能科技有限公司</div>
  </div>
</template>

<script>
import { AppConfig } from '@/constants/config'
export default {
  name: 'StCopyright',
  serviceInject() {
    return {
      appConfig: AppConfig
    }
  },
  computed: {
    yearRange() {
      const { GIT_DATE } = this.appConfig
      const date = Math.max(+new Date(GIT_DATE), +new Date())
      return `2015-${new Date(date).getFullYear()}`
    }
  }
}
</script>
