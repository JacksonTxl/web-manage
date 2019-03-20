<template>
  <a-locale-provider :locale="antdLocale">
    <div id="app">
      <component :is='layoutComponent'></component>
      <modal-router-view></modal-router-view>
      <div class="git is-git"
        @click="getCommitHead">
        <span>{{tips[count]}}</span>
      </div>
    </div>
  </a-locale-provider>
</template>

<script>
import { layoutMap } from '@/views/layouts/index.ts'
import { I18NService } from '@/services/i18n.service'
import { AppConfig } from '@/constants/config'

export default {
  name: 'app',
  // 服务注入
  serviceInject() {
    return {
      i18n: I18NService,
      appConfig: AppConfig
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
  subscriptions() {
    return {
      antdLocale: this.i18n.antdLocale$
    }
  },
  methods: {
    getCommitHead() {
      this.count = this.count ? 0 : 1
    }
  },
  computed: {
    layoutName() {
      if (!this.$route.meta.layout && this.$route.name) {
        console.warn(`can not find meta.layout on route -> ${this.$route.name}`)
      }
      return this.$route.meta.layout || 'loading'
    },
    layoutComponent() {
      return layoutMap[this.layoutName]
    }
  }
}
</script>
