<template>
  <st-panel>
    <header>
      <label>营销效果</label>
      <i>!</i>
    </header>
  </st-panel>
</template>
<script>
import { PluginService } from './plugin.service'
export default {
  name: 'BrandMarktingPlugin',
  serviceInject() {
    return {
      pluginService: PluginService
    }
  },
  rxState() {
    return {
      info: this.pluginService.info$,
      auth: this.pluginService.auth$
    }
  },
  data() {
    return {
    }
  },
  components: {
  },
  methods: {

  }
}
</script>
