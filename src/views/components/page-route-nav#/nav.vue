<template>
  <div :class="b()">
    <div :class="b('navs')">
      <div>
        <div :class="b('title')">
          <st-t2>{{title}}</st-t2>
        </div>
        <st-route-tabs
          v-if="value"
          :options="value"
          tabPosition="right"
        >
        </st-route-tabs>
      </div>
    </div>
    <div :class="b('content')">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PageRouteNav',
  bem: {
    b: 'st-page-route-nav'
  },
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    },
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
