<template>
  <div
    class="st-skeleton--box"
    v-if="type === 'box'"
    :style="{ width: options.width, height: options.height }"
  ></div>
</template>
<script>
export default {
  name: 'StSkeleton',
  props: {
    type: {
      type: String,
      default: 'box'
    },
    options: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
