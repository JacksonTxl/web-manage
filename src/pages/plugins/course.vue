<template>
  <div>
    <h1>this is course page</h1>
    {{list}}
    <router-link :to="{name:'dashboard'}">dashboard</router-link>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { courseService } from '@/pages/plugins/course.service'
export default Vue.extend({
  data() {
    return {}
  },
  subscriptions() {
    return {
      list: courseService.list$
    }
  }
})
</script>
