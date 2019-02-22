<template>
  <layout-default>
    Dashboard
    <router-link :to="{query:{a:'1'}}">测试</router-link>
    <router-link :to="{query:{a:'2'}}">测试</router-link>
    <router-link :to="{name:'plugins-course'}">course</router-link>
    {{list}}
  </layout-default>
</template>

<script lang='ts'>
import Vue from 'vue'
import { Route } from 'vue-router'
import { dashboardService } from '@/pages/dashboard.service'

export default Vue.extend({
  beforeRouteUpdate(to, from, next) {
    next()
  },
  subscriptions() {
    return {
      list: dashboardService.list
    }
  }
})
</script>
