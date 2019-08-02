<template>
  <div :class="`st-container--type-${type}`">
    <slot />
  </div>
</template>
<script>
export default {
  name: 'StContainer',
  props: {
    type: {
      type: String,
      default: '1'
    }
  }
}
</script>
