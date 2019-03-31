<template>
  <div>
    <h4>v-viewer</h4>
    <div v-viewer="{ url: 'data-src' }">
      <img v-for="(imgKey, index) in imgKeys" :key="index" :src="imgKey|imgFilter({ w: 100 })"
        :data-src="imgKey|imgFilter({ w: 1000 })" class="viewer-img"/>
    </div>
  </div>
</template>
<script>
import { imgFilter } from '@/filters/resource.filters'
export default {
  data() {
    return {
      imgKeys: [
        'o_1d78oa7b917021g2v1ien1lsg1uguh.jpg',
        'o_1d78oa7b91hvd10a21pr91c5v1viki.jpg',
        'o_1d78oa7b9kuj135b1ipq1cvf1k0rl.jpg'
      ]
    }
  },
  filters: {
    imgFilter
  }
}
</script>
<style lang="less" scope>
.viewer-img {
  width: 100px;
  margin: 10px;
}
</style>
