<template>
  <div class="st-skeleton--box" v-if="type === 'box'"></div>
</template>
<script>
export default {
  name: 'StSkeleton',
  props: {
    type: {
      type: String,
      default: 'box'
    }
  }
}
</script>
