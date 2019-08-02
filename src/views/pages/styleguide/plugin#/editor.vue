<template>
  <section class="sg-section">
    <h3>
      tinymce
      <a href="http://tinymce.ax-z.cn/">中文文档</a>
    </h3>
    <!-- 更多时间列表请查看editor#.vue -->
    <st-editor @paste="onPaste" v-model="content"></st-editor>
    {{ content }}
  </section>
</template>

<script>
// 按需引入
import StEditor from '@/views/biz-components/editor/editor.vue'
export default {
  components: {
    StEditor
  },
  data() {
    return {
      content: ''
    }
  },
  methods: {
    onPaste(e) {
      console.log(e)
    }
  }
}
</script>
