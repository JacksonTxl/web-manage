<template>
  <hr
    :style="{ marginTop: marginTop, marginBottom: marginBottom }"
    class="st-hr"
  />
</template>

<script>
export default {
  name: 'StHr',
  props: {
    marginTop: {
      type: String,
      default() {
        return '32px'
      }
    },
    marginBottom: {
      type: String,
      default() {
        return '32px'
      }
    }
  }
}
</script>
