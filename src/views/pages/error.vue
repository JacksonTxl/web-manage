<template>
  <st-panel app>
    <a-alert :message='title' type='error' :description="content"></a-alert>
  </st-panel>
</template>

<script>
export default {
  computed: {
    title() {
      return this.$route.query.title
    },
    content() {
      return this.$route.query.content
    }
  }
}
</script>
