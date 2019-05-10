<template>
  <div class="page-setting-app">
    <app-nav></app-nav>
    <router-link to="./course/personal">a</router-link>
    <router-view to="./course/team">b</router-view>
  </div>
</template>
<script>
import AppNav from './nav#/app-nav'
export default {
  components: {
    AppNav
  }
}
</script>
