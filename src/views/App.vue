<template>
  <a-locale-provider :locale="antdLocaleMessages">
    <div id="app">
      <component :is="layoutComponent"></component>
      <modal-router-view></modal-router-view>
      <div class="git is-git" @click="getCommitHead" :style="gitStyle">
        <span class="git__content">{{tip}}</span>
      </div>
      <div v-if="appConfig.IS_DEV" class="api-env">{{gitTip}}</div>
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
      antdLocaleMessages: this.i18n.antdLocaleMessages$,
      layout: layout$
    }
  },
  data() {
    return {
      count: 0,
      tip: `${this.appConfig.GIT_BRANCH} ${this.appConfig.GIT_COMMIT}`
    }
  },
  methods: {
    getCommitHead() {
      this.count++
    }
  },
  computed: {
    layoutComponent() {
      return layoutMap[this.layout || 'loading']
    },
    gitStyle() {
      console.log(this.count)
      return {
        opacity: this.count > 2 ? 1 : 0
      }
    }
  }
}
</script>
