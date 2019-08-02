<template>
  <section class="sg-section">
    <h3>
      v-viewer
      <a
        target="_blank"
        href="https://mirari.cc/2017/08/27/Vue%E5%9B%BE%E7%89%87%E6%B5%8F%E8%A7%88%E7%BB%84%E4%BB%B6v-viewer%EF%BC%8C%E6%94%AF%E6%8C%81%E6%97%8B%E8%BD%AC%E3%80%81%E7%BC%A9%E6%94%BE%E3%80%81%E7%BF%BB%E8%BD%AC%E7%AD%89%E6%93%8D%E4%BD%9C/"
      >
        中文文档
      </a>
    </h3>
    <div v-viewer="{ url: 'data-src' }">
      <span
        class="st-preview-item"
        style="margin: 8px;"
        v-for="(imgKey, index) in imgKeys"
        :key="index"
      >
        <img
          :src="imgKey | imgFilter({ w: 100, h: 56 })"
          :data-src="imgKey | imgFilter({ w: 1000 })"
        />
      </span>
    </div>
  </section>
</template>

<script>
export default {
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
