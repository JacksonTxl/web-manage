<template>
  <div :class="b()">
    <div :class="b('h-1')"></div>
    <div :class="b('h-2')"></div>
    <div :class="b('h-3')"></div>
  </div>
</template>
<script>
export default {
  props: {
    type: {
      type: Number,
      default: 1
    }
  },
  bem: {
    b: 'skeleton-brand-tile-header'
  }
}
</script>
