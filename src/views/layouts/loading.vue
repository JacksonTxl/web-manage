<template>
  <div class="layout-loading">
    <!-- 这里的样式在public/index.html中 -->
    <div class="loader">
      <div class="inner one"></div>
      <div class="inner two"></div>
      <div class="inner three"></div>
    </div>
    <p class="slogan">{{ text }}</p>
  </div>
</template>

<script>
import { NProgressService } from '@/services/nprogress.service'
export default {
  serviceInject() {
    return {
      nProgressService: NProgressService
    }
  },
  rxState() {
    const { text$ } = this.nProgressService
    return {
      text: text$
    }
  }
}
</script>
