<template>
  <div :id="id"></div>
</template>

<script>
import { NoCaptchaService } from '@/services/no-captcha.service'
export default {
  name: 'NoCaptcha',
  serviceInject() {
    return {
      noCaptchaService: NoCaptchaService
    }
  },
  props: {
    id: {
      type: String,
      default: 'no-captcha'
    }
  },
  mounted() {
    this.noCaptchaService.init({
      renderTo: `#${this.id}`
    })
    this.noCaptchaService.resetNVC()
  }
}
</script>
