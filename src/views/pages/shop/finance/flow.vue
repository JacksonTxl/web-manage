<template>
  <st-panel app :tabs="authTabs">
    <router-view></router-view>
  </st-panel>
</template>
<script>
import { FlowService } from './flow.service'
export default {
  name: 'FinanceFlow',
  serviceInject() {
    return {
      flowService: FlowService
    }
  },
  rxState() {
    return {
      authTabs: this.flowService.authTabs$
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
