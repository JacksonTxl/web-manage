<template>
  <div v-html="info.html"></div>
</template>
<script>
import { PrintService } from './print.service'
export default {
  bem: {
    b: 'extra-ticket-preview'
  },
  serviceInject() {
    return {
      printService: PrintService
    }
  },
  rxState() {
    return {
      info: this.printService.info$
    }
  },
  mounted() {
    window.print()
  }
}
</script>
