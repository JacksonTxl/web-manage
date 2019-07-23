<template>
  <div :id="id" class="nc-container"></div>
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
  rxState() {
    return {
      ncData: this.noCaptchaService.data$
    }
  },
  props: {
    id: {
      type: String,
      default: 'no-captcha'
    }
  },
  watch: {
    ncData(val) {
      console.log('ncData', val)
      this.$emit('change', val)
    }
  },
  mounted() {
    this.noCaptchaService.init({
      renderTo: `#${this.id}`
    })
  }
}
</script>
