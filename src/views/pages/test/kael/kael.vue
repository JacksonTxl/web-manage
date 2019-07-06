<template>
  <st-panel app>
    <st-button @click="kael">1111</st-button>
  </st-panel>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    kael(e) {
      this.$modalRouter.push({
        name: 'shop-map-location',
        props: {
          lat: '31.230350',
          lng: '121.473720'
        }
      })
    }
  }
}
</script>
