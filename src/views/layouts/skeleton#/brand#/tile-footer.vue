<template>
  <div :class="b()">
    <div :class="b('hd')">
      <div :class="b('h-1')"></div>
    </div>
    <div :class="b('bd')">
      <div :class="b('h-2')"></div>
    </div>
  </div>
</template>

<script>
export default {
  bem: {
    b: 'skeleton-brand-tile-footer'
  }
}
</script>
