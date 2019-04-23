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
import CountupDemo from './plugin#/countup.vue'
import ViewerDemo from './plugin#/viewer.vue'
import CropperDemo from './plugin#/cropper.vue'
import EditorDemo from './plugin#/editor.vue'
export default {
  components: {
    ViewerDemo,
    CountupDemo,
    CropperDemo,
    EditorDemo
  }
}
</script>
