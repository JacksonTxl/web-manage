<template>
  <div>{{ info$ }}</div>
</template>

<script>
import { InfoService } from './info.service'
export default {
  name: 'NoticeInfo',
  serviceInject() {
    return {
      service: InfoService
    }
  },
  rxState() {
    const { info$ } = this.service
    return { info$ }
  }
}
</script>
