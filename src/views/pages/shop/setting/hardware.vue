<template>
  <router-view></router-view>
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
