<template>
  <div :class="b()">
    <div :class="b('navs')">
      <general-nav></general-nav>
    </div>
    <div :class="b('content')">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import GeneralNav from './nav#/general'
export default {
  bem: {
    b: 'page-setting'
  },
  components: {
    GeneralNav
  }
}
</script>
