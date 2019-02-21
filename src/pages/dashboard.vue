<template>
  <div>
    Dashboard
    <router-link :to="{query:{a:'1'}}">测试</router-link>
    <router-link :to="{query:{a:'2'}}">测试</router-link>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import { Route } from 'vue-router'
export default Vue.extend({
  beforeRouteUpdate(to, from, next) {
    next()
  }
})
</script>
