<template>
  <a-locale-provider :locale="antdLocaleMessages">
    <div id="app">
      <component :is="layoutComponent"></component>
      <modal-router-view></modal-router-view>

      <div class="app-env">
        <!-- 本地开发下 -->
        <span v-if="appConfig.IS_DEV">
          <span>本地开发 API:{{ appConfig.LOCAL_API_ENV }}</span>
          <span v-show="appConfig.PAGE_ENV">页面:{{ appConfig.PAGE_ENV }}</span>
        </span>
        <!-- 域名为.dev 或 .test -->
        <span
          v-if="appConfig.HOST_IS_DEV || appConfig.HOST_IS_TEST"
          class="app-env"
        >
          分支:{{ appConfig.GIT_BRANCH }}
          <a href="/_branch">切换</a>
        </span>
      </div>
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
      route: RouteService,
      udeskService: UdeskService
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
  },
  mounted() {
    this.udeskService.init().subscribe()
  }
}
</script>
