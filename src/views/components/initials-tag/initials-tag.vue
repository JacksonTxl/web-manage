<template>
  <span class="st-initials-tag">{{ value | initialsFilter }}</span>
</template>
<script>
export default {
  name: 'StInitialsTag',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  filters: {
    initialsFilter(val) {
      return val[0].toUpperCase()
    }
  }
}
</script>
