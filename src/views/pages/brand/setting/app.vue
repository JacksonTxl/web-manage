<template>
  <div :class="b()">
    <div :class="b('navs')">
      <app-nav></app-nav>
    </div>
    <div :class="b('content')">
      <router-view to="./app/course/team">b</router-view>
    </div>
  </div>
</template>
<script>
import AppNav from './nav#/app-nav'
export default {
  bem: {
    b: 'page-setting-app'
  },
  components: {
    AppNav
  }
}
</script>
