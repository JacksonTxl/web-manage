<template>
  <st-panel :tabs="authTabs">
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
      authTabs: this.templateService.authTabs$
    }
  }
}
</script>
