<template>
  <div>
    <h1>this is course page</h1>
    {{list}}
    <router-link :to="{name:'dashboard'}">dashboard</router-link>
  </div>
</template>
<script>
import { courseService } from './course.service'
export default {
  data() {
    return {}
  },
  subscriptions() {
    return {
      list: courseService.list$
    }
  }
}
</script>
