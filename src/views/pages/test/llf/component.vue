<template>
  <st-panel app>
    <st-image-upload is-private></st-image-upload>
    <a v-modal-link="{name:'test-sg'}">test</a>

  </st-panel>
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
  },
  mounted() {

  }

}
</script>
