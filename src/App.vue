<template>
  <a-locale-provider :locale='antdLocaleMessages'>
    <div id="app">
      <component :is='layoutComponent'></component>
      <modal-router-view></modal-router-view>
      <div :class="{'git': true, 'is-git': !!gitNumber}"
        @click="getCommitHead">
        <span>{{gitNumber}}</span>
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
      gitNumber: '',
      tips: [
        '被你发现了 🐷',
        '再点一下试试 👋',
        '会有彩蛋哟 ',
        '离宝藏就差一步了'
      ]
    }
  },
  methods: {
    getCommitHead() {
      this.count < 5 && this.count++
      this.gitNumber =
        this.count >= 5 ? process.env.GIT_COMMIT : this.tips[this.count - 1]
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
