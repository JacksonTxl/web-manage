<template>
  <a-locale-provider :locale="antdLocaleMessages">
    <div id="app">
      <component :is="layoutComponent"></component>
      <modal-router-view></modal-router-view>
      <div class="git is-git" @click="getCommitHead">
        <span>{{tips[count]}}</span>
      </div>
    </div>
  </a-locale-provider>
</template>

<script>
import { layoutMap } from '@/views/layouts/index.ts'
import { I18NService } from '@/services/i18n.service'
import { AppConfig } from '@/constants/config'
import { ResourceFilters } from '@/filters/resource.filters'
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
  subscriptions() {
    const { layout$, query$ } = this.route
    const t$ = this.i18n.t$.bind(this.i18n)
    return {
      antdLocaleMessages: this.i18n.antdLocaleMessages$,
      layout: layout$,
      query: query$,
      title: t$('app.title')
    }
  },
  data() {
    return {
      count: 0,
      tips: [
        `commitNumber: ${this.appConfig.GIT_COMMIT} \n
          msg: ${this.appConfig.GIT_MESSAGE}`,
        `Date: ${this.appConfig.GIT_DATE}`
      ]
    }
  },
  methods: {
    getCommitHead() {
      this.count = this.count ? 0 : 1
    }
  },
  computed: {
    layoutComponent() {
      return layoutMap[this.layout]
    }
  }
}
</script>
