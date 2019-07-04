<template>
  <div :class="b()">
    <div :class="b('h-1')"></div>
  </div>
</template>

<script>
export default {
  bem: {
    b: 'skeleton-brand-tile-sider-1'
  }
}
</script>
