<template>
  <st-panel
    :tabs="tabs"
  >
    <div slot="actions"></div>
    <router-view></router-view>
  </st-panel>
</template>
<script>
import { TemplateService } from './template.service'
export default {
  serviceInject() {
    return {
      templateService: TemplateService
    }
  },
  rxState() {
    return {
      tabs: this.templateService.tabs$
    }
  }
}
</script>
