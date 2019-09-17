<template>
  <st-panel app>
    <a-skeleton
      active
      size="small"
      :paragraph="false"
      :title="{ width: 300 }"
    />
    <a-skeleton
      class="mg-t36"
      active
      :rows="3"
      :title="false"
      :paragraph="{ width: '100%', rows: 10 }"
    ></a-skeleton>
  </st-panel>
</template>

<script>
export default {
  computed: {
    title() {
      return this.$route.meta.title
    }
  }
}
</script>
