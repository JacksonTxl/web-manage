<template>
  <a-dropdown placement="bottomRight" :class="bMore()" v-model='localValue'>
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
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  bem: {
    bMore: 'st-more-dropdown'
  },
  computed: {
    localValue: {
      get() {
        return this.value
      },
      set(newVal) {
        this.$emit('input', newVal)
      }
    }
  }
}
</script>
