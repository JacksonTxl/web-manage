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
import { appConfig } from '@/constants/config'

export default {
  name: 'app',
  // 服务注入
  serviceInject() {
    return {
      i18n: I18NService
    }
  },
  data() {
    return {
      count: 0,
      tips: [
        `commitNumber: ${appConfig.GIT_COMMIT} \n
          msg: ${appConfig.GIT_MESSAGE}`,
        `Date: ${appConfig.GIT_DATE}`
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
<style >
.git {
  position: absolute;
  bottom: 6px;
  right: 0px;
  z-index: 99999;
  min-height: 30px;
  min-width: 88px;
  opacity: 0;
}
.git:hover {
  opacity: 1;
  background: palevioletred;
}
.is-git {
  border: 3px solid palevioletred;
}
.is-git span {
  font-size: 12px;
  color: #fff;
  padding: 1px;
  background: palevioletred;
}
</style>
