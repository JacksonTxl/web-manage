<template>
  <st-panel app>
    <st-card-bg-radio v-model="cardbg" />
    <p>{{cardbg}}</p>
    <st-button @click="kael">kael</st-button>
  </st-panel>
</template>
<script>
import StCardBgRadio from '@/views/components/card-bg-radio/card-bg-radio.vue'
export default {
  components: {
    StCardBgRadio
  },
  data() {
    return {
      cardbg: {
        image_id: 323,
        image_key: 'image/IUt_vXTl8zaWGwlO.jpg',
        image_url: 'http://styd-saas-test.oss-cn-shanghai.aliyuncs.com/image/IUt_vXTl8zaWGwlO.jpg',
        index: 1
      },
      a: 11,
      b: 0
    }
  },
  mounted() {

  },
  methods: {
    kael() {
      console.log(this.b)
      ++this.a
      ++this.b
      let i = (this.b) % 5
      this.cardbg = {
        image_id: this.a,
        image_key: 'image/IUt_vXTl8zaWGwlO.jpg',
        image_url: 'http://styd-saas-test.oss-cn-shanghai.aliyuncs.com/image/IUt_vXTl8zaWGwlO.jpg',
        index: i
      }
    }
  }
}
</script>
