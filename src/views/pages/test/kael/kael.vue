<template>
  <st-panel app>
            <st-icon type="delete" color="green"></st-icon> <br>
    <st-tag type="shop-trial"></st-tag>
    <st-tag type="shop-opening"></st-tag>
    <st-tag type="shop-stop"></st-tag>
    <st-tag type="shop-close"></st-tag>
    <st-tag type="shop-holiday"></st-tag>
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
