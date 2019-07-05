<template>
  <div>
    <h2>Service 服务类</h2>
    <oss-demo id="oss"></oss-demo>
    <pattern-demo id="pattern"></pattern-demo>
  </div>
</template>

<script>
import OssDemo from './service#/oss.vue'
import PatternDemo from './service#/pattern'
export default {
  components: {
    OssDemo,
    PatternDemo
  }
}
</script>
