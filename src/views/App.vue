<template>
  <a-locale-provider :locale="antdLocaleMessages">
    <div id="app">
      <component :is="layoutComponent"></component>
      <modal-router-view></modal-router-view>
      <!-- 本地开发下 -->
      <div v-if="appConfig.IS_DEV" class="app-env">
        <span>
          API:{{ appConfig.LOCAL_API_ENV }} 页面:{{ appConfig.PAGE_ENV }}
        </span>
      </div>

      <!-- 非生产域名下 -->
      <div v-if="appConfig.IS_PROD && !appConfig.HOST_IS_PROD" class="app-env">
        分支:{{ appConfig.GIT_BRANCH }}
        <a href="/_branch">切换</a>
      </div>
    </div>
  </a-locale-provider>
</template>

<script>
import { layoutMap } from '@/views/layouts/index.ts'
import { I18NService } from '@/services/i18n.service'
import { AppConfig } from '@/constants/config'
import { RouteService } from '@/services/route.service'

export default {
  name: 'app',
  // 服务注入
  serviceInject() {
    return {
      i18n: I18NService,
      appConfig: AppConfig,
      route: RouteService
    }
  },
  rxState() {
    const { layout$, query$ } = this.route
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
