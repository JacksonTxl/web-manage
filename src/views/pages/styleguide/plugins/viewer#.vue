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
        'o_1d78oa7b917021g2v1ien1lsg1uguh.jpg',
        'o_1d78oa7b91hvd10a21pr91c5v1viki.jpg',
        'o_1d78oa7b9kuj135b1ipq1cvf1k0rl.jpg'
      ]
    }
  }
}
</script>
