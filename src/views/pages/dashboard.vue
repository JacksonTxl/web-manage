<template>
  <div>
    Dashboard
    <li>
      <router-link :to="{query:{a:'1'}}">测试a1</router-link>
    </li>
    <li>
      <router-link :to="{query:{a:'2'}}">测试a2</router-link>
    </li>
    <list-loader :width='800'></list-loader>
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

export default {
  components: {
    ListLoader
  },
  subscriptions() {
    return {
      list: dashboardService.list$
    }
  }
}
</script>
