<template>
  <a-locale-provider :locale="antdLocaleMessages">
    <div id="app">
      <component :is="layoutComponent"></component>
      <modal-router-view></modal-router-view>

      <div class="app-env" v-if="appConfig.IS_DEV">
        <!-- 本地开发下 -->
        <span>
          <span>本地开发 API:{{ appConfig.LOCAL_API_ENV }}</span>
          <span v-show="appConfig.PAGE_ENV">页面:{{ appConfig.PAGE_ENV }}</span>
        </span>
      </div>

      <st-branch-switch />
    </div>
  </a-locale-provider>
</template>

<script>
import { layoutMap } from '@/views/layouts/index.ts'
import { I18NService } from '@/services/i18n.service'
import { AppConfig } from '@/constants/config'
import { RouteService } from '@/services/route.service'
import { UdeskService } from '@/services/udesk.service'

export default {
  name: 'app',
  // 服务注入
  serviceInject() {
    return {
      i18n: I18NService,
      appConfig: AppConfig,
      udeskService: UdeskService
    }
  },
  rxState() {
    return {
      antdLocaleMessages: this.i18n.antdLocaleMessages$
    }
  },
  computed: {
    layoutComponent() {
      return layoutMap[this.$route.meta.layout || 'loading']
    }
  }
}
</script>
