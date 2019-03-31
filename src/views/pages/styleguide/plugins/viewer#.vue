<template>
  <div v-viewer="{ url: 'data-src' }">
    <span class="viewer-img-item" v-for="(imgKey, index) in imgKeys" :key="index" >
      <img :src="imgKey|imgFilter({ w: 100, h: 56 })"
      :data-src="imgKey|imgFilter({ w: 1000 })" class="viewer-img-item__img"/>
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
        'o_1d78oa7b917021g2v1ien1lsg1uguh.jpg',
        'o_1d78oa7b91hvd10a21pr91c5v1viki.jpg',
        'o_1d78oa7b9kuj135b1ipq1cvf1k0rl.jpg'
      ]
    }
  }
}
</script>
<style lang="less" scope>
.viewer-img-item {
  display: inline-block;
  width: 100px;
  height: 56px;
  margin: 10px;
  overflow: hidden;
}
.viewer-img-item__img {
  &:hover {
    cursor: pointer;
    transform: scale(1.25);
  }
  transition: all .5s;
}
</style>
