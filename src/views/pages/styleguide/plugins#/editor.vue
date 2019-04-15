<template>
  <div>
    <!-- 更多时间列表请查看editor#.vue -->
    <st-editor @paste="onPaste" v-model="content"></st-editor>
    {{content}}
  </div>
</template>

<script>
// 按需引入
import StEditor from '@/views/components/editor/editor#.vue'
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
