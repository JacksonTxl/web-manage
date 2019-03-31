<template>
  <div>
    <!-- 图片预览 -->
    <h4>v-viewer</h4>
    <viewer-demo/>
    <!-- 数字动画 -->
    <h4>vue-countup-v2</h4>
    <countup-demo/>
  </div>
</template>
<script>
import CountupDemo from './plugins/countup.vue'
import ViewerDemo from './plugins/viewer.vue'
export default {
  components: {
    ViewerDemo,
    CountupDemo
  }
}
</script>
