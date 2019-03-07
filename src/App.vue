<template>
  <a-locale-provider :locale='antdLocaleMessages'>
    <div id="app">
      <component :is='layoutComponent'></component>
      <modal-router-view></modal-router-view>
      <div :class="{'git': true, 'is-git': !!gitNumber}" @click="getCommitHead">
        <span>{{gitNumber}}</span>
      </div>
      <div v-if="egg" class="egg"><span>{{egg}}</span></div>
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
      egg: '',
      timer: '',
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
      this.count++
      if (this.count === 5) {
        this.egg = process.env.NODE_ENV !== 'production' ? `喜提版本号一个：${process.env.GIT_COMMIT}恭喜!!! ` : ''
        this.gitNumber = process.env.GIT_COMMIT
        this.timer = setTimeout(() => {
          this.egg = ''
          clearTimeout(this.timer)
        }, 4000)
        this.count = 0
      } else {
        this.gitNumber = this.tips[this.count - 1]
      }
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
.git{
  position: absolute;
  bottom: 0px;
  right: 0px;
  z-index: 99999;
  height: 40px;
  width: 116px;
  opacity: 0;
}
.git:hover{
  opacity: 1;
  background: palevioletred
}
.is-git{
  border: 3px solid palevioletred;
  font-size: 22px;
}
.egg{
  font-size: 100px;
  width: 100vw;
  z-index: 9999999999;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,.3);
  height: 100vh;
  color: palevioletred;
}
.is-git span {
  font-size: 12px;
  color: #fff;
  padding: 3px;
  background: palevioletred;
}
</style>
