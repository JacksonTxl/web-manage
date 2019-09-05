<template>
  <a-dropdown placement="bottomRight" :class="bMore()">
    <a href="javascript:;">
      <st-icon type="more" :color="color"></st-icon>
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
  },
  props: {
    color: {
      type: String,
      default: '#CDD4DF' //需要的颜色
    }
  }
}
</script>
