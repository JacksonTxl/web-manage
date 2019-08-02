<template>
  <st-panel app>
    <a-alert
      v-if="name"
      :message="name"
      type="error"
      :description="message"
    ></a-alert>
  </st-panel>
</template>

<script>
export default {
  computed: {
    name() {
      return this.$route.query.name
    },
    message() {
      return this.$route.query.message
    }
  }
}
</script>
