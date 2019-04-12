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
        id: 323,
        path: 'image/IUt_vXTl8zaWGwlO.jpg',
        url: 'http://styd-saas-test.oss-cn-shanghai.aliyuncs.com/image/IUt_vXTl8zaWGwlO.jpg',
        index: 1
      }
    }
  },
  mounted() {

  },
  methods: {
    kael() {
      this.cardbg.index++
    }
  }
}
</script>
