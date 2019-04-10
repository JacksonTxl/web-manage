<template>
  <file-upload :list="fileList" @change="onImgChange"></file-upload>
</template>
<script>
export default {
  name: 'DemoA',
  data() {
    return {
      fileList: []
      // fileList: [{
      //   image_id: 10000,
      //   image_key: 'http://styd-saas-test.oss-cn-shanghai.aliyuncs.com/image/pLOFb5kCPN4gPQ8H'
      // }]
    }
  },
  methods: {
    onImgChange(fileList) {
      console.log('file changed, fileList: ', fileList)
    }
  }
}
</script>
