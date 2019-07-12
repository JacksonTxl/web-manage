<template>
  <st-panel app>
    <st-image-upload is-private></st-image-upload>
    <a v-modal-link="{name:'test-sg'}">test</a>
    {{auth}}
  </st-panel>
</template>

<script>
import { ComponentService } from './component.service'
export default {
  serviceInject() {
    return {
      componentService: ComponentService
    }
  },
  rxState() {
    return {
      auth: this.componentService.auth$
    }
  },
  data() {
    return {
      show: false
    }
  },
  mounted() {}
}
</script>
