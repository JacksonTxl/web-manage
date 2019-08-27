<template>
  <st-panel app :tabs="authTabs">
    <router-view></router-view>
  </st-panel>
</template>
<script>
import { HardwareService } from './hardware.service'
export default {
  name: 'ShopHardware',
  serviceInject() {
    return {
      hardwareService: HardwareService
    }
  },
  rxState() {
    return {
      authTabs: this.hardwareService.authTabs$
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
