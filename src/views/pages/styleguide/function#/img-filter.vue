<template>
  <section class="sg-section">
    <h3 class="mg-t32">imgFilter 图片过滤器</h3>
    <p>import { imgFilter } from '@/filters/resource.filters'</p>
    <p>&lt;img :src="imgKey|imgFilter({ w: 320, h: 180 })"/&gt;</p>

    <p>图片过滤器示例</p>
    <p>
      <img :src="demoImgKey | imgFilter({ w: 320, h: 180 })" alt />
    </p>
  </section>
</template>

<script>
export default {
  data() {
    return {
      demoImgKey:
        'http://styd-saas-test.oss-cn-shanghai.aliyuncs.com/image/IUt_vXTl8zaWGwlO.jpg'
    }
  }
}
</script>
