<template>
  <layout-default>
    Dashboard
    <li>
      <router-link :to="{query:{a:'1'}}">测试a1</router-link>
    </li>
    <li>
      <router-link :to="{query:{a:'2'}}">测试a2</router-link>
    </li>
    <router-link :to="{name:'plugins-course'}">course</router-link>
    {{list}}
    <modal-link tag='a-button'
      :to="{name:'test'}">
      hello
    </modal-link>
  </layout-default>
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
