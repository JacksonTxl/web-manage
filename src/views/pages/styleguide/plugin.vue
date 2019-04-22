<template>
  <div>
    <h2>Plugin 插件</h2>
    <!-- 图片预览 -->
    <viewer-demo/>
    <!-- 数字动画 -->
    <countup-demo/>
    <!-- 图片裁剪 -->
    <cropper-demo/>
    <editor-demo />
  </div>
</template>
<script>
import CountupDemo from './plugins#/countup.vue'
import ViewerDemo from './plugins#/viewer.vue'
import CropperDemo from './plugins#/cropper.vue'
import EditorDemo from './plugins#/editor.vue'
export default {
  components: {
    ViewerDemo,
    CountupDemo,
    CropperDemo,
    EditorDemo
  }
}
</script>
