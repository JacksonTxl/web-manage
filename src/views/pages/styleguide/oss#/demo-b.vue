<template>
  <file-upload
    :numLimit="4"
    width="100px"
    height="100px"
    uploadText="支持自定义"
    fileType="bmp"
    :sizeLimit="0.1"
    @change="onImgChange">
  </file-upload>
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
