<template>
  <div>
    Dashboard
    Locale -> {{locale}}
    {{$t('title')}}
    {{tabs}}
    <a-select :defaultValue="locale"
      @change="onToggle">
      <a-select-option value="zh_CN">zh_CN</a-select-option>
      <a-select-option value="en_US">en_US</a-select-option>
    </a-select>
    <li>
      <router-link :to="{query:{a:'1'}}">测试a1</router-link>
    </li>
    <li>
      <router-link :to="{query:{a:'2'}}">测试a2</router-link>
    </li>
    <router-link :to="{name:'test-llf'}">test-llf</router-link>
    <a-input placeholder='haha'></a-input>
    <modal-link tag='a-button'
      :to="{name:'test'}">
      hello
    </modal-link>
  </div>
</template>

<script>
import { ListLoader } from 'vue-content-loader'
import { dashboardService } from './dashboard.service'
import { localeService } from '@/services/locale.service'
import { tabService } from '@/services/tab.service'

export default {
  components: {},
  subscriptions() {
    return {
      list: dashboardService.list$,
      locale: localeService.locale$,

      tabs: tabService.tabs$
    }
  },
  methods: {
    onToggle(locale) {
      localeService.SET_LOCALE(locale)
    }
  },
  mounted() {}
}
</script>
