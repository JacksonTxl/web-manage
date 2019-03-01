<template>
  <div>
    Dashboard
    <li>
      <router-link :to="{query:{a:'1'}}">测试a1</router-link>
    </li>
    <li>
      <router-link :to="{query:{a:'2'}}">测试a2</router-link>
    </li>
    <router-link :to="{name:'test-llf'}">test-llf</router-link>
    {{list}}
    <a-input placeholder='haha'></a-input>
    <modal-link tag='a-button'
      :to="{name:'test'}">
      hello
    </modal-link>
  </div>
</template>

<script>
import { dashboardService } from './dashboard.service'

export default {
  subscriptions() {
    return {
      list: dashboardService.list$
    }
  }
}
</script>
