<template>
  <a-locale-provider :locale='antdLocaleMessages'>
    <div id="app">
      <component :is='layoutComponent'></component>
      <modal-router-view></modal-router-view>
    </div>
  </a-locale-provider>
</template>

<script>
import { localeService } from '@/services/locale.service'
import { layoutMap } from '@/views/layouts/index.ts'

export default {
  name: 'app',
  subscriptions() {
    return {
      antdLocaleMessages: localeService.antdLocaleMessages$
    }
  },
  computed: {
    layoutName() {
      return this.$route.meta.layout || 'loading'
    },
    layoutComponent() {
      return layoutMap[this.layoutName]
    }
  }
}
</script>
