<template>
  <a-locale-provider :locale='antdLocaleMessages'>
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
import { localeService } from '@/services/locale.service'
import { layoutMap } from '@/views/layouts/index.ts'

export default {
  name: 'app',
  subscriptions() {
    return {
      antdLocaleMessages: localeService.antdLocaleMessages$
    }
  },
  data() {
    return {
      count: 0,
      tips: [
        `commitNumber: ${process.env.GIT_COMMIT} \n
          msg: ${process.env.GIT_MESSAGE}`,
        `Date: ${process.env.GIT_DATE}`
      ]
    }
  },
  methods: {
    getCommitHead() {
      this.count = this.count ? 0 : 1
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
