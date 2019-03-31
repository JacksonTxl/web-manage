<template>
  <div>
    <!-- 图片预览 -->
    <h4>v-viewer</h4>
    <p>使用st-preview-item 类 添加预览图片样式</p>
    <viewer-demo />
    <!-- 数字动画 -->
    <h4>vue-countup-v2</h4>
    <countup-demo />
    <!-- 图片裁剪 -->
    <h4>cropper</h4>
    <cropper-demo />
  </div>
</template>
<script>
import CountupDemo from './plugins/countup#.vue'
import ViewerDemo from './plugins/viewer#.vue'
import CropperDemo from './plugins/cropper#.vue'
export default {
  components: {
    ViewerDemo,
    CountupDemo,
    CropperDemo
  }
}
</script>
