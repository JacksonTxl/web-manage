<template>
  <a-locale-provider :locale='antdLocaleMessages'>
    <router-view></router-view>
    <modal-router-view></modal-router-view>
  </a-locale-provider>
</template>

<script>
import { localeService } from '@/services/locale.service'
// @ts-ignore
export default {
  name: 'app',
  subscriptions() {
    return {
      antdLocaleMessages: localeService.antdLocaleMessages$
    }
  }
}
</script>
