<template>
  <div>
    Dashboard
    <router-link :to="{query:{a:'1'}}">测试</router-link>
    <router-link :to="{query:{a:'2'}}">测试</router-link>
  </div>
</template>

<script>
export default {
  beforeRouteUpdate(to, from, next) {
    next()
  },
  data() {
    return {
      a: 1
    }
  },
  mounted() {
    console.log(this.a)
  }
}
</script>
