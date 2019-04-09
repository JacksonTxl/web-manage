<template>
  <file-upload :max="4" :width="100" :height="100" @change="onImgChange"></file-upload>
</template>
<script>
export default {
  name: 'DemoB',
  data() {
    return {
      fileList: []
    }
  },
  methods: {
    onImgChange(fileList) {
      console.log('file changed, fileList: ', fileList)
    }
  }
}
</script>
