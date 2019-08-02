<template>
  <st-panel app :tabs="authTabs">
    <router-view></router-view>
  </st-panel>
</template>
<script>
import { SmsService } from './sms.service'
export default {
  name: 'BrandSettingSms',
  serviceInject() {
    return {
      smsService: SmsService
    }
  },
  rxState() {
    return {
      authTabs: this.smsService.authTabs$
    }
  },
  data() {
    return {}
  },
  computed: {},
  methods: {},
  components: {}
}
</script>
