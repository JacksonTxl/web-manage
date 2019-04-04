<template>
  <div v-viewer="{ url: 'data-src' }">
    <span class="st-preview-item"
      v-for="(imgKey, index) in imgKeys"
      :key="index">
      <img :src="imgKey|imgFilter({ w: 100, h: 56 })"
        :data-src="imgKey|imgFilter({ w: 1000 })" />
    </span>
  </div>
</template>
<script>
import { imgFilter } from '@/filters/resource.filters'
export default {
  name: 'ViewerDemo',
  filters: {
    imgFilter
  },
  data() {
    return {
      imgKeys: [
        'http://styd-saas-test.oss-cn-shanghai.aliyuncs.com/image/IUt_vXTl8zaWGwlO.jpg',
        'http://styd-saas-test.oss-cn-shanghai.aliyuncs.com/image/IUt_vXTl8zaWGwlO.jpg',
        'http://styd-saas-test.oss-cn-shanghai.aliyuncs.com/image/IUt_vXTl8zaWGwlO.jpg'
      ]
    }
  }
}
</script>
