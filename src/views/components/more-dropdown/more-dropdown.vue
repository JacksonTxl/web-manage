<template>
  <a-dropdown placement="bottomRight">
    <a href="javascript:;">
      <st-icon type="more" color="rgba(0,0,0,.15)"></st-icon>
    </a>
    <a-menu slot="overlay" :class="bMore('menu')">
      <slot></slot>
    </a-menu>
  </a-dropdown>
</template>

<script>
export default {
  name: 'StMoreDropdown',
  bem: {
    bMore: 'st-more-dropdown'
  }
}
</script>
