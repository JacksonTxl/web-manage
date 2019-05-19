<template>
  <hr :style="{marginTop: margin,marginBottom: margin}" class="st-hr" />
</template>

<script>
export default {
  name: 'StHr',
  props: {
    margin: {
      type: String,
      default() {
        return '32px'
      }
    }
  }
}
</script>
